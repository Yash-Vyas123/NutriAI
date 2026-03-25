import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Search, Apple, Activity, Target, Droplet, Filter, Flame, Info, CheckCircle2, ChevronRight, XCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const FoodDatabasePage = () => {
  const [foods, setFoods] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchFoods = async (searchQuery = '') => {
    setLoading(true);
    try {
      const endpoint = searchQuery ? `/food/search?q=${searchQuery}` : '/food/all';
      const { data } = await api.get(endpoint);
      setFoods(data);
    } catch (err) {
      toast.error('Unable to connect to the database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFoods(query);
  };

  const getCategoryTheme = (category) => {
    switch (category) {
      case 'Proteins': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'Grains': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'Vegetables': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Fruits': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      case 'Dairy': return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
      case 'Indian': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="animate-fade-in pb-24 lg:pb-10">

      {/* Header Section */}
      <div className="mb-12 xl:mb-16 flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-2xl shadow-red-500/10 p-3 rotate-3">
              <Apple className="text-red-500 w-full h-full" />
            </div>
            <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tighter leading-none">Food <span className="text-green-500 underline decoration-green-500/20 underline-offset-8">Database</span></h1>
          </div>
          <p className="text-slate-400 font-medium text-lg xl:text-xl leading-relaxed">
            Search and find the nutritional value of your favorite foods. Access accurate nutrition facts for thousands of items.
          </p>
        </div>
      </div>

      {/* Search Console */}
      <div className="relative mb-16 group">
        <div className="absolute inset-0 bg-green-500/5 blur-[100px] pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity" />
        <form onSubmit={handleSearch} className="relative flex items-center max-w-5xl mx-auto">
          <div className="absolute left-8 text-slate-500 group-focus-within:text-green-500 transition-colors">
            <Search size={28} strokeWidth={3} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for: Oats, Paneer, Rice, Milk..."
            className="w-full bg-[#0a0a0f] border-2 border-white/5 text-white pl-20 pr-48 py-7 rounded-[2.5rem] focus:outline-none focus:border-green-500/20 transition-all text-lg xl:text-xl font-bold placeholder-slate-700 shadow-2xl"
          />
          <button
            type="submit"
            className="absolute right-4 bg-white hover:bg-green-500 text-slate-900 font-black px-12 py-4 rounded-3xl transition-all active:scale-95 text-sm uppercase tracking-widest shadow-xl"
          >
            Search Food
          </button>
        </form>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-3 mt-8 max-w-5xl mx-auto justify-center xl:justify-start">
          {['Proteins', 'Indian', 'Grains', 'Vegetables', 'Fruits'].map(tag => (
            <button
              key={tag}
              onClick={() => { setQuery(tag); fetchFoods(tag); }}
              className={`px-6 py-2.5 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${query === tag
                  ? 'bg-green-500/10 border-green-500/40 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.1)]'
                  : 'bg-white/[0.02] border-white/5 text-slate-500 hover:border-green-500/30 hover:text-green-500'
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="h-96 rounded-[3rem] bg-[#0a0a0f] border border-white/5 animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.01] to-transparent skeleton-shimmer" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {foods.map((food) => (
              <div key={food._id} className="bg-[#0a0a0f] border border-white/5 p-8 rounded-[3rem] group hover:border-green-500/20 hover:bg-[#0c0c14] transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-2xl hover:shadow-green-500/[0.03] flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/[0.01] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className={`text-[9px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full border ${getCategoryTheme(food.category)}`}>
                    {food.category}
                  </div>
                  {food.isVegetarian && <CheckCircle2 size={24} className="text-green-500/40" />}
                </div>

                <h3 className="text-2xl font-black text-white mb-4 group-hover:text-green-400 transition-colors uppercase tracking-tight">{food.name}</h3>

                <div className="flex items-center gap-2 mb-10 opacity-40 group-hover:opacity-100 transition-opacity">
                  <div className="h-px bg-slate-800 flex-1" />
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">Nutrition Facts (Per 100g)</span>
                  <div className="h-px bg-slate-800 flex-1" />
                </div>

                <div className="grid grid-cols-2 gap-y-10 mb-auto relative z-10">
                  <div className="group/stat">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-2 group-hover/stat:text-orange-500 transition-colors">Calories</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white tracking-tighter">{food.calories}</span>
                      <span className="text-[10px] font-bold text-slate-600 uppercase">kcal</span>
                    </div>
                  </div>
                  <div className="group/stat">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-2 group-hover/stat:text-blue-500 transition-colors">Protein</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white tracking-tighter">{food.protein}</span>
                      <span className="text-[10px] font-bold text-slate-600 uppercase">g</span>
                    </div>
                  </div>
                  <div className="group/stat">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-2 group-hover/stat:text-emerald-500 transition-colors">Carbs</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white tracking-tighter">{food.carbs}</span>
                      <span className="text-[10px] font-bold text-slate-600 uppercase">g</span>
                    </div>
                  </div>
                  <div className="group/stat">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest block mb-2 group-hover/stat:text-amber-500 transition-colors">Fats</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white tracking-tighter">{food.fats}</span>
                      <span className="text-[10px] font-bold text-slate-600 uppercase">g</span>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-6 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-center">
                  <span className="text-green-500 text-[10px] font-black uppercase tracking-[0.2em]">Detailed View Coming Soon</span>
                </div>
              </div>
            ))}
          </div>

          {foods.length === 0 && (
            <div className="py-40 flex flex-col items-center animate-fade-in">
              <div className="w-24 h-24 bg-white/[0.02] border-2 border-dashed border-white/10 rounded-full flex items-center justify-center mb-8">
                <XCircle className="text-slate-800" size={48} strokeWidth={1} />
              </div>
              <h3 className="text-3xl font-black text-white mb-3 tracking-tighter">No Results</h3>
              <p className="text-slate-500 text-center max-w-sm font-medium text-lg leading-relaxed">
                We couldn't find any matches for <span className="text-white">"{query}"</span>. Try a different search.
              </p>
            </div>
          )}
        </>
      )}

    </div>
  );
};

export default FoodDatabasePage;
