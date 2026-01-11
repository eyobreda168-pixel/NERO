
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { 
  Link2, Upload, Ghost, Flame, Search, ShieldAlert, Loader2, 
  ShieldCheck, FileCheck, XCircle, Terminal, Layers, Square, 
  Menu, X, Sun, Moon, Info, BookOpen, RefreshCw, Smartphone, 
  Camera, FolderOpen, ChevronRight, Play
} from 'lucide-react';
import { NeroIcon } from './components/NeroIcon';
import AboutPage from './components/AboutPage';
import AnalysisDisplay from './components/AnalysisDisplay';
import SplashScreen from './components/SplashScreen';
import { analyzeLink, analyzeFile } from './services/geminiService';
import { ScanState } from './types';

// New Sub-components for Android feel
const PermissionsScreen = ({ onNext }: { onNext: () => void }) => (
  <div className="fixed inset-0 z-[150] bg-white dark:bg-[#121212] p-8 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
    <div className="space-y-8">
      <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/20">
        <Smartphone className="text-white w-8 h-8" />
      </div>
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight">System Access</h1>
        <p className="text-zinc-500 mt-2">Nero requires specific authorizations to defend your perimeter.</p>
      </div>
      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 bg-zinc-50 dark:bg-[#1e1e1e] rounded-2xl border border-zinc-100 dark:border-zinc-800">
          <Camera className="text-red-600 w-6 h-6 mt-1" />
          <div>
            <p className="font-bold text-sm">Visual Acquisition (Camera)</p>
            <p className="text-xs text-zinc-500">Scan QR codes and physical links for instant analysis.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4 bg-zinc-50 dark:bg-[#1e1e1e] rounded-2xl border border-zinc-100 dark:border-zinc-800">
          <FolderOpen className="text-cyan-500 w-6 h-6 mt-1" />
          <div>
            <p className="font-bold text-sm">Storage Access (Files)</p>
            <p className="text-xs text-zinc-500">Analyze PDF, Binaries, and local artifacts for threats.</p>
          </div>
        </div>
      </div>
      <button 
        onClick={onNext}
        className="w-full py-5 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl active:scale-[0.98] transition-transform"
      >
        Grant Access
      </button>
    </div>
  </div>
);

const AppInfoScreen = ({ onStart }: { onStart: () => void }) => (
  <div className="fixed inset-0 z-[150] bg-white dark:bg-[#121212] p-8 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-8 duration-700">
    <div className="space-y-8">
      <div className="flex justify-center">
        <NeroIcon className="w-40 h-40" />
      </div>
      <div className="text-center">
        <h1 className="nero-font text-4xl font-black uppercase tracking-[0.2em]">The Nero Protocol</h1>
        <p className="text-zinc-500 mt-4 text-sm leading-relaxed px-4">
          Inspired by the anti-magic raven, Nero is an advanced threat intelligence division in your pocket. 
          We use search grounding and forensic AI to deconstruct malicious artifacts before they harm your system.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-zinc-50 dark:bg-[#1e1e1e] rounded-2xl text-center border border-zinc-100 dark:border-zinc-800">
          <ShieldAlert className="w-5 h-5 text-red-600 mx-auto mb-2" />
          <p className="text-[10px] font-black uppercase text-zinc-400">Threat Logic</p>
        </div>
        <div className="p-4 bg-zinc-50 dark:bg-[#1e1e1e] rounded-2xl text-center border border-zinc-100 dark:border-zinc-800">
          <Layers className="w-5 h-5 text-cyan-500 mx-auto mb-2" />
          <p className="text-[10px] font-black uppercase text-zinc-400">Deep Scan</p>
        </div>
      </div>
      <button 
        onClick={onStart}
        className="w-full py-5 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-red-600/20 active:scale-[0.98] transition-transform"
      >
        Initiate System
      </button>
    </div>
  </div>
);

const HowToUsePage = ({ onBack }: { onBack: () => void }) => (
  <div className="w-full space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 p-4 pb-24 overflow-y-auto max-h-screen">
    <div className="flex items-center gap-4">
      <button onClick={onBack} className="p-2 bg-zinc-100 dark:bg-[#1e1e1e] rounded-xl"><X className="w-5 h-5" /></button>
      <h2 className="nero-font text-2xl font-black uppercase tracking-widest">Tactical Guide</h2>
    </div>
    <div className="space-y-6">
      <div className="p-6 bg-zinc-50 dark:bg-[#1e1e1e] rounded-3xl border border-zinc-100 dark:border-zinc-800 space-y-4">
        <div className="w-10 h-10 bg-red-600/10 rounded-xl flex items-center justify-center text-red-600 font-black">1</div>
        <h3 className="font-bold text-lg">Input Artifact</h3>
        <p className="text-sm text-zinc-500 leading-relaxed">Paste any suspicious URL or upload local files. Nero accepts PDF, Scripts, and Executables.</p>
      </div>
      <div className="p-6 bg-zinc-50 dark:bg-[#1e1e1e] rounded-3xl border border-zinc-100 dark:border-zinc-800 space-y-4">
        <div className="w-10 h-10 bg-red-600/10 rounded-xl flex items-center justify-center text-red-600 font-black">2</div>
        <h3 className="font-bold text-lg">Deconstruction</h3>
        <p className="text-sm text-zinc-500 leading-relaxed">Wait as Nero probes the target. We check domain age, hosting reputation, and payload structure.</p>
      </div>
      <div className="p-6 bg-zinc-50 dark:bg-[#1e1e1e] rounded-3xl border border-zinc-100 dark:border-zinc-800 space-y-4">
        <div className="w-10 h-10 bg-red-600/10 rounded-xl flex items-center justify-center text-red-600 font-black">3</div>
        <h3 className="font-bold text-lg">Risk Mitigation</h3>
        <p className="text-sm text-zinc-500 leading-relaxed">Review the verdict. If critical, use the isolated Sandbox Browser to inspect without local infection.</p>
      </div>
      <div className="relative group rounded-3xl overflow-hidden bg-black aspect-video flex flex-col items-center justify-center border border-zinc-800">
         <div className="absolute inset-0 bg-red-600/20 blur-2xl opacity-40" />
         <Play className="w-12 h-12 text-white mb-2 relative z-10" />
         <span className="text-xs font-black uppercase text-white/50 relative z-10 tracking-[0.3em]">Tutorial Coming Soon</span>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [step, setStep] = useState<'splash' | 'permissions' | 'info' | 'main'>('splash');
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'how' | 'updates'>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [scanState, setScanState] = useState<ScanState>({
    isScanning: false,
    result: null,
    error: null,
  });

  const isCancelledRef = useRef(false);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const handleLinkScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    isCancelledRef.current = false;
    setScanState({ isScanning: true, result: null, error: null });
    try {
      const result = await analyzeLink(url);
      if (isCancelledRef.current) return;
      setScanState({ isScanning: false, result, error: null });
    } catch (err: any) {
      if (isCancelledRef.current) return;
      setScanState({ isScanning: false, result: null, error: 'Terminal Failure.' });
    }
  };

  const processFile = useCallback(async (file: File) => {
    if (!file) return;
    isCancelledRef.current = false;
    setScanState({ isScanning: true, result: null, error: null });
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64 = (reader.result as string).split(',')[1];
        const result = await analyzeFile(file, base64);
        if (isCancelledRef.current) return;
        setScanState({ isScanning: false, result, error: null });
      } catch (err: any) {
        if (isCancelledRef.current) return;
        setScanState({ isScanning: false, result: null, error: 'Analysis Aborted.' });
      }
    };
    reader.readAsDataURL(file);
  }, []);

  if (step === 'splash') return <SplashScreen onFinish={() => setStep('permissions')} />;
  if (step === 'permissions') return <PermissionsScreen onNext={() => setStep('info')} />;
  if (step === 'info') return <AppInfoScreen onStart={() => setStep('main')} />;

  return (
    <div className="fixed inset-0 bg-[#f9f9f9] dark:bg-[#121212] flex flex-col transition-colors duration-300">
      
      {/* Sidemenu Drawer */}
      <div className={`fixed inset-0 z-[200] transition-opacity duration-300 ${isSidebarOpen ? 'bg-black/40 opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsSidebarOpen(false)} />
      <aside className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white dark:bg-[#1e1e1e] z-[210] shadow-2xl transition-transform duration-500 ease-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 h-full flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <h2 className="nero-font text-xl font-black uppercase text-red-600 tracking-widest">Nero Menu</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl"><X className="w-5 h-5" /></button>
          </div>
          <nav className="space-y-2 flex-1">
            <button onClick={() => { setCurrentView('home'); setIsSidebarOpen(false); setScanState({ isScanning: false, result: null, error: null }); }} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${currentView === 'home' ? 'bg-zinc-100 dark:bg-zinc-800 font-bold' : 'text-zinc-500'}`}>
              <Smartphone className="w-5 h-5" /> Home
            </button>
            <button onClick={() => { setCurrentView('how'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${currentView === 'how' ? 'bg-zinc-100 dark:bg-zinc-800 font-bold' : 'text-zinc-500'}`}>
              <BookOpen className="w-5 h-5" /> How to Use
            </button>
            <button onClick={() => { setCurrentView('about'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${currentView === 'about' ? 'bg-zinc-100 dark:bg-zinc-800 font-bold' : 'text-zinc-500'}`}>
              <Info className="w-5 h-5" /> About Us
            </button>
            <button onClick={() => setIsSidebarOpen(false)} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-zinc-500`}>
              <RefreshCw className="w-5 h-5" /> Check Updates
            </button>
          </nav>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            className="w-full flex items-center justify-between p-5 bg-zinc-50 dark:bg-[#121212] rounded-[2rem] border border-zinc-100 dark:border-zinc-800 transition-all active:scale-95"
          >
            <span className="text-xs font-black uppercase tracking-widest">{isDarkMode ? 'Night Ops' : 'Day Ops'}</span>
            {isDarkMode ? <Moon className="w-5 h-5 text-red-600" /> : <Sun className="w-5 h-5 text-amber-500" />}
          </button>
        </div>
      </aside>

      {/* Top Bar */}
      <header className="px-6 py-6 flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 bg-white/50 dark:bg-[#121212]/50 backdrop-blur-xl sticky top-0 z-50">
        <button onClick={() => setIsSidebarOpen(true)} className="p-3 bg-zinc-100 dark:bg-[#1e1e1e] rounded-2xl border border-zinc-200 dark:border-zinc-800 active:scale-90 transition-transform">
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center">
          <span className="nero-font text-lg font-black tracking-[0.2em]">NERO</span>
          <span className="text-[7px] font-black uppercase tracking-[0.6em] text-red-600 -mt-1">Defense System</span>
        </div>
        <div className="w-12 h-12" /> {/* Spacer */}
      </header>

      {/* Main Container */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-xl mx-auto p-6 space-y-12">
          
          {currentView === 'how' ? (
            <HowToUsePage onBack={() => setCurrentView('home')} />
          ) : currentView === 'about' ? (
            <AboutPage onBack={() => setCurrentView('home')} />
          ) : scanState.isScanning ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-12 animate-in zoom-in duration-500">
              <div className="relative">
                <div className="absolute inset-0 bg-red-600/30 blur-[80px] rounded-full animate-pulse" />
                <Loader2 className="w-20 h-20 text-red-600 animate-spin relative z-10" />
              </div>
              <div className="text-center">
                <p className="text-xl font-black uppercase tracking-widest nero-font animate-pulse">Deconstructing...</p>
                <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mt-2">Isolating Threat Vectors</p>
              </div>
              <button onClick={() => { isCancelledRef.current = true; setScanState({ isScanning: false, result: null, error: null }); }} className="flex items-center gap-3 px-8 py-4 bg-red-600/10 text-red-600 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-red-600/20 active:scale-95">
                <Square className="w-4 h-4 fill-current" /> Terminate
              </button>
            </div>
          ) : scanState.result ? (
            <AnalysisDisplay result={scanState.result} onReset={() => setScanState({ isScanning: false, result: null, error: null })} />
          ) : (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pt-8">
              <div className="flex justify-center mb-8">
                <NeroIcon className="w-48 h-48" />
              </div>

              {/* URL Scanner */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 ml-4">Input Tactical Link</h3>
                <form onSubmit={handleLinkScan} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-zinc-400/20 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500" />
                  <div className="relative bg-white dark:bg-[#1e1e1e] border border-zinc-100 dark:border-zinc-800 rounded-[2rem] p-4 flex items-center gap-4 shadow-xl">
                    <div className="p-3 bg-red-600/10 rounded-2xl"><Link2 className="text-red-600 w-5 h-5" /></div>
                    <input 
                      type="url" 
                      placeholder="Paste suspicious target..." 
                      className="bg-transparent outline-none flex-1 text-sm font-bold placeholder:text-zinc-400 placeholder:uppercase placeholder:tracking-widest"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                    <button type="submit" className="p-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-[10px] active:scale-90 transition-transform"><Search className="w-4 h-4" /></button>
                  </div>
                </form>
              </div>

              {/* File Scanner with Ghosty Cyan Glow */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 ml-4">Analyze Artifact File</h3>
                <label className="block cursor-pointer">
                  <input type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if(f) processFile(f); }} />
                  <div className="group relative">
                    <div className="absolute -inset-1 bg-cyan-400/30 rounded-[2.5rem] blur opacity-40 group-hover:opacity-100 transition duration-700 animate-pulse" />
                    <div className="relative bg-white dark:bg-[#1e1e1e] border-2 border-dashed border-cyan-400/40 p-12 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 transition-all hover:bg-cyan-400/5 ghosty-cyan-glow">
                      <div className="p-4 bg-cyan-400/10 rounded-2xl group-hover:scale-110 transition-transform"><Upload className="text-cyan-500 w-6 h-6" /></div>
                      <div className="text-center">
                        <p className="font-black text-xs uppercase tracking-[0.2em] text-cyan-500">Submit Local Data</p>
                        <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest mt-1">Scripts • PDF • Executables</p>
                      </div>
                    </div>
                  </div>
                </label>
              </div>

              {/* Quick Capabilities */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Flame, label: 'Phishing', color: 'text-orange-500' },
                  { icon: Ghost, label: 'Malware', color: 'text-purple-500' },
                  { icon: ShieldAlert, label: 'Spyware', color: 'text-red-600' },
                  { icon: FileCheck, label: 'Integrity', color: 'text-emerald-500' }
                ].map((item, idx) => (
                  <div key={idx} className="p-5 bg-white dark:bg-[#1e1e1e] border border-zinc-100 dark:border-zinc-800 rounded-3xl flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-all">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="py-6 border-t border-zinc-100 dark:border-zinc-800 text-center bg-white dark:bg-[#121212] z-40">
        <p className="text-[8px] font-black uppercase tracking-[0.8em] text-zinc-400">Nero Android v2.5.0 Deployment</p>
      </footer>
    </div>
  );
};

export default App;
