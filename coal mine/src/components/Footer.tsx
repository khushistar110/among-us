import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-[#1546D9] text-white pt-20 pb-8 px-6 lg:px-16 overflow-hidden border-t border-[#1546D9]">
      
      {/* Background Soft Ambient Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-white/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#F9B315]/15 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* TOP ROW: Headline & Newsletter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-16">
          
          {/* Left: Headline & Badge */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-white mb-5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Plan ahead // DGMS Compliant</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.1]">
              Mine Smarter.{' '}
              <span 
                className="italic font-normal text-[#F9B315]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Work Safer.
              </span>
            </h2>

            <p className="text-white/80 text-base md:text-lg mt-3 max-w-md font-normal leading-relaxed">
              Real-time AI telemetry, IoT safety monitoring, and digitized shift handovers in one place.
            </p>
          </div>

          {/* Right: Newsletter Input */}
          <div className="w-full max-w-md">
            <span className="block text-xs font-mono text-white/70 mb-2">
              Monthly mining tech & safety notes
            </span>
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={subscribed ? "Subscribed! Thank you." : "Your work email"}
                disabled={subscribed}
                required
                className="w-full bg-white/10 border border-white/25 rounded-xl px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:border-[#F9B315] focus:bg-white/15 transition-all"
              />
              <button 
                type="submit"
                className="bg-[#F9B315] hover:bg-[#FBBF24] text-[#0B0F19] font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-black/15 shrink-0 cursor-pointer active:scale-95"
              >
                {subscribed ? 'Joined ✓' : 'Subscribe'}
              </button>
            </form>
            <p className="text-[11px] text-white/50 mt-2">
              By subscribing you agree to our <a href="#privacy" className="underline hover:text-white transition-colors">Privacy Policy</a>.
            </p>
          </div>

        </div>

        {/* MIDDLE ROW: Brand & 3 Link Columns */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12 border-t border-white/15">
          
          {/* Brand Info (2 Columns) */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#F9B315] flex items-center justify-center text-[#0B0F19] font-black text-sm shadow-md">
                ↗
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                CoalWorks®
              </span>
            </div>
            <p className="text-xs text-white/75 leading-relaxed mt-4 max-w-sm">
              AI-powered productivity and connected IoT safety architecture tailored for Indian coal mining operations.
            </p>
          </div>

          {/* Column 1: Features */}
          <div>
            <span className="block text-xs font-mono uppercase tracking-widest text-white/60 mb-4">
              Platform
            </span>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li><a href="#overview" className="hover:text-white transition-colors">Shift Management</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">Issue & Task Tracker</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">Safety Monitoring</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">Paper-to-Digital OCR</a></li>
            </ul>
          </div>

          {/* Column 2: Tech & Standards */}
          <div>
            <span className="block text-xs font-mono uppercase tracking-widest text-white/60 mb-4">
              Technology
            </span>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li><a href="#overview" className="hover:text-white transition-colors">Offline Mesh Sync</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">DGMS Safety Standards</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">ERP API Mapping</a></li>
              <li><a href="#overview" className="hover:text-white transition-colors">IoT Smart Vest</a></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <span className="block text-xs font-mono uppercase tracking-widest text-white/60 mb-4">
              Team & Docs
            </span>
            <ul className="space-y-2.5 text-xs text-white/80">
              <li><a href="#team" className="hover:text-white transition-colors">Team Diet Code</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub Repository</a></li>
              <li><a href="#research" className="hover:text-white transition-colors">Research Proofs</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Help Centre</a></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM ROW: Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-xs text-white/60">
          <div>
            © 2026 CoalWorks. All rights reserved. Built by Team Diet Code.
          </div>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>

      {/* GIANT OVERFLOW WATERMARK AT THE VERY BOTTOM */}
      <div className="w-full text-center pointer-events-none select-none overflow-hidden mt-6 -mb-10">
        <span className="text-[14vw] font-black tracking-tighter text-white/[0.08] leading-none inline-block">
          COALWORKS®
        </span>
      </div>

    </footer>
  );
};

export default Footer;
