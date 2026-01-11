
import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Lock } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing Nero Protocol...');
  const [fadeOut, setFadeOut] = useState(false);

  const statuses = [
    'Calibrating Anti-Magic Arrays...',
    'Deciphering Hidden Grimoires...',
    'Synchronizing Threat Database...',
    'Establishing Secure Perimeter...',
    'Nero Intelligence Online.',
  ];

  useEffect(() => {
    const duration = 3500;
    const interval = 50;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onFinish, 800);
          }, 500);
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, interval);

    // Update status text
    const statusInterval = setInterval(() => {
      setStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 800);

    return () => {
      clearInterval(timer);
      clearInterval(statusInterval);
    };
  }, [onFinish]);

  const NERO_IMG_URL = "https://i.pinimg.com/736x/4f/d9/ab/4fd9abc34a044d2f4037355213cca7f5.jpg";

  return (
    <div className={`fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center transition-opacity duration-1000 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {/* Background HUD Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] border border-red-900/10 rounded-full animate-ui-ring" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-dashed border-red-500/5 rounded-full animate-[rotate-slow_180s_linear_infinite_reverse]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1)_0,transparent_70%)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-12 max-w-sm w-full px-8">
        {/* Nero bird Logo */}
        <div className="relative">
          <div className="absolute inset-0 bg-red-600/30 blur-3xl animate-pulse rounded-full" />
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-2 border-red-600/50 p-1 bg-black overflow-hidden shadow-[0_0_60px_rgba(220,38,38,0.3)] animate-in zoom-in duration-1000">
             <img 
               src={NERO_IMG_URL} 
               alt="Nero Raven" 
               className="w-full h-full object-cover scale-[1.25] brightness-110"
               style={{ objectPosition: 'center 30%' }}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 via-transparent to-transparent mix-blend-overlay" />
          </div>
          
          {/* Animated Crosshair Corners */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-red-600 animate-in slide-in-from-top-4 slide-in-from-left-4 duration-700" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-red-600 animate-in slide-in-from-bottom-4 slide-in-from-right-4 duration-700" />
        </div>

        <div className="text-center space-y-4 w-full">
          <div>
            <h1 className="nero-font text-5xl font-black text-white tracking-[0.3em] uppercase drop-shadow-2xl">Nero</h1>
            <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.6em] mt-1">Defensive Protocol</p>
          </div>

          {/* Loading Bar */}
          <div className="space-y-4 w-full">
            <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5 relative">
              <div 
                className="h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,1)] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-1/4 animate-[shimmer_2s_infinite]" />
            </div>
            
            <div className="flex flex-col items-center gap-1">
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest h-4">{status}</p>
              <p className="text-[9px] font-mono text-red-600 font-bold">{Math.round(progress)}% Complete</p>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { transform: translateX(-400%); }
          100% { transform: translateX(400%); }
        }
      `}} />
    </div>
  );
};

export default SplashScreen;
