
export enum ThreatLevel {
  SAFE = 'SAFE',
  SUSPICIOUS = 'SUSPICIOUS',
  DANGEROUS = 'DANGEROUS',
  CRITICAL = 'CRITICAL'
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface DetectedArtifact {
  name: string;
  type: 'macro' | 'script' | 'function' | 'exfiltration_logic';
  risk: 'low' | 'medium' | 'high';
  description: string;
}

export interface ForensicData {
  domainAge?: string;
  registrar?: string;
  hostingProvider?: string;
  sslStatus?: string;
  serverLocation?: string;
  securityHeaders?: string[];
  riskScores: {
    social: number; // 0-100
    technical: number; // 0-100
    reputation: number; // 0-100
  };
}

export interface AnalysisResult {
  target: string;
  type: 'link' | 'file';
  threatLevel: ThreatLevel;
  verdict: string;
  details: string[];
  recommendation: string;
  technicalAnalysis: string;
  detectedArtifacts?: DetectedArtifact[];
  sources?: GroundingSource[];
  forensics?: ForensicData;
}

export interface ScanState {
  isScanning: boolean;
  result: AnalysisResult | null;
  error: string | null;
}
