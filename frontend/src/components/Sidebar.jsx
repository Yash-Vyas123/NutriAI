import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Search,
  TrendingUp,
  MessageSquare,
  User,
  LogOut,
  ChevronRight,
  Bot
} from 'lucide-react';

const Sidebar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Diet Plan', path: '/diet-plan', icon: <UtensilsCrossed size={20} /> },
    { name: 'Food Database', path: '/food-database', icon: <Search size={20} /> },
    { name: 'Progress', path: '/progress', icon: <TrendingUp size={20} /> },
    { name: 'NutriBot', path: '/chatbot', icon: <MessageSquare size={20} /> },
    { name: 'Health Profile', path: '/health-profile', icon: <User size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getProfileUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
    return `${baseUrl}${path}`;
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-[#0a0a0f] border-r border-white/5 z-40 hidden lg:flex flex-col">
      <div className="p-8 border-b border-white/5 bg-[#0a0a0f]/50 backdrop-blur-md sticky top-0 group">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="h-11 w-11 bg-white rounded-2xl flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-all duration-700 overflow-hidden p-2.5">
             <Bot className="text-slate-950 w-full h-full" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white leading-none">Nutri<span className="text-emerald-500">AI</span></span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Health Assistant</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-8 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group ${isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/5'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
            >
              <div className="flex items-center gap-4">
                <div className={`transition-all duration-500 ${isActive ? 'text-emerald-400 scale-110' : 'group-hover:text-emerald-400 group-hover:scale-110'}`}>
                  {item.icon}
                </div>
                <span className={`text-sm tracking-wide transition-all ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {item.name}
                </span>
              </div>
              {isActive && (
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-glow-emerald" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <Link to="/profile" className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 transition-all group mb-4">
          <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center border border-white/10 overflow-hidden shrink-0 group-hover:scale-110 transition-all duration-500 relative">
            <div className="absolute inset-0 bg-emerald-500/10" />
            {user?.profilePic ? (
              <img src={getProfileUrl(user.profilePic)} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="text-emerald-400" size={20} />
            )}
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-xs font-bold text-white truncate tracking-tight">{user?.name}</p>
            <p className="text-[10px] text-slate-500 truncate tracking-wide mt-0.5">{user?.email}</p>
          </div>
          <ChevronRight size={14} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-red-500/5 hover:bg-red-500/10 text-red-400 border border-red-500/10 transition-all active:scale-[0.98] font-bold tracking-tight text-xs group uppercase"
        >
          <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
