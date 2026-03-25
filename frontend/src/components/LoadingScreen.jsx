import { Zap, Activity, Brain } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[200] bg-[#050508] flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-scientific-grid opacity-20" />
      <div className="absolute top-[-20%] left-[-10%] w-full h-full bg-green-500/[0.05] rounded-full blur-[200px] animate-pulse-slow" />

      <div className="relative text-center z-10">
        <div className="relative inline-block mb-12">
          {/* Pulsing Outer Ring */}
          <div className="absolute inset-0 bg-green-500/20 rounded-[2.5rem] blur-3xl animate-pulse" />
          
          <div className="relative h-32 w-32 bg-white rounded-[2.5rem] flex items-center justify-center p-7 shadow-2xl rotate-3 animate-bounce-slow">
            <img src="/favicon.png" alt="NutriAI" className="w-full h-full object-contain" />
          </div>

          {/* Contextual Icons */}
          <Activity className="absolute -top-4 -right-4 text-blue-500 animate-pulse" size={32} />
          <Brain className="absolute -bottom-4 -left-4 text-green-500 animate-pulse [animation-delay:0.5s]" size={32} />
        </div>

        <div className="mt-8">
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-4">
            Nutri<span className="text-green-500">AI</span> Initializing
          </h1>
          
          <div className="w-64 h-1.5 bg-white/5 rounded-full mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-400 animate-loading-bar origin-left" />
          </div>

          <div className="mt-6 flex flex-col items-center gap-2">
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] animate-pulse">Syncing Neural Weights...</p>
             <div className="flex items-center gap-2 opacity-30 mt-4">
                <Zap size={14} className="text-green-500" />
                <span className="text-[8px] font-black text-white uppercase tracking-widest">Quantum Engine v2.0</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
