
import React, { useState, useEffect } from 'react';
import { X, Shield, Globe, Lock, Terminal, Activity, Eye, Wifi, ExternalLink, AlertTriangle, Monitor, Cpu, MapPin, CameraOff, RefreshCw, Layers, ShieldOff } from 'lucide-react';

interface SandboxBrowserProps {
  url: string;
  onClose: () => void;
}

const SandboxBrowser: React.FC<SandboxBrowserProps> = ({ url, onClose }) => {
  const [isBooting, setIsBooting] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);
  const [mockIp, setMockIp] = useState(() => `10.255.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`);
  const [location, setLocation] = useState('Switzerland - Zurich Node');
  const [osDisguise, setOsDisguise] = useState('Linux x64 (Fedora 39)');
  const [showMap, setShowMap] = useState(false);

  const locations = [
    { name: 'USA - Virginia', ip: '52.12.98.44' },
    { name: 'Switzerland - Zurich', ip: '141.95.2.11' },
    { name: 'Japan - Tokyo', ip: '103.25.1.8' },
    { name: 'Iceland - Reykjavik', ip: '185.12.4.99' },
    { name: 'Australia - Sydney', ip: '13.236.2.101' },
    { name: 'Brazil - Sao Paulo', ip: '177.71.1.200' },
  ];

  const osProfiles = [
    'Windows 11 (Edge 122)',
    'MacOS Sonoma (Safari 17.2)',
    'Linux x64 (Chrome 123)',
    'Android 14 (Mobile View)',
    'iOS 17.4 (Mobile Safari)',
  ];

  const generateRandomIp = () => {
    const loc = locations[Math.floor(Math.random() * locations.length)];
    setMockIp(loc.ip);
    setLocation(loc.name + " (Auto)");
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] NODE ROTATION: New Tunnel established via ${loc.name}`]);
  };

  useEffect(() => {
    const bootSequence = [
      "Initializing Nero Secure Container...",
      `Allocating Virtual Node: ${mockIp}`,
      `Identity Mask: ${osDisguise}`,
      "Establishing Encrypted Tunnel via Tor-Node...",
      "Stripping Browser Headers...",
      "Hardware Switch: Camera/Mic [DISABLED]",
      "Activating DOM Sanitizer...",
      "Mounting isolated environment...",
      "SYSTEM READY. PROXYING TRAFFIC."
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < bootSequence.length) {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${bootSequence[i]}`]);
        i++;
      } else {
        setIsBooting(false);
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-2 md:p-8 animate-in fade-in duration-500 overflow-hidden">
      {/* HUD Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.2)_0,transparent_70%)]" />
        <div className="scanline absolute top-0 left-0 w-full h-1 bg-red-600/30 animate-[scan_4s_linear_infinite]" />
      </div>

      {/* Main Sandbox Frame */}
      <div className="relative w-full max-w-[1600px] h-full flex flex-col bg-[#050505] border border-red-900/40 rounded-3xl overflow-hidden shadow-[0_0_150px_rgba(220,38,38,0.3)]">
        
        {/* Header/Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-900/30 bg-black">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 flex items-center justify-center border border-red-600/40">
                <Terminal className="w-5 h-5 text-red-600" />
              </div>
              <div className="hidden sm:block">
                <h2 className="text-[10px] font-black uppercase text-red-500 tracking-[0.3em]">Containment Unit V4</h2>
                <p className="text-[9px] text-zinc-500 font-mono">STATUS: FULL_ISOLATION</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-6 border-l border-zinc-800 pl-6">
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase text-zinc-600 tracking-widest mb-1">Location Node</span>
                <span className="text-[10px] text-zinc-300 font-mono font-bold flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-red-500" /> {location}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase text-zinc-600 tracking-widest mb-1">Identity Mask</span>
                <span className="text-[10px] text-zinc-300 font-mono font-bold flex items-center gap-2">
                  <Monitor className="w-3 h-3 text-red-500" /> {osDisguise}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="bg-zinc-900 rounded-lg px-4 py-2 flex items-center gap-3 border border-zinc-800 shadow-inner group">
                <Globe className="w-3 h-3 text-zinc-500 group-hover:text-red-500 transition-colors" />
                <span className="text-[11px] text-zinc-400 font-mono truncate max-w-[150px] md:max-w-md">{url}</span>
             </div>
             <button 
               onClick={onClose}
               className="p-2.5 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl transition-all active:scale-90 border border-red-600/20"
             >
               <X className="w-5 h-5" />
             </button>
          </div>
        </div>

        <div className="flex-1 relative flex overflow-hidden">
          {/* Main Viewport */}
          <div className="flex-1 bg-zinc-900 relative">
            {isBooting ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 bg-black z-20">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-600/30 blur-3xl animate-pulse rounded-full" />
                  <Terminal className="w-16 h-16 text-red-600 animate-bounce relative z-10" />
                </div>
                <div className="w-80 max-h-[200px] overflow-y-auto font-mono text-[10px] text-zinc-500 space-y-1.5 scrollbar-hide p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                  {logs.map((log, i) => (
                    <div key={i} className="animate-in fade-in slide-in-from-left-2 opacity-80">{log}</div>
                  ))}
                  <div className="w-1 h-3 bg-red-500 inline-block animate-pulse ml-1" />
                </div>
              </div>
            ) : (
              <div className="w-full h-full p-4 md:p-8 bg-zinc-900">
                 <div className="w-full h-full bg-white rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 relative">
                    <iframe 
                      src={url}
                      title="Sandbox Browser"
                      className="w-full h-full border-none"
                      sandbox="allow-forms allow-scripts allow-same-origin"
                      onLoad={() => setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Content Loaded Successfully.`])}
                    />
                    
                    {/* Hardware Blockade Visualizers */}
                    <div className="absolute top-4 right-4 flex gap-2">
                       <div className="bg-black/80 backdrop-blur px-3 py-1.5 rounded-lg border border-red-500/30 flex items-center gap-2">
                          <CameraOff className="w-3 h-3 text-red-500" />
                          <span className="text-[9px] font-black text-white uppercase tracking-widest">Cam Blocked</span>
                       </div>
                       <div className="bg-black/80 backdrop-blur px-3 py-1.5 rounded-lg border border-red-500/30 flex items-center gap-2">
                          <ShieldOff className="w-3 h-3 text-red-500" />
                          <span className="text-[9px] font-black text-white uppercase tracking-widest">Sensors Cut</span>
                       </div>
                    </div>
                 </div>
              </div>
            )}
          </div>

          {/* Right Control & Intel HUD */}
          <div className="hidden xl:flex w-96 flex-col bg-black border-l border-red-900/20 p-8 space-y-10 overflow-y-auto custom-scrollbar">
            
            {/* Spoofing Section */}
            <div className="space-y-6">
              <h4 className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-500 tracking-[0.3em]">
                <Layers className="w-3 h-3 text-red-600" /> Identity Spoofing
              </h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Select Node Location</label>
                  <div className="grid grid-cols-1 gap-2">
                    <button 
                      onClick={() => setShowMap(true)}
                      className="w-full p-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-[10px] text-zinc-300 font-mono flex items-center justify-between group transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-red-500" /> {location}
                      </span>
                      <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-red-500" />
                    </button>
                    <button 
                      onClick={generateRandomIp}
                      className="w-full p-3 bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white border border-red-600/30 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-3 h-3" /> Randomize IP Node
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">System Fingerprint Disguise</label>
                  <select 
                    value={osDisguise}
                    onChange={(e) => setOsDisguise(e.target.value)}
                    className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] text-zinc-300 font-mono outline-none focus:border-red-500/50 appearance-none"
                  >
                    {osProfiles.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Live Intel Tracking */}
            <div className="space-y-6">
              <h4 className="flex items-center gap-2 text-[10px] font-black uppercase text-zinc-500 tracking-[0.3em]">
                <Activity className="w-3 h-3 text-red-600" /> Site Behavior Intel
              </h4>
              <div className="space-y-4">
                {[
                  { label: 'DOM Surveillance', desc: 'Tracking input fields for exfiltration attempts.', status: 'Active' },
                  { label: 'Network Probes', desc: 'Intercepting cross-domain requests.', status: 'Intercepted' },
                  { label: 'Script Execution', desc: 'Monitoring for heap-spray patterns.', status: 'Safe' },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl group hover:border-red-500/20 transition-all">
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-[10px] font-black uppercase text-white tracking-widest">{item.label}</span>
                       <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-full ${item.status === 'Intercepted' ? 'bg-red-500 text-white' : 'bg-zinc-800 text-zinc-500'}`}>
                         {item.status}
                       </span>
                    </div>
                    <p className="text-[9px] text-zinc-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto p-4 bg-red-600/5 border border-red-600/20 rounded-2xl">
               <p className="text-[9px] text-zinc-400 leading-relaxed font-bold uppercase tracking-wider text-center">
                 Secure Session Protocol ACTIVE
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* World Map Modal */}
      {showMap && (
        <div className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-6 backdrop-blur-sm">
          <div className="w-full max-w-4xl bg-[#0a0a0a] border border-red-900/40 rounded-[2.5rem] p-10 space-y-8 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="nero-font text-2xl font-black uppercase text-white tracking-widest">Global Node Selector</h3>
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-[0.3em]">Click a region to re-route your session</p>
              </div>
              <button onClick={() => setShowMap(false)} className="p-3 hover:bg-red-600 text-zinc-500 hover:text-white rounded-xl transition-all"><X /></button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {locations.map((loc) => (
                <button
                  key={loc.name}
                  onClick={() => {
                    setLocation(loc.name);
                    setMockIp(loc.ip);
                    setShowMap(false);
                  }}
                  className="flex flex-col items-start p-6 bg-zinc-900 hover:bg-red-600/10 border border-zinc-800 hover:border-red-600/50 rounded-2xl transition-all group"
                >
                  <MapPin className="w-5 h-5 text-zinc-600 group-hover:text-red-500 mb-4" />
                  <span className="text-[10px] font-black uppercase text-white tracking-widest mb-1">{loc.name.split(' - ')[0]}</span>
                  <span className="text-[9px] text-zinc-500 font-mono">{loc.name.split(' - ')[1]}</span>
                  <span className="mt-4 text-[9px] text-red-500/50 font-mono group-hover:text-red-500 transition-colors">IP: {loc.ip}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ef4444;
        }
      `}} />
    </div>
  );
};

export default SandboxBrowser;
