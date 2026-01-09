import { ChevronLeft, ChevronRight, Globe, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getRecentVisits, getUniqueVisitors } from '../api';

const AnalyticsManager: React.FC = () => {
  const [recentPage, setRecentPage] = useState(1);
  const [uniquePage, setUniquePage] = useState(1);
  const [recentData, setRecentData] = useState<any>(null);
  const [uniqueData, setUniqueData] = useState<any>(null);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [loadingUnique, setLoadingUnique] = useState(true);

  const fetchData = async () => {
    setLoadingRecent(true);
    setLoadingUnique(true);
    try {
      const [recent, unique] = await Promise.all([
        getRecentVisits(recentPage, 10),
        getUniqueVisitors(uniquePage, 10)
      ]);
      setRecentData(recent);
      setUniqueData(unique);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoadingRecent(false);
      setLoadingUnique(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [recentPage, uniquePage]);

  const getBrowserIcon = (ua: string) => {
    if (ua.includes('Chrome')) return '🌐';
    if (ua.includes('Firefox')) return '🦊';
    if (ua.includes('Safari')) return '🧭';
    if (ua.includes('Edge')) return '🌊';
    return '📱';
  };

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-white">Full Analytics</h1>
        <p className="text-gray-400 mt-2">Detailed breakdown of traffic and audience.</p>
      </div>

      {/* Unique Visitors Table */}
      <div className="bg-[#0a0a1a] rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/10">
          <div className="flex items-center gap-3">
            <Users className="text-orange-400" size={20} />
            <h2 className="font-bold text-lg text-white">Unique Visitors</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 mr-4">Total: {uniqueData?.pagination?.total || 0}</span>
            <div className="flex gap-1">
              <button 
                onClick={() => setUniquePage(p => Math.max(1, p - 1))}
                disabled={uniquePage === 1}
                className="p-1.5 rounded-lg border border-gray-800 hover:border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs font-bold px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg min-w-[32px] text-center">
                {uniquePage}
              </span>
              <button 
                onClick={() => setUniquePage(p => p + 1)}
                disabled={uniquePage >= (uniqueData?.pagination?.pages || 1)}
                className="p-1.5 rounded-lg border border-gray-800 hover:border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-800 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">IP Address</th>
                <th className="px-6 py-4 font-semibold">Total Visits</th>
                <th className="px-6 py-4 font-semibold">Last System/Browser</th>
                <th className="px-6 py-4 font-semibold text-right">Last Seen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {loadingUnique ? (
                 <tr><td colSpan={4} className="px-6 py-10 text-center"><div className="animate-pulse text-gray-500">Loading unique visitors...</div></td></tr>
              ) : uniqueData?.visitors?.length > 0 ? (
                uniqueData.visitors.map((visitor: any) => (
                  <tr key={visitor._id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <code className="text-orange-400 text-xs bg-orange-400/5 px-2 py-1 rounded">
                        {visitor._id || 'Local'}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-white font-medium">
                      {visitor.totalVisits} visits
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span>{getBrowserIcon(visitor.userAgent || '')}</span>
                        <span className="text-gray-400 text-xs truncate max-w-[200px]" title={visitor.userAgent}>
                          {visitor.userAgent?.split(') ')[0]?.split(' (')[1] || 'Unknown System'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-white text-xs font-medium">
                          {new Date(visitor.lastVisit).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="text-gray-500 text-[10px]">
                          {new Date(visitor.lastVisit).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className="px-6 py-10 text-center text-gray-500 italic">No unique visitor data.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* All Visits Table */}
      <div className="bg-[#0a0a1a] rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/10">
          <div className="flex items-center gap-3">
            <Globe className="text-cyan-400" size={20} />
            <h2 className="font-bold text-lg text-white">All Visits History</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 mr-4">Total: {recentData?.pagination?.total || 0}</span>
            <div className="flex gap-1">
              <button 
                onClick={() => setRecentPage(p => Math.max(1, p - 1))}
                disabled={recentPage === 1}
                className="p-1.5 rounded-lg border border-gray-800 hover:border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs font-bold px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-lg min-w-[32px] text-center">
                {recentPage}
              </span>
              <button 
                onClick={() => setRecentPage(p => p + 1)}
                disabled={recentPage >= (recentData?.pagination?.pages || 1)}
                className="p-1.5 rounded-lg border border-gray-800 hover:border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-800 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">IP Address</th>
                <th className="px-6 py-4 font-semibold">Path</th>
                <th className="px-6 py-4 font-semibold">Browser/OS</th>
                <th className="px-6 py-4 font-semibold text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
               {loadingRecent ? (
                 <tr><td colSpan={4} className="px-6 py-10 text-center"><div className="animate-pulse text-gray-500">Loading visit history...</div></td></tr>
               ) : recentData?.visits?.length > 0 ? (
                recentData.visits.map((visit: any) => (
                  <tr key={visit._id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 text-xs font-mono text-cyan-400">{visit.ip || 'Local'}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{visit.path}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span>{getBrowserIcon(visit.userAgent || '')}</span>
                        <span className="text-gray-500 text-[10px] truncate max-w-[150px]">{visit.userAgent}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-xs text-white">
                      {new Date(visit.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className="px-6 py-10 text-center text-gray-500 italic">No visit history found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsManager;
