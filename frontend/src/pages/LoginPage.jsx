import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Bot, Zap, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg animate-fade-up">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="w-20 h-20 bg-white rounded-[2.2rem] flex items-center justify-center mb-10 shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-1000 p-5 ring-offset-[14px] ring-offset-[#050508] ring-4 ring-white/5">
           <Bot className="w-full h-full text-slate-950" />
        </div>
        <h1 className="text-5xl font-extrabold text-white tracking-tight mb-4 uppercase">Nutri<span className="accent-gradient-text italic">AI</span></h1>
        <div className="flex items-center gap-3 text-emerald-400 mb-6 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
           <Zap size={14} className="fill-emerald-400/20" />
           <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Login</span>
        </div>
        <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-sm">
          Access your personalized nutrition dashboard.
        </p>
      </div>

      <div className="glass-card p-10 sm:p-14 relative overflow-hidden group border-white/10">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-500" />
        
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
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
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
              <Link to="/forgot-password" title="Forgot password recovery not available" className="text-[9px] font-bold text-slate-600 uppercase tracking-widest hover:text-emerald-400 transition-colors">Forgot Password?</Link>
            </div>
            <div className="relative group/field">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/field:text-sky-400 transition-colors" size={20} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 text-white pl-16 pr-6 py-5 rounded-2xl focus:outline-none focus:border-sky-500/50 focus:bg-white/[0.06] transition-all placeholder-slate-700 text-sm font-medium"
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
              <span className="animate-pulse">Signing in...</span>
            ) : (
              <>Sign In <ArrowRight size={22} strokeWidth={2.5} className="group-hover/btn:translate-x-2 transition-transform" /></>
            )}
          </button>
        </form>

        <div className="mt-12 pt-10 border-t border-white/5 text-center relative z-10">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-6 leading-loose">
            New here? <Link to="/register" className="text-emerald-400 hover:text-emerald-300 ml-2 border-b border-emerald-500/30 pb-0.5">Create an Account</Link>
          </p>
          <div className="flex items-center justify-center gap-2 opacity-30 group-hover:opacity-60 transition-opacity">
             <ShieldCheck size={12} className="text-emerald-400" />
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

export default LoginPage;
