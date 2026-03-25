import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { X, LayoutDashboard, UtensilsCrossed, Search, TrendingUp, MessageSquare, User, LogOut, ChevronRight } from 'lucide-react';

const MobileNav = ({ isOpen, onClose }) => {
  const { logout, user } = useAuth();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={22} /> },
    { name: 'Diet Plan', path: '/diet-plan', icon: <UtensilsCrossed size={22} /> },
    { name: 'Food Database', path: '/food-database', icon: <Search size={22} /> },
    { name: 'Progress Hub', path: '/progress', icon: <TrendingUp size={22} /> },
    { name: 'NutriBot AI', path: '/chatbot', icon: <MessageSquare size={22} /> },
    { name: 'Health Engine', path: '/health-profile', icon: <User size={22} /> },
    { name: 'My Profile', path: '/profile', icon: <User size={22} /> },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden animate-fade-in flex">
      {/* Backdrop with Mesh */}
      <div className="absolute inset-0 bg-[#050508]/60 backdrop-blur-3xl animate-fade-in" onClick={onClose} />
      <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />

      <div className="relative w-full max-w-sm h-screen bg-[#0a0a0f] border-r border-white/5 flex flex-col p-8 shadow-2xl transition-transform duration-500 transform translate-x-0 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="flex justify-between items-center mb-14 relative z-10">
          <div className="text-3xl font-bold tracking-tighter text-white">
            Nutri<span className="text-emerald-500 italic">AI</span>
          </div>
          <button onClick={onClose} className="w-12 h-12 flex items-center justify-center text-slate-500 border border-white/5 rounded-2xl bg-white/5 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all active:scale-90">
            <X size={26} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-2 overflow-y-auto custom-scrollbar relative z-10">
          {menuItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center justify-between p-5 rounded-2xl transition-all border ${
                location.pathname === item.path 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-xl shadow-emerald-500/5' 
                : 'text-slate-400 hover:text-white border-transparent hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-5">
                <div className={location.pathname === item.path ? 'text-emerald-400 scale-110' : 'text-slate-500 opacity-60'}>{item.icon}</div>
                <span className={`text-base tracking-wide ${location.pathname === item.path ? 'font-bold' : 'font-medium'}`}>{item.name}</span>
              </div>
              <ChevronRight size={14} className={location.pathname === item.path ? 'text-emerald-400' : 'text-slate-800'} />
            </Link>
          ))}
        </nav>

        <div className="pt-10 border-t border-white/5 mt-auto relative z-10">
          <button
            onClick={() => { logout(); onClose(); }}
            className="w-full flex items-center justify-center gap-4 py-5 rounded-2xl bg-red-500/5 hover:bg-red-500/10 text-red-500 border border-red-500/10 transition-all active:scale-[0.98] font-bold tracking-tight text-base uppercase group"
          >
            <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
            Sign Out Portal
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
