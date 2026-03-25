import { useState, useEffect, useRef } from 'react';
import api from '../api/axios';
import { Send, Bot, User, Sparkles, Activity, Flame, Trash2, X, ChevronRight, MessageCircle } from 'lucide-react';

const ChatbotPage = () => {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('nutri_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Chat history corrupted, resetting.');
    }
    return [
      { role: 'assistant', text: "Hello! I'm NutriBot, your personal nutrition assistant. How can I help you reach your health goals today?" }
    ];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    try {
      localStorage.setItem('nutri_chat_history', JSON.stringify(messages));
    } catch (e) { }
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('health/profile');
        setProfile(data);
      } catch (err) { }
    };
    fetchProfile();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput('');
    setLoading(true);

    try {
      const { data } = await api.post('ai/chat', { message: currentInput });
      if (data && data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
      } else {
        throw new Error('Invalid AI response');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "I'm having a bit of trouble connecting to Gemini. Please try again in a moment.";
      setMessages(prev => [...prev, { role: 'assistant', text: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    const resetMsg = [{ role: 'assistant', text: "Chat cleared. What's on your mind?" }];
    setMessages(resetMsg);
    localStorage.removeItem('nutri_chat_history');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-160px)] lg:h-[calc(100vh-120px)] animate-fade-up">

      {/* ─── Simplified Chat Interface ────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col glass-card !rounded-[2.5rem] overflow-hidden relative shadow-xl border-white/10">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02] relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center p-2.5 shadow-lg shadow-emerald-500/20">
              <Bot className="text-white w-full h-full" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">NutriBot</h2>
              <div className="flex items-center gap-2 mt-1">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                 <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Active</span>
              </div>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="p-3 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all active:scale-95"
            title="Clear Chat"
          >
            <Trash2 size={20} />
          </button>
        </div>

        {/* Messaging Area */}
        <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10 space-y-8 custom-scrollbar relative z-10">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 sm:gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`mt-1 h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-md ${msg.role === 'user'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white/10 text-emerald-400'
                }`}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>

              <div className={`max-w-[85%] sm:max-w-[75%] px-6 py-4 rounded-[1.8rem] relative ${msg.role === 'user'
                  ? 'bg-emerald-500 text-white font-medium rounded-tr-none shadow-lg'
                  : 'bg-white/[0.05] border border-white/10 text-slate-200 rounded-tl-none backdrop-blur-md'
                }`}>
                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                  {typeof msg.text === 'string' ? msg.text.replace(/\*\*/g, '').replace(/\*/g, '•') : JSON.stringify(msg.text)}
                </p>
                <span className={`text-[10px] mt-2 block opacity-50 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-6 items-center">
               <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Bot className="text-emerald-500 animate-bounce" size={20} />
              </div>
              <div className="px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">NutriBot is thinking...</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 sm:p-10 border-t border-white/5 bg-white/[0.01]">
          <div className="max-w-4xl mx-auto mb-6 flex flex-wrap gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {[
              "Suggestions for breakfast?",
              "What is my BMI?",
              "Quick high-protein snack",
              "How much water to drink?"
            ].map((text, i) => (
              <button
                key={i}
                onClick={() => setInput(text)}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[11px] font-bold text-slate-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-all whitespace-nowrap"
              >
                {text}
              </button>
            ))}
          </div>
          
          <form onSubmit={handleSend} className="relative max-w-4xl mx-auto group">
            <input
              type="text"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={loading ? "Thinking..." : "Message NutriBot..."}
              className="w-full bg-white/[0.03] border border-white/10 text-white pl-8 pr-28 py-5 rounded-[2rem] focus:outline-none focus:border-emerald-500/30 focus:bg-white/[0.05] transition-all placeholder-slate-600 text-sm sm:text-base font-medium shadow-inner"
            />
            <div className="absolute right-3 top-3 bottom-3 flex items-center gap-2">
              {input && (
                <button
                  type="button"
                  onClick={() => setInput('')}
                  className="p-2 text-slate-500 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              )}
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="h-full px-6 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-2xl flex items-center justify-center transition-all active:scale-[0.95] disabled:opacity-20 shadow-lg shadow-emerald-500/20"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
          <p className="text-center text-slate-600 text-[10px] font-bold mt-6 opacity-60 italic flex items-center justify-center gap-2 uppercase tracking-widest">
            <MessageCircle size={10} />
            Check with a professional before changing diet.
          </p>
        </div>
      </div>

      {/* ─── Simplified Sidebar ─────────────────────────────────────────────── */}
      <div className="hidden xl:flex flex-col w-80 gap-6">

        <div className="glass-card p-10 flex flex-col items-center text-center relative overflow-hidden transition-all hover:border-emerald-500/20">
          <div className="w-20 h-20 rounded-[2rem] bg-slate-800 flex items-center justify-center mb-6 border border-white/10 relative shadow-inner">
             <User size={36} className="text-emerald-500/40" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">My Overview</h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-10">Body Stats</p>

          <div className="space-y-4 w-full">
            <div className="bg-white/5 border border-white/5 p-5 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity size={18} className="text-emerald-400" />
                <span className="text-xs font-bold text-slate-400">BMI</span>
              </div>
              <span className="text-lg font-bold text-white">{profile?.bmi || '0.0'}</span>
            </div>
            
            <div className="bg-white/5 border border-white/5 p-5 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Flame size={18} className="text-sky-400" />
                <span className="text-xs font-bold text-slate-400">Target</span>
              </div>
              <span className="text-lg font-bold text-white">{profile?.dailyCalories || '0'} <span className="text-[10px] text-slate-500 ml-1 font-bold">kcal</span></span>
            </div>
          </div>
          
          <button onClick={() => window.location.href='/health-profile'} className="w-full mt-10 py-4 rounded-xl border border-white/5 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-3">
             Edit Profile <ChevronRight size={14} />
          </button>
        </div>

        <div className="glass-card p-8 bg-gradient-to-br from-emerald-500/5 to-transparent">
           <div className="flex items-center gap-3 text-emerald-500 mb-6">
              <Sparkles size={18} />
              <h4 className="text-[10px] font-black uppercase tracking-widest">How I Help</h4>
           </div>
           <div className="space-y-4">
              <div className="flex gap-3 items-start">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                 <p className="text-xs text-slate-400 leading-relaxed font-bold tracking-tight">Personalized meal ideas and fitness advice.</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ChatbotPage;
