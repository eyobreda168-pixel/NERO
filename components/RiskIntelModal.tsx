
import React from 'react';
import { X, Youtube, Info, ShieldAlert, Zap, History, ExternalLink, ChevronRight } from 'lucide-react';

export type RiskType = 'social' | 'technical' | 'reputation';

interface RiskIntelModalProps {
  type: RiskType;
  onClose: () => void;
}

const RISK_DATA = {
  social: {
    title: "Social Engineering Risk",
    icon: <Zap className="w-8 h-8 text-orange-500" />,
    desc: "Psychological manipulation of people into performing actions or divulging confidential information.",
    how: "Attackers exploit human psychology rather than technical vulnerabilities. They use 'pretexting' to create a false sense of trust, 'baiting' with promises of rewards, or 'scareware' to cause panic.",
    impact: "Can lead to complete account takeover, identity theft, and financial fraud by bypassing even the strongest passwords through human error.",
    videos: [
      { title: "The Art of Social Engineering", url: "https://www.youtube.com/results?search_query=how+social+engineering+works" },
      { title: "Real Life Phishing Examples", url: "https://www.youtube.com/results?search_query=phishing+attack+walkthrough" }
    ],
    color: "from-orange-600/20 to-orange-900/40"
  },
  technical: {
    title: "Technical Exploit Risk",
    icon: <ShieldAlert className="w-8 h-8 text-red-500" />,
    desc: "Direct attacks targeting software bugs, hardware vulnerabilities, or system misconfigurations.",
    how: "Utilizes malicious code like SQL injections, Cross-Site Scripting (XSS), or buffer overflows to force systems to behave in ways the developer didn't intend.",
    impact: "Remote Code Execution (RCE) can allow an attacker to control your device, install malware, or exfiltrate private files silently in the background.",
    videos: [
      { title: "How Exploits Work (Computerphile)", url: "https://www.youtube.com/results?search_query=computerphile+exploit" },
      { title: "Zero Day Vulnerabilities Explained", url: "https://www.youtube.com/results?search_query=what+is+a+zero+day+exploit" }
    ],
    color: "from-red-600/20 to-red-900/40"
  },
  reputation: {
    title: "Reputation & Metadata Risk",
    icon: <History className="w-8 h-8 text-blue-500" />,
    desc: "Risk determined by historical data, domain age, hosting proximity, and global blacklist status.",
    how: "Nero checks if the domain was recently registered (common for 'burner' attack sites), if it shares hosting with known malware servers, or if it has been reported by other security agencies.",
    impact: "Even if a site looks safe, a low reputation score indicates it is likely a 'sleeping' threat or part of a coordinated botnet infrastructure.",
    videos: [
      { title: "How IP/Domain Reputation Works", url: "https://www.youtube.com/results?search_query=domain+reputation+explained" },
      { title: "The Dark Web & Malicious Hosting", url: "https://www.youtube.com/results?search_query=how+malicious+hosting+works" }
    ],
    color: "from-blue-600/20 to-blue-900/40"
  }
};

const RiskIntelModal: React.FC<RiskIntelModalProps> = ({ type, onClose }) => {
  const data = RISK_DATA[type];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-[#0d0d0d] border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,1)]">
        {/* Header Gradient */}
        <div className={`h-32 bg-gradient-to-br ${data.color} absolute top-0 left-0 right-0`} />
        
        <div className="relative p-8 md:p-10 space-y-8 pt-16">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-black/50 hover:bg-white/10 text-white rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-5 bg-black rounded-3xl border border-white/5 shadow-2xl">
              {data.icon}
            </div>
            <div>
              <h2 className="nero-font text-3xl font-black text-white uppercase tracking-widest">{data.title}</h2>
              <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.4em] mt-2">Nero Intelligence Database</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] space-y-4">
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase text-red-500 tracking-widest flex items-center gap-2">
                  <Info className="w-3 h-3" /> Definition
                </h4>
                <p className="text-sm text-zinc-300 font-medium leading-relaxed">{data.desc}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Execution Path</h4>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">{data.how}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Potential Impact</h4>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">{data.impact}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-zinc-500 tracking-widest flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-600" /> Educational Resources
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.videos.map((vid, i) => (
                  <a 
                    key={i} 
                    href={vid.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-zinc-900/50 hover:bg-red-600/10 border border-zinc-800 hover:border-red-600/30 rounded-2xl transition-all group"
                  >
                    <span className="text-[11px] font-bold text-zinc-300 group-hover:text-white">{vid.title}</span>
                    <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-red-500" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-zinc-200 transition-all shadow-xl active:scale-95"
          >
            Acknowledge Intelligence
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskIntelModal;
