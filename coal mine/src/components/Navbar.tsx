import React, { useState } from 'react';
import {
  Construction,
  ChevronDown,
  LayoutDashboard,
  ShieldAlert,
  Gauge,
  RadioTower,
  Fingerprint,
  Users,
  ClipboardCheck,
  Activity,
  Bell,
  Globe,
  ArrowUpRight,
  Menu,
  X,
  Compass,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PageRoute } from '../types/mineguard';

interface NavbarProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  openIncidentsCount: number;
  apiLive: boolean;
  onOpenSupervisor: () => void;
  currentLang: string;
  onSelectLang: (lang: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  openIncidentsCount,
  apiLive,
  onOpenSupervisor,
  currentLang,
  onSelectLang,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mgmtOpen, setMgmtOpen] = useState(false);
  const [siteOpen, setSiteOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState('North Ridge Mine');

  const sites = [
    { name: 'North Ridge Mine', desc: 'Active pit operations · Seam 4B' },
    { name: 'Sector Alpha-7', desc: 'Autonomous extraction zone' },
    { name: 'South Basin Seam', desc: 'Sub-surface exploration' },
  ];

  const languages = [
    { code: 'en', name: 'English (US)' },
    { code: 'hi', name: 'हिन्दी (Hindi)' },
    { code: 'es', name: 'Español' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' },
    { code: 'zh', name: '中文 (Simplified)' },
  ];

  const workspaceItems: Array<{ label: PageRoute; icon: React.FC<{ size?: number; className?: string }> }> = [
    { label: 'Overview', icon: LayoutDashboard },
    { label: 'Safety & incidents', icon: ShieldAlert },
    { label: 'Production', icon: Gauge },
    { label: 'Equipment', icon: Construction },
    { label: 'Environment', icon: RadioTower },
    { label: 'Attendance & PPE', icon: Fingerprint },
  ];

  const managementItems: Array<{ label: PageRoute; icon: React.FC<{ size?: number; className?: string }> }> = [
    { label: 'Workforce', icon: Users },
    { label: 'Inspections', icon: ClipboardCheck },
    { label: 'Reports', icon: Activity },
  ];

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileOpen(false);
    setMgmtOpen(false);
  };

  const handleScrollToLandingSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-[#FAFAF8]/95 backdrop-blur-md border-b border-[#1546D9]/15 shadow-[0_4px_20px_-4px_rgba(21,70,217,0.06)] transition-all">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
        
        {/* ===================================================================
            LEFT: BRAND WORDMARK (Without Logo Box) + SITE SWITCHER
            =================================================================== */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          {/* Typographic Wordmark in Cobalt Blue */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex flex-col text-left group cursor-pointer focus:outline-none select-none"
          >
            <div className="font-['Barlow_Condensed'] text-2xl sm:text-[26px] font-black tracking-wider text-[#1546D9] leading-none flex items-center gap-1.5 transition-transform duration-200 group-hover:scale-[1.02]">
              <span>COALWORKS</span>
              <span className="w-2 h-2 rounded-full bg-[#1546D9] shadow-[0_0_8px_rgba(21,70,217,0.6)]" />
            </div>
            <div className="font-mono text-[9px] font-bold text-[#64748B] tracking-[2px] mt-0.5 uppercase">
              Mine Intelligence
            </div>
          </button>

          {/* Site Switcher Pill */}
          <div className="relative hidden xl:block border-l border-[#1546D9]/15 pl-4">
            <button
              onClick={() => setSiteOpen(!siteOpen)}
              className="flex items-center gap-2 bg-white hover:bg-[#F8F9FD] border border-[#1546D9]/15 hover:border-[#1546D9]/30 rounded-lg px-2.5 py-1.5 text-left transition-colors cursor-pointer shadow-xs"
            >
              <div className="w-6 h-6 rounded bg-[#1546D9]/10 text-[#1546D9] flex items-center justify-center">
                <Construction size={14} />
              </div>
              <div>
                <b className="font-['Barlow_Condensed'] text-xs font-bold text-[#14181C] uppercase block leading-none">
                  {selectedSite}
                </b>
                <span className="text-[9px] font-mono text-[#64748B] block mt-0.5">
                  Pit operations
                </span>
              </div>
              <ChevronDown size={14} className="text-[#1546D9] ml-1" />
            </button>

            <AnimatePresence>
              {siteOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute left-4 top-full mt-2 w-64 bg-white border border-[#1546D9]/15 rounded-xl shadow-xl p-2 z-50"
                >
                  {sites.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => {
                        setSelectedSite(s.name);
                        setSiteOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg text-xs transition-colors ${
                        selectedSite === s.name
                          ? 'bg-[#1546D9] text-white font-bold'
                          : 'hover:bg-[#1546D9]/5 text-[#14181C]'
                      }`}
                    >
                      <div className="font-bold">{s.name}</div>
                      <div className={`text-[10px] ${selectedSite === s.name ? 'text-white/80' : 'text-[#64748B]'}`}>
                        {s.desc}
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ===================================================================
            CENTER: WORKSPACE & MANAGEMENT NAVIGATION LINKS WITH COBALT ACCENTS
            =================================================================== */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* Front Page / Landing Home Link */}
          <button
            onClick={() => handleNavClick('home')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
              currentPage === 'home'
                ? 'bg-[#1546D9] text-white shadow-sm shadow-[#1546D9]/30'
                : 'text-[#475569] hover:text-[#1546D9] hover:bg-[#1546D9]/5'
            }`}
          >
            <Compass size={15} />
            <span>Front Page</span>
          </button>

          {/* Workspace Items */}
          {workspaceItems.map(({ label, icon: Icon }) => {
            const isActive = currentPage === label;
            return (
              <button
                key={label}
                onClick={() => handleNavClick(label)}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'text-[#1546D9] bg-white border border-[#1546D9]/20 shadow-xs font-black'
                    : 'text-[#5D666B] hover:text-[#1546D9] hover:bg-[#1546D9]/5'
                }`}
              >
                <Icon size={15} className={isActive ? 'text-[#1546D9]' : 'text-[#64748B]'} />
                <span>{label}</span>

                {/* Badge for Safety */}
                {label === 'Safety & incidents' && openIncidentsCount > 0 && (
                  <span className="font-mono text-[9px] font-black bg-[#1546D9] text-white px-1.5 py-0.5 rounded ml-0.5">
                    {openIncidentsCount}
                  </span>
                )}

                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#1546D9] rounded-full" />
                )}
              </button>
            );
          })}

          {/* Management Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMgmtOpen(!mgmtOpen)}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                managementItems.some((m) => m.label === currentPage)
                  ? 'text-[#1546D9] bg-white border border-[#1546D9]/20 shadow-xs font-black'
                  : 'text-[#5D666B] hover:text-[#1546D9] hover:bg-[#1546D9]/5'
              }`}
            >
              <span>Management</span>
              <ChevronDown size={14} className={managementItems.some((m) => m.label === currentPage) ? 'text-[#1546D9]' : 'text-[#64748B]'} />
            </button>

            <AnimatePresence>
              {mgmtOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute left-0 top-full mt-2 w-48 bg-white border border-[#1546D9]/15 rounded-xl shadow-xl p-1.5 z-50"
                >
                  {managementItems.map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      onClick={() => handleNavClick(label)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-left transition-colors ${
                        currentPage === label
                          ? 'bg-[#1546D9] text-white'
                          : 'text-[#14181C] hover:bg-[#1546D9]/5 hover:text-[#1546D9]'
                      }`}
                    >
                      <Icon size={15} />
                      <span>{label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* ===================================================================
            RIGHT: CONNECTION DOT + BELL + LANGUAGE + SUPERVISOR CTA
            =================================================================== */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Connection Live/Demo Indicator */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] font-bold text-[#1546D9] uppercase tracking-wider bg-white border border-[#1546D9]/15 px-2.5 py-1.5 rounded-full shadow-xs">
            <span className={apiLive ? 'live-dot' : 'demo-dot'} />
            <span>{apiLive ? 'API LIVE' : 'DEMO MODE'}</span>
          </div>

          {/* Incident Alert Bell Button */}
          <button
            onClick={() => handleNavClick('Safety & incidents')}
            className="relative w-9 h-9 rounded-full bg-white hover:bg-[#1546D9]/5 border border-[#1546D9]/15 hover:border-[#1546D9]/30 text-[#64748B] hover:text-[#1546D9] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
            aria-label="View Safety Incidents"
          >
            <Bell size={17} />
            {openIncidentsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#1546D9] shadow-[0_0_6px_rgba(21,70,217,0.7)]" />
            )}
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#14181C] bg-white hover:bg-[#1546D9]/5 border border-[#1546D9]/15 hover:border-[#1546D9]/30 rounded-full px-3 py-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Globe size={14} className="text-[#1546D9]" />
              <span className="font-mono text-[11px] font-bold text-[#1546D9]">{currentLang.toUpperCase()} / 6+</span>
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute right-0 top-full mt-2 w-44 bg-white border border-[#1546D9]/15 rounded-xl shadow-xl p-1.5 z-50"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        onSelectLang(l.code);
                        setLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between ${
                        currentLang === l.code
                          ? 'bg-[#1546D9] text-white'
                          : 'text-[#14181C] hover:bg-[#1546D9]/5 hover:text-[#1546D9]'
                      }`}
                    >
                      <span>{l.name}</span>
                      <span className="font-mono text-[10px] opacity-75">{l.code}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cobalt Blue CTA: Command Console */}
          <button
            onClick={onOpenSupervisor}
            className="group hidden sm:flex items-center gap-1.5 bg-[#1546D9] hover:bg-[#1037B0] text-white px-3.5 py-2 rounded-full text-xs font-bold shadow-md shadow-[#1546D9]/30 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Command Console</span>
            <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden w-9 h-9 rounded-lg bg-white border border-[#1546D9]/15 text-[#1546D9] flex items-center justify-center cursor-pointer shadow-xs"
            aria-label="Open Navigation Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* =====================================================================
          MOBILE DRAWER SLIDEOUT NAVIGATION (Soft White + Cobalt Blue Accents)
          ===================================================================== */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-[#FAFAF8] border-r border-[#1546D9]/15 z-50 flex flex-col p-6 overflow-y-auto lg:hidden"
            >
              {/* Drawer Header without Hardhat Logo */}
              <div className="flex items-center justify-between pb-4 border-b border-[#1546D9]/15 mb-6">
                <div>
                  <div className="font-['Barlow_Condensed'] text-2xl font-black text-[#1546D9] leading-none flex items-center gap-1">
                    <span>COALWORKS</span>
                    <span className="w-2 h-2 rounded-full bg-[#1546D9]" />
                  </div>
                  <div className="font-mono text-[9px] font-bold text-[#64748B] tracking-[2px] mt-0.5 uppercase">
                    Mine Intelligence
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#1546D9]/10 text-[#1546D9] flex items-center justify-center cursor-pointer hover:bg-[#1546D9]/20"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Site Badge */}
              <div className="p-3 bg-white border border-[#1546D9]/15 rounded-xl mb-6 shadow-xs">
                <span className="font-mono text-[10px] text-[#64748B] uppercase tracking-wider block">
                  Active Site
                </span>
                <b className="font-['Barlow_Condensed'] text-base font-black text-[#1546D9]">
                  {selectedSite}
                </b>
              </div>

              {/* Workspace Navigation */}
              <div className="mb-6">
                <div className="font-mono text-[10px] font-bold text-[#1546D9] tracking-wider uppercase mb-2">
                  Workspace
                </div>
                <div className="space-y-1">
                  <button
                    onClick={() => handleNavClick('home')}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold uppercase transition-colors ${
                      currentPage === 'home'
                        ? 'bg-[#1546D9] text-white'
                        : 'text-[#14181C] hover:bg-[#1546D9]/5 hover:text-[#1546D9]'
                    }`}
                  >
                    <Compass size={16} />
                    <span>Front Page (Landing)</span>
                  </button>

                  {workspaceItems.map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      onClick={() => handleNavClick(label)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold uppercase transition-colors ${
                        currentPage === label
                          ? 'bg-[#1546D9] text-white'
                          : 'text-[#14181C] hover:bg-[#1546D9]/5 hover:text-[#1546D9]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={16} />
                        <span>{label}</span>
                      </div>
                      {label === 'Safety & incidents' && openIncidentsCount > 0 && (
                        <span className="font-mono text-[10px] bg-[#1546D9] text-white px-2 py-0.5 rounded font-black">
                          {openIncidentsCount}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Management Navigation */}
              <div className="mb-6">
                <div className="font-mono text-[10px] font-bold text-[#1546D9] tracking-wider uppercase mb-2">
                  Management
                </div>
                <div className="space-y-1">
                  {managementItems.map(({ label, icon: Icon }) => (
                    <button
                      key={label}
                      onClick={() => handleNavClick(label)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-bold uppercase transition-colors ${
                        currentPage === label
                          ? 'bg-[#1546D9] text-white'
                          : 'text-[#14181C] hover:bg-[#1546D9]/5 hover:text-[#1546D9]'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* In-Page Quick Jump */}
              <div className="mb-6 pt-4 border-t border-[#1546D9]/15">
                <div className="font-mono text-[10px] font-bold text-[#1546D9] tracking-wider uppercase mb-2">
                  Front Page Sections
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                  <button
                    onClick={() => handleScrollToLandingSection('overview')}
                    className="p-2.5 bg-white border border-[#1546D9]/10 rounded-lg text-left text-slate-700 hover:text-[#1546D9] hover:border-[#1546D9]/30 font-bold"
                  >
                    Features // 01
                  </button>
                  <button
                    onClick={() => handleScrollToLandingSection('compliance')}
                    className="p-2.5 bg-white border border-[#1546D9]/10 rounded-lg text-left text-slate-700 hover:text-[#1546D9] hover:border-[#1546D9]/30 font-bold"
                  >
                    Compliance // 02
                  </button>
                </div>
              </div>

              {/* Drawer Footer CTA */}
              <div className="mt-auto pt-6 border-t border-[#1546D9]/15 space-y-3">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenSupervisor();
                  }}
                  className="w-full mg-btn primary justify-center"
                >
                  <span>Command Console</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
