
import React from 'react';
import { Mail, Phone, ExternalLink, ChevronLeft, Terminal, Globe, User, Shield } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  const NERO_BIRD_URL = "https://i.pinimg.com/736x/4f/d9/ab/4fd9abc34a044d2f4037355213cca7f5.jpg";

  return (
    <div className="w-full space-y-10 animate-in fade-in slide-in-from-right-8 duration-700 pb-20">
      <div className="relative h-64 rounded-[3rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
          alt="Cyber Security" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#121212] via-transparent to-transparent" />
        <div className="relative h-full flex flex-col items-center justify-center space-y-4">
          <div className="w-24 h-24 rounded-full border-4 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.4)] overflow-hidden">
            <img src={NERO_BIRD_URL} alt="Nero" className="w-full h-full object-cover" style={{ objectPosition: 'center 30%' }} />
          </div>
          <h1 className="nero-font text-3xl font-black uppercase tracking-widest text-center">Eyob Reda</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600">Lead Architect</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-8 bg-white dark:bg-[#1e1e1e] rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-xl space-y-6">
          <h3 className="nero-font text-lg font-black uppercase tracking-widest">Digital Ethos</h3>
          <p className="text-sm text-zinc-500 leading-relaxed font-medium">
            Developing security-first software for the next generation of mobile computing. 
            Nero is a personal passion project dedicated to making forensic analysis accessible.
          </p>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-red-600/10 rounded-xl"><Mail className="w-4 h-4 text-red-600" /></div>
               <span className="text-xs font-bold truncate">eyobreda168@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
               <div className="p-3 bg-red-600/10 rounded-xl"><Phone className="w-4 h-4 text-red-600" /></div>
               <span className="text-xs font-bold">+251 900 915 449</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-white dark:bg-[#1e1e1e] rounded-[2rem] border border-zinc-100 dark:border-zinc-800 text-center">
             <Shield className="w-6 h-6 text-red-600 mx-auto mb-3" />
             <p className="text-[10px] font-black uppercase">Security</p>
          </div>
          <div className="p-6 bg-white dark:bg-[#1e1e1e] rounded-[2rem] border border-zinc-100 dark:border-zinc-800 text-center">
             <Terminal className="w-6 h-6 text-cyan-500 mx-auto mb-3" />
             <p className="text-[10px] font-black uppercase">Dev Ops</p>
          </div>
        </div>
      </div>

      <button onClick={onBack} className="w-full py-5 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 active:scale-95 transition-transform">
        <ChevronLeft className="w-4 h-4" /> Terminal Home
      </button>
    </div>
  );
};

export default AboutPage;
