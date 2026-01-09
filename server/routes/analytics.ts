import express from 'express';
import { Analytics } from '../models/Analytics';

const router = express.Router();

// Record a visit
/**
 * @swagger
 * /api/analytics/visit:
 *   post:
 *     summary: Record a new visit
 *     tags: [Analytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               path:
 *                 type: string
 *               ip:
 *                 type: string
 *               userAgent:
 *                 type: string
 *     responses:
 *       201:
 *         description: Visit recorded successfully
 *       500:
 *         description: Internal server error
 */
router.post('/visit', async (req, res) => {
  try {
    const { path, userAgent } = req.body;
    
    // Express 'trust proxy' makes req.ip the actual client IP
    let clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // Handle comma-separated lists from proxies (take the first one)
    if (typeof clientIp === 'string' && clientIp.includes(',')) {
      clientIp = clientIp.split(',')[0].trim();
    }
    
    // Clean up IPv6 loopback and standardizations
    if (clientIp === '::1' || clientIp === '::ffff:127.0.0.1') {
      clientIp = '127.0.0.1';
    }

    const visit = new Analytics({ 
      path, 
      ip: clientIp, 
      userAgent 
    });
    
    await visit.save();
    res.status(201).json({ message: 'Visit recorded' });
  } catch (error) {
    console.error('Error recording visit:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get analytics stats
/**
 * @swagger
 * /api/analytics:
 *   get:
 *     summary: Get analytics statistics
 *     tags: [Analytics]
 *     responses:
 *       200:
 *         description: Analytics data including total visits, unique visitors, visits by path, and visits over time
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
  try {
    const totalVisits = await Analytics.countDocuments();
    const uniqueVisitors = (await Analytics.distinct('ip')).length;
    
    // Get stats from helper if needed, but for dashboard summary we keep basics
    const visitsByPath = await Analytics.aggregate([
      { $group: { _id: '$path', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const visitsOverTime = await Analytics.aggregate([
      { $match: { timestamp: { $gte: sevenDaysAgo } } },
      { 
        $group: { 
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } }, 
          count: { $sum: 1 } 
        } 
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalVisits,
      uniqueVisitors,
      visitsByPath,
      visitsOverTime
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/analytics/recent:
 *   get:
 *     summary: Get paginated recent visits
 *     tags: [Analytics]
 */
router.get('/recent', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const visits = await Analytics.find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Analytics.countDocuments();

    res.json({
      visits,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * @swagger
 * /api/analytics/unique:
 *   get:
 *     summary: Get paginated unique visitors
 *     tags: [Analytics]
 */
router.get('/unique', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const uniqueIps = await Analytics.aggregate([
      {
        $group: {
          _id: '$ip',
          lastVisit: { $max: '$timestamp' },
          totalVisits: { $sum: 1 },
          userAgent: { $first: '$userAgent' }
        }
      },
      { $sort: { lastVisit: -1 } },
      { $skip: skip },
      { $limit: limit }
    ]);

    const totalCountResult = await Analytics.aggregate([
      { $group: { _id: '$ip' } },
      { $count: 'total' }
    ]);
    const total = totalCountResult[0]?.total || 0;

    res.json({
      visitors: uniqueIps,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
