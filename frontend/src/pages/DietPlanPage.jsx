import { useState, useEffect } from 'react';
import api from '../api/axios';
import { toast } from 'react-hot-toast';
import { UtensilsCrossed, Sparkles, Flame, Droplet, Wheat, Pizza, RefreshCw, ChevronRight } from 'lucide-react';

const DietPlanPage = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPlan = async () => {
    setLoading(true);
    setPlan(null);
    try {
      const { data } = await api.get('/ai/daily-plan');
      setPlan(data);
      toast.success('Your new meal plan is ready!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create your plan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  const renderMealCard = (mealKey, icon, title, mealData) => {
    if (!mealData) return null;
    return (
      <div className="bg-[#0a0a0f] border border-white/5 rounded-[2rem] overflow-hidden group hover:border-green-500/20 transition-all duration-500 hover:translate-x-1">
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-green-500/10 group-hover:border-green-500/20 group-hover:scale-110 transition-all duration-500">
              {icon}
            </div>
            <div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{title}</span>
              <h3 className="text-xl font-black text-white mt-0.5 tracking-tight group-hover:text-green-400 transition-colors">{mealData.name}</h3>
            </div>
          </div>
          <div className="flex items-baseline gap-1 bg-white/[0.02] px-4 py-2 rounded-2xl border border-white/5">
            <span className="text-2xl font-black text-white">{mealData.calories}</span>
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">kcal</span>
          </div>
        </div>
        
        <div className="px-6 pb-8 sm:px-8 sm:pb-10">
          <p className="text-slate-400 mb-6 leading-relaxed text-sm font-medium">{mealData.description}</p>
          
          <div className="flex gap-2 flex-wrap mb-8">
            {mealData.items && mealData.items.map((item, idx) => (
              <span key={idx} className="px-3 py-1.5 rounded-xl bg-white/[0.03] text-slate-300 text-[11px] font-bold uppercase tracking-wider border border-white/5 flex items-center gap-2">
                <div className="w-1 h-1 bg-green-500 rounded-full" /> {item}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t border-white/5">
            <div className="bg-blue-500/[0.03] p-3 rounded-2xl border border-blue-500/10 text-center">
              <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest block mb-1">Protein</span>
              <span className="text-white text-sm font-black flex items-center justify-center gap-1.5">
                <Pizza className="w-3.5 h-3.5 text-blue-400" /> {mealData.protein}g
              </span>
            </div>
            <div className="bg-green-500/[0.03] p-3 rounded-2xl border border-green-500/10 text-center">
              <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest block mb-1">Carbs</span>
              <span className="text-white text-sm font-black flex items-center justify-center gap-1.5">
                <Wheat className="w-3.5 h-3.5 text-green-400" /> {mealData.carbs}g
              </span>
            </div>
            <div className="bg-yellow-500/[0.03] p-3 rounded-2xl border border-yellow-500/10 text-center">
              <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest block mb-1">Fats</span>
              <span className="text-white text-sm font-black flex items-center justify-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-yellow-400" /> {mealData.fats}g
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in pb-24 lg:pb-10">
      
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="text-green-400" size={28} />
            <h1 className="text-3xl font-black text-white tracking-tight leading-none">My Meal Plan</h1>
          </div>
          <p className="text-slate-400 font-medium max-w-xl">
            Personalized meals created just for you based on your health goals.
          </p>
        </div>
        
        <button 
          onClick={fetchPlan} 
          disabled={loading} 
          className="group w-full md:w-auto bg-white hover:bg-green-500 text-slate-900 font-black py-4 px-8 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-xl"
        >
          {loading ? (
            <RefreshCw className="animate-spin" size={20} />
          ) : (
            <RefreshCw className="group-hover:rotate-180 transition-transform duration-700" size={20} />
          )}
          {loading ? 'Generating...' : 'New Meal Plan'}
        </button>
      </div>

      {loading && !plan && (
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-80 bg-[#0a0a0f] border border-white/5 rounded-[2.5rem] animate-pulse relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent skeleton-shimmer" />
            </div>
          ))}
        </div>
      )}

      {plan && !loading && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Daily Totals */}
          <div className="bg-gradient-to-br from-[#0a0a0f] to-[#050508] border border-green-500/20 rounded-[2.5rem] p-8 sm:p-12 mb-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="absolute inset-0 bg-green-500/[0.02] filter blur-3xl opacity-50" />
            <div className="relative z-10 text-center lg:text-left">
              <span className="px-4 py-1.5 bg-green-500/10 text-green-400 text-[11px] font-black uppercase tracking-[0.3em] rounded-full border border-green-500/20">Daily Totals</span>
              <div className="flex items-baseline justify-center lg:justify-start gap-2 mt-4">
                <span className="text-7xl font-black text-white tracking-tighter">{plan.totalCalories}</span>
                <span className="text-slate-500 font-bold uppercase tracking-widest text-sm">kcal</span>
              </div>
            </div>
            
            <div className="relative z-10 flex gap-4 sm:gap-8 justify-center">
              <div className="text-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500/10 border border-blue-500/20 rounded-3xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <span className="text-white text-xl sm:text-2xl font-black tracking-tighter">{plan.totalProtein}g</span>
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protein</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500/10 border border-green-500/20 rounded-3xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <span className="text-white text-xl sm:text-2xl font-black tracking-tighter">{plan.totalCarbs}g</span>
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Carbs</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-500/10 border border-yellow-500/20 rounded-3xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <span className="text-white text-xl sm:text-2xl font-black tracking-tighter">{plan.totalFats}g</span>
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Fats</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8">
            {renderMealCard('breakfast', <UtensilsCrossed className="text-orange-400" />, 'Breakfast', plan.breakfast)}
            {plan.morningSnack?.name && renderMealCard('morningSnack', <Flame className="text-yellow-400" />, 'Morning Snack', plan.morningSnack)}
            {renderMealCard('lunch', <UtensilsCrossed className="text-green-400" />, 'Lunch', plan.lunch)}
            {plan.eveningSnack?.name && renderMealCard('eveningSnack', <Flame className="text-blue-400" />, 'Evening Snack', plan.eveningSnack)}
            {renderMealCard('dinner', <UtensilsCrossed className="text-purple-400" />, 'Dinner', plan.dinner)}
          </div>
        </div>
      )}
    </div>
  );
};

export default DietPlanPage;
