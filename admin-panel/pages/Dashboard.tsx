
import {
  ArrowUpRight,
  Briefcase,
  Globe,
  MessageCircle,
  Users
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { AppState } from '../types';

interface DashboardProps {
  data: AppState;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [analytics, setAnalytics] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { getAnalytics } = await import('../api');
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      }
    };
    
    fetchAnalytics();
    
    // Refresh analytics every 60 seconds
    const interval = setInterval(fetchAnalytics, 60000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Total Visits', value: analytics?.totalVisits || 0, icon: <Globe />, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Unique Visitors', value: analytics?.uniqueVisitors || 0, icon: <Users />, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { label: 'Total Projects', value: data.projects.length, icon: <Briefcase />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Pending Queries', value: data.queries.filter(q => q.status === 'unread').length, icon: <MessageCircle />, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  ];

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
        <h1 className="text-3xl font-bold text-white">Welcome back, {data.hero.name.split(' ')[0]}!</h1>
        <p className="text-gray-400 mt-2">Here is what's happening with your portfolio today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#0a0a1a] p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
              <button className="text-gray-500 hover:text-white transition-colors">
                <ArrowUpRight size={20} />
              </button>
            </div>
            <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#0a0a1a] rounded-2xl border border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h2 className="font-bold text-lg">Recent Queries</h2>
              {data.queries.filter(q => q.status === 'unread').length > 0 && (
                <span className="bg-cyan-500/10 text-cyan-400 text-[10px] px-2 py-0.5 rounded-full font-bold border border-cyan-500/20">
                  {data.queries.filter(q => q.status === 'unread').length} NEW
                </span>
              )}
            </div>
            <Link to="/queries">
              <button className="text-xs text-cyan-400 font-bold uppercase tracking-wider">View All</button>
            </Link>
          </div>
          <div className="divide-y divide-gray-800">
            {data.queries.length > 0 ? (
              [...data.queries]
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 5)
                .map((query, index) => (
                <div 
                  key={query._id} 
                  className={`p-6 hover:bg-gray-800/30 transition-colors flex gap-4 relative group ${
                    query.status === 'unread' && index === 0 ? 'animate-in fade-in slide-in-from-left duration-500' : ''
                  }`}
                >
                  {query.status === 'unread' && (
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] ${
                      index === 0 ? 'animate-pulse' : ''
                    }`}></div>
                  )}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                    query.status === 'unread' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {query.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                        <h4 className="font-semibold text-white truncate">{query.name}</h4>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            query.status === 'unread' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                            query.status === 'replied' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                            'bg-gray-500/10 text-gray-500 border border-gray-500/10'
                          }`}>
                            {query.status}
                          </span>
                          <span className="text-[11px] text-gray-500 whitespace-nowrap">
                            {new Date(query.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} • {new Date(query.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-1">{query.message}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-gray-500 italic">No inquiries yet.</div>
            )}
          </div>
        </div>

        <div className="bg-[#0a0a1a] rounded-2xl border border-gray-800 p-6">
          <h2 className="font-bold text-lg mb-6">Quick Profile</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img src={data.hero.profileImage.startsWith('http') ? data.hero.profileImage : import.meta.env.VITE_API_URL + data.hero.profileImage} className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-500/20" alt="" />
              <div>
                <h4 className="font-bold text-white">{data.hero.name}</h4>
                <p className="text-sm text-gray-500">{data.hero.role}</p>
              </div>
            </div>
            
            <div className="space-y-4 pt-4">
              {data.stats.map(stat => (
                <div key={stat._id} className="flex justify-between items-center bg-gray-900/50 p-3 rounded-xl">
                  <span className="text-sm text-gray-400">{stat.label}</span>
                  <span className="text-sm font-bold text-cyan-400">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
