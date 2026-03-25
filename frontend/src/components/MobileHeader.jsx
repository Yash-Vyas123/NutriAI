import { Menu, Zap } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const MobileHeader = ({ onOpenMenu }) => {
  const location = useLocation();

  const getPageTitle = (path) => {
    switch (path) {
      case '/dashboard': return 'Dashboard';
      case '/diet-plan': return 'Diet Plan';
      case '/food-database': return 'Food Database';
      case '/progress': return 'Progress';
      case '/chatbot': return 'NutriBot';
      case '/health-profile': return 'Health Profile';
      case '/profile': return 'My Profile';
      default: return 'NutriAI';
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full h-20 lg:hidden bg-[#050508]/60 backdrop-blur-3xl border-b border-white/[0.05] z-[90] flex items-center justify-between px-6 transition-all animate-fade-up">
       <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1.5 opacity-60">
            <Zap className="text-emerald-500 fill-emerald-500/10" size={10} />
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Health Dashboard</span>
          </div>
          <h1 className="text-lg font-extrabold text-white tracking-tight leading-none">{getPageTitle(location.pathname)}</h1>
       </div>
       <button 
         onClick={onOpenMenu}
         className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center p-3 shadow-[0_15px_30px_-10px_rgba(255,255,255,0.2)] rotate-2 border-2 border-white/10 hover:rotate-0 transition-all duration-700 active:scale-90"
       >
         <Menu className="text-slate-950" size={24} strokeWidth={2.5} />
       </button>
    </header>
  );
};

export default MobileHeader;
