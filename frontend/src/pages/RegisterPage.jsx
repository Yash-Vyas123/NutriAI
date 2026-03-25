import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, Bot, Zap, ShieldPlus } from 'lucide-react';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password);
      toast.success('Account created successfully!');
      navigate('/health-profile');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg animate-fade-up">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="w-20 h-20 bg-emerald-500 rounded-[2.2rem] flex items-center justify-center mb-10 shadow-emerald-500/20 shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-1000 p-5 ring-offset-[14px] ring-offset-[#050508] ring-4 ring-emerald-500/10">
           <Bot className="w-full h-full text-slate-950" />
        </div>
        <h1 className="text-5xl font-extrabold text-white tracking-tight mb-4 uppercase">Register</h1>
        <div className="flex items-center gap-3 text-emerald-400 mb-6 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
           <Zap size={14} className="fill-emerald-400/20" />
           <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Join NutriAI</span>
        </div>
        <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-sm">
          Create your account and start your health journey today.
        </p>
      </div>

      <div className="glass-card p-10 sm:p-14 relative overflow-hidden group border-white/10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-500" />
        
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative group/field">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-emerald-400 transition-colors" size={20} />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 text-white pl-16 pr-6 py-5 rounded-2xl focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.06] transition-all placeholder-slate-700 text-sm font-medium"
                placeholder="Your Name"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group/field">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-emerald-400 transition-colors" size={20} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 text-white pl-16 pr-6 py-5 rounded-2xl focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.06] transition-all placeholder-slate-700 text-sm font-medium"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group/field">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-emerald-400 transition-colors" size={20} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 text-white pl-16 pr-6 py-5 rounded-2xl focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.06] transition-all placeholder-slate-700 text-sm font-medium"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-6 px-10 rounded-2xl transition-all flex items-center justify-center gap-4 shadow-xl shadow-emerald-500/20 active:scale-95 disabled:opacity-50 text-base uppercase tracking-tight group/btn"
          >
             {loading ? (
              <span className="animate-pulse tracking-widest">Creating account...</span>
            ) : (
              <>Create My Account <ArrowRight size={22} strokeWidth={2.5} className="group-hover/btn:translate-x-2 transition-transform" /></>
            )}
          </button>
        </form>

        <div className="mt-12 pt-10 border-t border-white/5 text-center relative z-10">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-6 leading-loose">
            Already have an account? <Link to="/login" className="text-emerald-400 hover:text-emerald-300 ml-2 border-b border-emerald-500/30 pb-0.5">Sign In</Link>
          </p>
          <div className="flex items-center justify-center gap-2 opacity-30 group-hover:opacity-60 transition-opacity">
             <ShieldPlus size={12} className="text-emerald-400" />
             <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-none">Secure Connection</span>
          </div>
        </div>
      </div>
      
      <p className="mt-12 text-center text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em] opacity-30">
        © {new Date().getFullYear()} NutriAI • All Rights Reserved
      </p>
    </div>
  );
};

export default RegisterPage;
