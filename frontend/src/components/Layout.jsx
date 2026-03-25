import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MobileNav from './MobileNav';
import MobileHeader from './MobileHeader';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isPublicPage = ['/login', '/register'].includes(location.pathname);

  if (isPublicPage) {
    return (
      <div className="min-h-screen bg-[#050508] text-white selection:bg-emerald-500/30">
        <div className="fixed inset-0 bg-mesh opacity-40 pointer-events-none" />
        <div className="fixed inset-0 scientific-grid pointer-events-none opacity-[0.03]" />
        <main className="relative z-10 w-full min-h-screen flex items-center justify-center p-6">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] text-white flex overflow-hidden selection:bg-emerald-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-mesh opacity-30 pointer-events-none z-0" />
      <div className="fixed inset-0 scientific-grid pointer-events-none opacity-[0.05] z-0" />
      
      {/* Sidebar - Desktop Only */}
      <Sidebar />

      {/* Main Framework */}
      <div className="flex-1 flex flex-col lg:pl-72 relative z-10 w-full min-h-screen">
        {/* Header - Mobile Only */}
        <MobileHeader onOpenMenu={() => setIsMobileMenuOpen(true)} />

        <main className="flex-1 overflow-y-auto custom-scrollbar pt-24 lg:pt-0">
          <div className="max-w-7xl mx-auto px-6 py-8 sm:px-10 lg:px-12 xl:px-16 animate-fade-up">
             {children}
          </div>
        </main>
      </div>

      {/* Mobile Interaction Portal */}
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      {/* Bottom Padding for Mobile (Safe Area) */}
      <div className="lg:hidden h-20" />
    </div>
  );
};

export default Layout;
