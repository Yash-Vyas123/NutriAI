import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { toast } from 'react-hot-toast';
import { Heart, Activity, Target, Utensils, Zap, Save, ChevronRight, UserCircle, Thermometer } from 'lucide-react';

const HealthProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    activityLevel: 'sedentary',
    fitnessGoal: 'maintain',
    foodPreference: 'vegetarian',
    healthConditions: 'None',
  });

  useEffect(() => {
    const fetchProfile = async () => {
    try {
      const { data } = await api.get('health/profile');
      if (data) {
        setFormData({
          age: data.age || '',
          gender: data.gender || 'male',
          height: data.height || '',
          weight: data.weight || '',
          activityLevel: data.activityLevel || 'sedentary',
          fitnessGoal: data.fitnessGoal || 'maintain',
          foodPreference: data.foodPreference || 'vegetarian',
          healthConditions: data.healthConditions || 'None',
        });
      }
    } catch (err) { }
  };
  fetchProfile();
}, []);

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    await api.post('health/profile', formData);
      toast.success('Your health profile is updated!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Sync failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in pb-24 lg:pb-10">

      <div className="mb-12 xl:mb-16">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/10 p-3 rotate-3">
            <Heart className="text-red-500 w-full h-full" />
          </div>
          <h1 className="text-4xl xl:text-5xl font-black text-white tracking-tighter leading-none">Health <span className="text-green-500">Profile</span></h1>
        </div>
        <p className="text-slate-400 font-medium text-lg xl:text-xl max-w-2xl leading-relaxed">
          Tell us about your body and goals so NutriBot can give you personalized nutrition advice.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">

          {/* Main Form Area */}
          <div className="xl:col-span-8 space-y-8">
            <div className="bg-[#0a0a0f] border border-white/5 rounded-[3.5rem] p-10 xl:p-14 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/[0.01] rounded-full blur-[100px]" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">

                {/* Core Parameters */}
                <div className="space-y-8">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-4 border-b border-white/5 pb-4">Basic Info</h3>

                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4 ml-1 group-focus-within:text-white transition-colors">How old are you?</label>
                    <input
                      type="number" name="age" value={formData.age} onChange={handleChange} required min="10" max="100"
                      className="w-full bg-white/[0.02] border-2 border-white/5 text-white p-5 rounded-2xl focus:outline-none focus:border-green-500/30 font-black text-lg transition-all"
                      placeholder="e.g. 25"
                    />
                  </div>

                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4 ml-1 group-focus-within:text-white transition-colors">How tall are you? (cm)</label>
                    <input
                      type="number" name="height" value={formData.height} onChange={handleChange} required min="100" max="250"
                      className="w-full bg-white/[0.02] border-2 border-white/5 text-white p-5 rounded-2xl focus:outline-none focus:border-green-500/30 font-black text-lg transition-all"
                      placeholder="e.g. 175"
                    />
                  </div>

                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4 ml-1 group-focus-within:text-white transition-colors">Starting Weight (kg)</label>
                    <input
                      type="number" name="weight" value={formData.weight} onChange={handleChange} required min="30" max="300"
                      className="w-full bg-white/[0.02] border-2 border-white/5 text-white p-5 rounded-2xl focus:outline-none focus:border-green-500/30 font-black text-lg transition-all"
                      placeholder="e.g. 70"
                    />
                  </div>
                </div>

                {/* Behavioral & Physical */}
                <div className="space-y-8">
                  <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-4 border-b border-white/5 pb-4">Lifestyle & Goals</h3>

                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4 ml-1 group-focus-within:text-white transition-colors">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-[#1a1a24] border-2 border-white/5 text-white p-5 rounded-2xl focus:outline-none focus:border-green-500/30 font-black text-lg cursor-pointer appearance-none transition-all">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4 ml-1 group-focus-within:text-white transition-colors">How active are you?</label>
                    <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="w-full bg-[#1a1a24] border-2 border-white/5 text-white p-5 rounded-2xl focus:outline-none focus:border-green-500/30 font-black text-lg cursor-pointer appearance-none transition-all">
                      <option value="sedentary">Little or no exercise</option>
                      <option value="moderate">Moderate (3-5 days/week)</option>
                      <option value="active">Very Active (6-7 days/week)</option>
                    </select>
                  </div>

                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4 ml-1 group-focus-within:text-white transition-colors">What is your main goal?</label>
                    <select name="fitnessGoal" value={formData.fitnessGoal} onChange={handleChange} className="w-full bg-[#1a1a24] border-2 border-white/5 text-white p-5 rounded-2xl focus:outline-none focus:border-green-500/30 font-black text-lg cursor-pointer appearance-none transition-all">
                      <option value="weight_loss">Lose Weight</option>
                      <option value="maintain">Maintain Weight</option>
                      <option value="weight_gain">Gain Weight / Muscle</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Preferences & Health */}
              <div className="mt-16 space-y-8 relative z-10">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-4 border-b border-white/5 pb-4 text-center sm:text-left">Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4 ml-1 group-focus-within:text-white transition-colors">Food Preference</label>
                    <select name="foodPreference" value={formData.foodPreference} onChange={handleChange} className="w-full bg-[#1a1a24] border-2 border-white/5 text-white p-5 rounded-2xl focus:outline-none focus:border-green-500/30 font-black text-lg cursor-pointer appearance-none transition-all">
                      <option value="vegetarian">Vegetarian (Veg)</option>
                      <option value="non-vegetarian">Non-Vegetarian (Non-Veg)</option>
                      <option value="vegan">Vegan</option>
                    </select>
                  </div>
                  <div className="group">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4 ml-1 group-focus-within:text-white transition-colors">Health Conditions (Optional)</label>
                    <input
                      type="text" name="healthConditions" value={formData.healthConditions} onChange={handleChange}
                      className="w-full bg-white/[0.02] border-2 border-white/5 text-white p-5 rounded-2xl focus:outline-none focus:border-green-500/30 font-black text-lg transition-all"
                      placeholder="e.g. Nut allergy, etc."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visualization / Side Insights */}
          <div className="xl:col-span-4 space-y-8">
            <div className="bg-[#0a0a0f]/40 backdrop-blur-xl border border-white/5 rounded-[3rem] p-10 flex flex-col justify-between min-h-[400px] relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/[0.03] rounded-full blur-[100px]" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-4 mb-8 rotate-6 group-hover:rotate-0 transition-all duration-700 shadow-xl">
                  <Zap className="text-slate-900 w-full h-full" strokeWidth={3} />
                </div>
                <h3 className="text-3xl font-black text-white tracking-tighter leading-none mb-4">Smart<br />Customization</h3>
                <p className="text-slate-500 font-medium text-lg leading-relaxed mb-10">
                  Your details help the AI create the best food and lifestyle plan just for you.
                </p>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-green-500 hover:bg-green-400 text-slate-900 font-black py-6 rounded-3xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 shadow-2xl shadow-green-500/20 group/btn relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                  {loading ? 'Saving...' : 'Save Health Profile'}
                  <Save size={20} strokeWidth={3} className="group-hover/btn:scale-125 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
              </button>
            </div>

            <div className="bg-[#0a0a0f] border border-white/5 rounded-[3rem] p-10 shadow-2xl">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-8 border-b border-white/5 pb-4">Tips</h4>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <Thermometer className="text-slate-500" size={14} />
                  </div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight leading-relaxed">Measure weight in the morning for best results.</p>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <UserCircle className="text-slate-500" size={14} />
                  </div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight leading-relaxed">Update your details every 2 weeks to keep NutriBot accurate.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </form>

    </div>
  );
};

export default HealthProfilePage;
