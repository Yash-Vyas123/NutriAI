import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Activity, Flame, Scale, TrendingDown, TrendingUp, AlertCircle, UtensilsCrossed, ArrowRight, UserPlus, Zap } from 'lucide-react';

const DashboardPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await api.get('health/profile');
        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const macroData = profile ? [
    { name: 'Protein', value: profile.macros?.protein || 0, color: '#10b981' },
    { name: 'Carbs', value: profile.macros?.carbs || 0, color: '#3b82f6' },
    { name: 'Fats', value: profile.macros?.fats || 0, color: '#f59e0b' },
  ] : [];

  const getBMIBadge = (cat) => {
    if (cat === 'Normal') return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    if (cat === 'Underweight') return 'bg-sky-500/10 text-sky-400 border border-sky-500/20';
    if (cat === 'Overweight') return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
    return 'bg-violet-500/10 text-violet-400 border border-violet-500/20';
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="h-10 w-10 border-2 border-white/10 border-t-emerald-500 rounded-full animate-spin" />
      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest animate-pulse">Loading Your Data...</span>
    </div>
  );

  if (!profile) return (
    <div className="text-center container-glass p-12 sm:p-20 rounded-[3rem] max-w-2xl mx-auto mt-12 border border-white/5 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-amber-500" />
      <div className="w-20 h-20 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-10 group-hover:rotate-12 transition-all duration-700">
        <UserPlus className="w-10 h-10 text-emerald-400" />
      </div>
      <h2 className="text-4xl font-extrabold text-white mb-6 tracking-tight">Welcome to NutriAI</h2>
      <p className="text-slate-400 mb-12 font-medium text-lg leading-relaxed max-w-md mx-auto">To get started, we need a few details about your body and health goals.</p>
      <Link to="/health-profile" className="inline-flex items-center gap-4 bg-white text-slate-950 font-bold py-5 px-12 rounded-[1.8rem] hover:bg-emerald-400 hover:scale-105 transition-all shadow-xl shadow-white/5">
        Setup My Profile <ArrowRight size={22} strokeWidth={2.5} />
      </Link>
    </div>
  );

  return (
    <div className="animate-fade-up">
      <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 text-emerald-400 mb-3">
             <Zap size={16} className="fill-emerald-400/20" />
             <span className="text-[10px] font-bold uppercase tracking-widest">Your Health Overview</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">My Dashboard</h1>
          <p className="text-slate-500 mt-4 font-medium text-base sm:text-lg max-w-2xl">A quick look at your current health stats and nutrition targets.</p>
        </div>
        <Link to="/health-profile" className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white text-white hover:text-slate-950 font-bold transition-all text-sm tracking-tight shadow-lg shadow-black/20 text-center">
          Edit My Details
        </Link>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        <div className="glass-card p-10 group hover:border-emerald-500/30 transition-all duration-500">
          <div className="flex items-center justify-between mb-8 opacity-60">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">BMI Score</span>
            <Activity size={18} className="text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-4">
            <h3 className="text-6xl font-extrabold tracking-tighter text-white">{profile.bmi}</h3>
            <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border border-white/5 ${getBMIBadge(profile.bmiCategory)}`}>
              {profile.bmiCategory}
            </span>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5">
             <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min((profile.bmi/40)*100, 100)}%` }} />
             </div>
          </div>
        </div>

        <div className="glass-card p-10 group hover:border-sky-500/30 transition-all duration-500">
          <div className="flex items-center justify-between mb-8 opacity-60">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Target Calories</span>
            <Flame size={18} className="text-sky-400" />
          </div>
          <div className="flex items-baseline gap-3">
            <h3 className="text-6xl font-extrabold tracking-tighter text-white">{profile.dailyCalories}</h3>
            <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest opacity-60">kcal/day</span>
          </div>
          <p className="mt-8 text-[11px] text-slate-500 font-medium">Daily goal to maintain your target</p>
        </div>

        <div className="glass-card p-10 group hover:border-violet-500/30 transition-all duration-500">
          <div className="flex items-center justify-between mb-8 opacity-60">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Weight</span>
            <Scale size={18} className="text-violet-400" />
          </div>
          <div className="flex items-baseline gap-3">
            <h3 className="text-6xl font-extrabold tracking-tighter text-white">{profile.weight}</h3>
            <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest opacity-60">kg</span>
          </div>
          <div className="mt-8 flex gap-2">
             {[1,2,3,4,5].map(i => <div key={i} className={`h-1 flex-1 rounded-full ${i <= 3 ? 'bg-violet-500/40' : 'bg-white/5'}`} />)}
          </div>
        </div>

        <div className="glass-card p-10 group hover:border-amber-500/30 transition-all duration-500 relative overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent">
          <div className="flex items-center justify-between mb-8 opacity-60">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Current Goal</span>
             {profile.fitnessGoal === 'weight_loss' ? <TrendingDown size={18} className="text-amber-400" /> : <TrendingUp size={18} className="text-amber-400" />}
          </div>
          <h3 className="text-3xl font-extrabold text-white uppercase tracking-tight leading-snug">
            {profile.fitnessGoal.replace('_', ' ')}
          </h3>
          <Link to="/progress" className="mt-10 flex items-center gap-2 text-[10px] font-bold text-amber-400 uppercase tracking-widest hover:translate-x-1 transition-transform">
             View Progress Track <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        {/* Macro Analysis Hub */}
        <div className="lg:col-span-12 xl:col-span-8 glass-card !bg-transparent p-10 sm:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mb-16 relative z-10">
            <div>
              <h3 className="text-3xl font-extrabold text-white tracking-tight">Nutrition Balance</h3>
              <p className="text-slate-500 font-bold mt-2 uppercase text-[10px] tracking-widest">Recommended Daily Amounts</p>
            </div>
            <div className="px-5 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-widest shadow-glow-emerald">
               Live Tracking
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="h-80 sm:h-[400px] relative order-2 lg:order-1 group">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    innerRadius="80%"
                    outerRadius="100%"
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                    animationDuration={1500}
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#050508', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '20px' }}
                    itemStyle={{ color: '#fff', fontSize: '13px', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Total Calories</span>
                <span className="text-7xl font-extrabold text-white tracking-tighter">{profile.dailyCalories}</span>
                <div className="mt-6 flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/5 border border-white/5">
                   <Zap size={10} className="text-emerald-400" />
                   <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Target Met</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 order-1 lg:order-2">
              {macroData.map(m => (
                <div key={m.name} className="flex items-center justify-between p-7 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all duration-300 group">
                  <div className="flex items-center gap-5">
                    <div className="w-1.5 h-10 rounded-full" style={{ backgroundColor: m.color }} />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{m.name}</span>
                      <span className="text-3xl font-extrabold text-white tracking-tight">{m.value}g</span>
                    </div>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-white/5 text-[9px] font-bold text-slate-400 group-hover:text-white transition-colors">
                     {Math.round((m.value * (m.name === 'Fats' ? 9 : 4) / profile.dailyCalories) * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Action Card */}
        <div className="lg:col-span-12 xl:col-span-4 glass-card p-12 flex flex-col justify-center relative overflow-hidden group border-emerald-500/[0.03]">
          <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center mb-10 shadow-[0_20px_50px_-10px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-all duration-700 p-6 -rotate-3 group-hover:rotate-0">
              <UtensilsCrossed className="w-full h-full text-slate-950" />
            </div>
            
            <h3 className="text-4xl font-extrabold text-white mb-6 tracking-tight leading-tight uppercase">AI Meal<br /><span className="accent-gradient-text italic">Planner</span></h3>
            
            <p className="text-slate-400 mb-12 leading-relaxed font-semibold text-lg max-w-xs mx-auto">
              Get a personalized meal plan created by AI just for your goals.
            </p>
            
            <Link to="/diet-plan" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-5 px-10 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 group/btn">
              Create Plan <ArrowRight size={20} strokeWidth={3} className="group-hover/btn:translate-x-2 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
