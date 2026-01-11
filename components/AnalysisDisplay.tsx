
import React, { useState } from 'react';
import { AnalysisResult, ThreatLevel } from '../types';
import { ShieldAlert, ShieldCheck, AlertTriangle, RotateCcw, Globe, Fingerprint, Lock, Shield, Eye, AlertOctagon, Terminal, UserX, ShieldOff, LockKeyhole, ChevronRight, Activity, Code, Cpu, Zap, Bug } from 'lucide-react';
import SandboxBrowser from './SandboxBrowser';
import RiskIntelModal, { RiskType } from './RiskIntelModal';

interface Props {
  result: AnalysisResult;
  onReset: () => void;
}

const AnalysisDisplay: React.FC<Props> = ({ result, onReset }) => {
  const [showSandbox, setShowSandbox] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<RiskType | null>(null);

  const getLevelStyles = (level: ThreatLevel) => {
    switch (level) {
      case ThreatLevel.SAFE:
        return { color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/20', icon: <ShieldCheck className="w-10 h-10" /> };
      case ThreatLevel.SUSPICIOUS:
        return { color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-200 dark:border-amber-400/20', icon: <AlertTriangle className="w-10 h-10" /> };
      case ThreatLevel.DANGEROUS:
        return { color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-500/10', border: 'border-red-200 dark:border-red-400/20', icon: <ShieldAlert className="w-10 h-10" /> };
      case ThreatLevel.CRITICAL:
        return { color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-600/20', border: 'border-red-300 dark:border-red-600/40', icon: <ShieldAlert className="w-10 h-10" /> };
    }
  };

  const styles = getLevelStyles(result.threatLevel);
  const isMalicious = result.threatLevel !== ThreatLevel.SAFE;

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {showSandbox && result.type === 'link' && isMalicious && (
        <SandboxBrowser url={result.target} onClose={() => setShowSandbox(false)} />
      )}

      {selectedRisk && (
        <RiskIntelModal type={selectedRisk} onClose={() => setSelectedRisk(null)} />
      )}

      <div className={`p-8 rounded-[2.5rem] border-2 ${styles.border} ${styles.bg} text-center space-y-4 shadow-xl`}>
        <div className={`mx-auto w-20 h-20 rounded-3xl bg-white dark:bg-[#1e1e1e] border ${styles.border} flex items-center justify-center ${styles.color} shadow-lg`}>
          {styles.icon}
        </div>
        <h2 className="nero-font text-3xl font-black uppercase tracking-widest">{result.threatLevel}</h2>
        <p className="text-sm font-bold leading-relaxed">{result.verdict}</p>
        <div className="p-3 bg-zinc-900/5 dark:bg-black/20 rounded-xl">
          <code className="text-[9px] font-mono break-all opacity-60">{result.target}</code>
        </div>
      </div>

      {/* Structured Code/Script Analysis Section for Files */}
      {result.type === 'file' && result.detectedArtifacts && result.detectedArtifacts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 ml-4 flex items-center gap-2">
            <Code className="w-3 h-3 text-cyan-500" /> Deep Code Audit
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {result.detectedArtifacts.map((artifact, i) => (
              <div key={i} className="p-5 bg-white dark:bg-[#1e1e1e] border border-zinc-100 dark:border-zinc-800 rounded-3xl space-y-3 relative overflow-hidden group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      artifact.risk === 'high' ? 'bg-red-500/10 text-red-500' : 
                      artifact.risk === 'medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      {artifact.type === 'macro' ? <Cpu className="w-4 h-4" /> : 
                       artifact.type === 'exfiltration_logic' ? <Zap className="w-4 h-4" /> : <Bug className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-50">{artifact.type}</p>
                      <h4 className="text-sm font-black text-zinc-900 dark:text-zinc-100 font-mono">{artifact.name}</h4>
                    </div>
                  </div>
                  <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full border ${
                    artifact.risk === 'high' ? 'bg-red-500/10 border-red-500/20 text-red-500' : 
                    artifact.risk === 'medium' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                  }`}>
                    {artifact.risk} risk
                  </span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed font-medium pl-10 border-l border-zinc-100 dark:border-zinc-800 ml-5">
                  {artifact.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.type === 'link' && isMalicious && (
        <div className="p-6 bg-zinc-900 dark:bg-[#1e1e1e] rounded-[2.5rem] border border-red-600/20 space-y-6 shadow-2xl">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center border border-red-600/20">
                <Terminal className="w-6 h-6 text-red-600" />
             </div>
             <div>
                <h3 className="nero-font text-lg font-black uppercase tracking-widest text-white">Isolated Probe</h3>
                <p className="text-[8px] font-black uppercase tracking-[0.4em] text-red-500">Remote Session Ready</p>
             </div>
          </div>
          <button 
            onClick={() => setShowSandbox(true)}
            className="w-full py-5 bg-red-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs active:scale-95 transition-transform flex items-center justify-center gap-3"
          >
            <Eye className="w-4 h-4" /> Start Sandbox
          </button>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-4">Forensic Intel</h3>
        <div className="grid grid-cols-1 gap-4">
           {result.details.map((detail, i) => (
             <div key={i} className="p-5 bg-white dark:bg-[#1e1e1e] border border-zinc-100 dark:border-zinc-800 rounded-3xl flex gap-4 text-xs font-medium leading-relaxed">
               <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
               {detail}
             </div>
           ))}
        </div>
      </div>

      <div className="p-6 bg-zinc-50 dark:bg-[#1e1e1e] border border-zinc-100 dark:border-zinc-800 rounded-[2rem] space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
          <ShieldCheck className="w-3 h-3" /> System Recommendation
        </h4>
        <p className="text-sm font-bold italic leading-relaxed">"{result.recommendation}"</p>
      </div>

      <button onClick={onReset} className="w-full py-5 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-3">
        <RotateCcw className="w-4 h-4" /> New Investigation
      </button>
    </div>
  );
};

export default AnalysisDisplay;
