import { useState, useEffect } from 'react';
import api from '../api/axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Scale, Plus, Calendar, Flame, TrendingDown, TrendingUp, History, Info, ChevronRight, Target, Zap, Waves } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProgressPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ currentWeight: 0, startWeight: 0, totalDiff: 0 });

  // Form State
  const [weight, setWeight] = useState('');
  const [calories, setCalories] = useState('');
  const [notes, setNotes] = useState('');

  const fetchProgress = async () => {
    try {
      const { data } = await api.get('/progress/history');
      if (Array.isArray(data)) {
        const formatted = data.map(log => ({
          ...log,
          shortDate: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        }));
        setHistory(formatted);
        
        if (formatted.length > 0) {
          const current = formatted[formatted.length - 1].weight;
          const start = formatted[0].weight;
          setStats({
            currentWeight: current,
            startWeight: start,
            totalDiff: (current - start).toFixed(1)
          });
        }
      }
    } catch (err) {
      toast.error('Unable to load your progress history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!weight) return toast.error('Please enter your weight');

    try {
      await api.post('/progress/log', {
        weight: Number(weight),
        caloriesConsumed: Number(calories) || 0,
        notes
      });
      toast.success('Your data has been saved!');
      setWeight(''); setCalories(''); setNotes('');
      fetchProgress();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving your record');
    }
  };

  if (loading && history.length === 0) {
    return (
      <div className="flex flex-col gap-8 animate-pulse p-4 lg:p-0">
         <div className="h-32 bg-white/5 rounded-[2.5rem] w-full" />
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-40 bg-white/5 rounded-[2.5rem]" />
            <div className="h-40 bg-white/5 rounded-[2.5rem]" />
            <div className="h-40 bg-white/5 rounded-[2.5rem]" />
         </div>
         <div className="h-[500px] bg-white/5 rounded-[3.5rem]" />
      </div>
    );
  }

  return (
    <div className="animate-fade-up pb-24 lg:pb-10 space-y-10">

      {/* Modern Header Section */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 pt-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <Activity className="text-blue-400" size={24} />
             </div>
             <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.4em]">Your Body Progress</span>
          </div>
          <h1 className="text-5xl font-extrabold text-white tracking-tight">Track Your <span className="blue-gradient-text italic">Journey</span></h1>
          <p className="text-slate-400 font-medium text-lg max-w-2xl leading-relaxed">
            See how your weight and activity change over time with easy-to-read charts.
          </p>
        </div>
        
        <div className="flex gap-4">
           <div className="glass-card px-8 py-4 flex flex-col items-center">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Status</span>
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                 <span className="text-sm font-bold text-white uppercase tracking-tighter">Live Updates</span>
              </div>
           </div>
           <div className="glass-card px-8 py-4 flex flex-col items-center">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Version</span>
              <span className="text-sm font-bold text-blue-400 uppercase tracking-tighter">NutriAI v4.0</span>
           </div>
        </div>
      </div>

      {/* Real-time Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-8 group hover:border-blue-500/30 transition-all">
          <div className="flex justify-between items-start mb-6">
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Weight Change</span>
             <Waves className="text-blue-500/30" size={18} />
          </div>
          <div className="flex items-baseline gap-3">
            <span className={`text-4xl font-extrabold tracking-tighter ${Number(stats.totalDiff) <= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {stats.totalDiff > 0 ? '+' : ''}{stats.totalDiff}
            </span>
            <span className="text-slate-500 font-bold text-xs uppercase">KG Total</span>
          </div>
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-4">Starting Weight: {stats.startWeight}kg</p>
        </div>

        <div className="glass-card p-8 group hover:border-blue-500/30 transition-all">
          <div className="flex justify-between items-start mb-6">
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Entries</span>
             <History className="text-blue-500/30" size={18} />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-white tracking-tighter">{history.length}</span>
            <span className="text-slate-500 font-bold text-xs uppercase">Days Logged</span>
          </div>
          <div className="w-full bg-white/5 h-1 rounded-full mt-5 overflow-hidden">
             <div className="bg-blue-500 h-full w-[65%] shadow-glow-blue" />
          </div>
        </div>

        <div className="glass-card p-8 group hover:border-blue-500/30 transition-all relative overflow-hidden">
           <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-3xl" />
           <div className="flex justify-between items-start mb-6">
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Latest Weight</span>
             <Target className="text-blue-500/30" size={18} />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-white tracking-tighter">{stats.currentWeight}</span>
            <span className="text-slate-500 font-bold text-xs uppercase">KG Now</span>
          </div>
          <button className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-5 hover:text-white transition-colors flex items-center gap-2">
             Set New Goal <ChevronRight size={12} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

        {/* Entry Form */}
        <div className="lg:col-span-12 xl:col-span-4 glass-card p-10 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-[60px]" />
          <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-10 pb-6 border-b border-white/5">
             Log Today's Data
          </h3>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Current Weight</label>
              <div className="relative group/field">
                <Scale className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-blue-400 transition-colors" size={20} />
                <input
                  type="number" step="0.1" value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 text-white pl-16 pr-8 py-5 rounded-2xl focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.06] transition-all font-bold placeholder-slate-700"
                  placeholder="00.0 kg" required
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Calories Eaten</label>
              <div className="relative group/field">
                <Flame className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-orange-400 transition-colors" size={20} />
                <input
                  type="number" value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 text-white pl-16 pr-8 py-5 rounded-2xl focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.06] transition-all font-bold placeholder-slate-700"
                  placeholder="Today's total kcal"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 text-white p-6 rounded-2xl focus:outline-none focus:border-blue-500/30 h-32 resize-none font-medium placeholder-slate-700 text-sm"
                placeholder="How are you feeling today?"
              />
            </div>

            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-6 rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-4 group/btn text-sm uppercase tracking-tight">
               Save Log <Zap size={18} className="group-hover/btn:scale-125 transition-transform" />
            </button>
          </form>
        </div>

        {/* History Hub */}
        <div className="lg:col-span-12 xl:col-span-8 space-y-10">

          <div className="glass-card p-10 h-[550px] flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-12 relative z-10">
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Weight Progress Chart</h3>
                <div className="flex items-center gap-2 mt-2">
                   <span className="w-2 h-2 rounded-full bg-blue-500 shadow-glow-blue" />
                   <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Showing: Weight (KG)</span>
                </div>
              </div>
              <div className="flex items-center bg-white/5 border border-white/5 rounded-xl px-4 py-2 gap-3">
                 <Calendar size={14} className="text-slate-500" />
                 <span className="text-[10px] font-bold text-white uppercase tracking-widest">History</span>
              </div>
            </div>

            {history.length < 2 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-white/5 rounded-[2.5rem] bg-white/[0.01]">
                <Activity className="w-16 h-16 mb-6 opacity-20" />
                <p className="font-bold uppercase tracking-widest text-[10px] text-slate-400">Waiting for more logs</p>
                <p className="text-xs mt-3 font-medium opacity-50 text-center max-w-[200px]">Save at least 2 days of logs to see your progress chart.</p>
              </div>
            ) : (
              <div className="flex-1 min-h-0 w-full relative z-10 -ml-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={history}>
                    <defs>
                      <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="12 12" stroke="rgba(255,255,255,0.02)" vertical={false} />
                    <XAxis
                      dataKey="shortDate"
                      stroke="rgba(255,255,255,0.05)"
                      tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9, fontWeight: 700, textTransform: 'uppercase' }}
                      dy={20}
                    />
                    <YAxis
                      stroke="rgba(255,255,255,0.05)"
                      tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9, fontWeight: 700 }}
                      domain={['auto', 'auto']}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0a0a0f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1.5rem', padding: '15px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
                      itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}
                      labelStyle={{ color: '#64748b', fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '5px' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="weight"
                      stroke="#3b82f6"
                      strokeWidth={4}
                      fillOpacity={1}
                      fill="url(#colorWeight)"
                      animationDuration={2000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          <div className="glass-card p-10 relative overflow-hidden">
            <h3 className="text-xl font-bold text-white mb-10 flex items-center justify-between uppercase tracking-tight pb-6 border-b border-white/5">
              Recent Activity
              <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">Saved Entries</span>
            </h3>

            <div className="space-y-4">
              {history.length === 0 ? (
                <div className="py-20 text-center opacity-30 font-bold uppercase tracking-widest text-[10px]">No entries found</div>
              ) : (
                [...history].reverse().slice(0, 6).map((log, i) => (
                  <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                        <Calendar className="text-blue-400" size={18} />
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg tracking-tight">{log.shortDate}</p>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-0.5 truncate max-w-[180px]">{log.notes || 'No notes'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8 w-full sm:w-auto mt-6 sm:mt-0 justify-between sm:justify-end border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0">
                      <div className="text-right">
                        <p className="text-2xl font-extrabold text-white tracking-tighter">{log.weight} <span className="text-slate-600 text-[10px] uppercase font-bold ml-1">kg</span></p>
                        {log.caloriesConsumed > 0 && <p className="text-orange-500 text-[9px] font-bold uppercase tracking-widest mt-1">{log.caloriesConsumed} kcal</p>}
                      </div>
                      <ChevronRight className="text-slate-800" size={18} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
