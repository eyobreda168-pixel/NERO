
import React, { useState } from 'react';

export const NeroIcon: React.FC<{ className?: string, isScanning?: boolean }> = ({ className, isScanning }) => {
  const [hasError, setHasError] = useState(false);

  // Updated to a high-quality, realistic "Nero-style" black bird image (Raven)
  const NERO_IMG_URL = "https://i.pinimg.com/736x/4f/d9/ab/4fd9abc34a044d2f4037355213cca7f5.jpg";

  return (
    <div className={`${className} relative flex items-center justify-center group`}>
      {/* Background Magical Aura */}
      <div className={`absolute inset-0 rounded-full transition-all duration-1000 blur-[40px] ${
        isScanning 
          ? 'bg-red-600/50 scale-150 opacity-100 animate-pulse' 
          : 'bg-red-500/10 dark:bg-red-900/10 scale-100 opacity-40 group-hover:opacity-60 group-hover:scale-110'
      }`} />
      
      {/* HUD-style Outer Rings */}
      <div className={`absolute inset-[-10px] rounded-full border border-zinc-300 dark:border-zinc-800/40 transition-all duration-1000 ${
        isScanning ? 'scale-110 opacity-100 rotate-180 border-red-500/40' : 'scale-100 opacity-20'
      }`} />
      
      <div className={`absolute inset-[-20px] rounded-full border border-dashed border-zinc-300 dark:border-zinc-800/20 transition-all duration-[3000ms] ${
        isScanning ? 'rotate-[360deg] opacity-100 scale-125 border-red-500/20' : 'opacity-0 scale-90'
      }`} />

      {/* Main Container - Circle Crop */}
      <div className={`relative w-full h-full rounded-full overflow-hidden border-2 transition-all duration-700 shadow-2xl flex items-center justify-center
        ${isScanning 
          ? 'border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.4)]' 
          : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111]'
        }
      `}>
        {!hasError ? (
          <img 
            src={NERO_IMG_URL} 
            alt="Nero Bird"
            className={`w-full h-full object-cover transition-all duration-[2000ms] ease-out
              ${isScanning ? 'scale-[1.4] brightness-125 rotate-3' : 'scale-[1.2] group-hover:scale-[1.25] group-hover:-rotate-3'}
            `}
            style={{ 
              objectPosition: 'center 30%',
              filter: `contrast(1.1) ${isScanning ? 'saturate(1.4) drop-shadow(0 0 10px rgba(220,38,38,0.5))' : 'grayscale(0.2)'}`
            }}
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
             <div className="w-12 h-12 rounded-full bg-red-600 animate-pulse" />
          </div>
        )}

        {/* Scanning Light Sweep Overlay */}
        {isScanning && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-[20%] bg-gradient-to-b from-transparent via-red-500/40 to-transparent animate-[neroScan_2s_linear_infinite]" />
            <div className="absolute inset-0 bg-red-600/5 mix-blend-overlay animate-pulse" />
          </div>
        )}
      </div>

      {/* Decorative Crosshair Elements */}
      {isScanning && (
        <>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-px h-8 bg-red-500/60" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 w-px h-8 bg-red-500/60" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 h-px w-8 bg-red-500/60" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 h-px w-8 bg-red-500/60" />
        </>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes neroScan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
      `}} />
    </div>
  );
};
