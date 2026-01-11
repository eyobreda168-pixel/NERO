
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, ThreatLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    threatLevel: {
      type: Type.STRING,
      description: "One of: SAFE, SUSPICIOUS, DANGEROUS, CRITICAL",
    },
    verdict: {
      type: Type.STRING,
      description: "A short one-sentence verdict.",
    },
    details: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of specific security findings.",
    },
    recommendation: {
      type: Type.STRING,
      description: "Clear instructions.",
    },
    technicalAnalysis: {
      type: Type.STRING,
      description: "In-depth technical explanation.",
    },
    detectedArtifacts: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Name of the script, function, or macro." },
          type: { type: Type.STRING, description: "One of: macro, script, function, exfiltration_logic" },
          risk: { type: Type.STRING, description: "One of: low, medium, high" },
          description: { type: Type.STRING, description: "What this component does." }
        },
        required: ["name", "type", "risk", "description"]
      }
    },
    forensics: {
      type: Type.OBJECT,
      properties: {
        domainAge: { type: Type.STRING },
        registrar: { type: Type.STRING },
        hostingProvider: { type: Type.STRING },
        sslStatus: { type: Type.STRING },
        serverLocation: { type: Type.STRING },
        securityHeaders: { type: Type.ARRAY, items: { type: Type.STRING } },
        riskScores: {
          type: Type.OBJECT,
          properties: {
            social: { type: Type.NUMBER },
            technical: { type: Type.NUMBER },
            reputation: { type: Type.NUMBER }
          },
          required: ["social", "technical", "reputation"]
        }
      },
      required: ["riskScores"]
    }
  },
  required: ["threatLevel", "verdict", "details", "recommendation", "technicalAnalysis", "forensics"],
};

export const analyzeLink = async (url: string): Promise<AnalysisResult> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Conduct a forensic security audit on the URL: ${url}. 
    Check domain age, SSL validity, hosting reputation, and common phishing patterns. 
    Return a detailed JSON following the schema. 
    If you find real-world news about this link via search, incorporate it.`,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: ANALYSIS_SCHEMA,
    },
  });

  const text = response.text || '{}';
  let rawData: any = {};
  
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    rawData = JSON.parse(jsonMatch ? jsonMatch[0] : text);
  } catch (e) {
    rawData = {
      threatLevel: ThreatLevel.SUSPICIOUS,
      verdict: "Structure compromised during deep search. Manual review advised.",
      details: ["Search grounded data detected, but formatting failed."],
      recommendation: "Review sources carefully.",
      technicalAnalysis: text,
      forensics: { riskScores: { social: 50, technical: 50, reputation: 50 } }
    };
  }

  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.map((chunk: any) => ({
      title: chunk.web?.title || 'Source',
      uri: chunk.web?.uri || '',
    }))
    .filter((s: any) => s.uri);

  return {
    target: url,
    type: 'link',
    threatLevel: (rawData.threatLevel as ThreatLevel) || ThreatLevel.SUSPICIOUS,
    verdict: rawData.verdict,
    details: rawData.details,
    recommendation: rawData.recommendation,
    technicalAnalysis: rawData.technicalAnalysis,
    detectedArtifacts: rawData.detectedArtifacts,
    sources,
    forensics: rawData.forensics,
  };
};

export const analyzeFile = async (file: File, base64Data: string): Promise<AnalysisResult> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { text: `Analyze this file (${file.name}, type: ${file.type}) for exploits. 
        MANDATORY: Identify specific names of detected macros, malicious scripts, internal functions, or data exfiltration logic. 
        List these specifically in the 'detectedArtifacts' array of the response.
        If it's a script file, identify the specific malicious function names.` },
        { inlineData: { data: base64Data, mimeType: file.type || 'application/octet-stream' } }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: ANALYSIS_SCHEMA,
    },
  });

  let rawData: any = {};
  try {
    const text = response.text || '{}';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    rawData = JSON.parse(jsonMatch ? jsonMatch[0] : text);
  } catch (e) {
    rawData = { forensics: { riskScores: { social: 0, technical: 90, reputation: 50 } } };
  }
  
  return {
    target: file.name,
    type: 'file',
    threatLevel: (rawData.threatLevel as ThreatLevel) || ThreatLevel.SUSPICIOUS,
    verdict: rawData.verdict || "File structure suspicious.",
    details: rawData.details || [],
    recommendation: rawData.recommendation || "Do not execute.",
    technicalAnalysis: rawData.technicalAnalysis || response.text || "No analysis available.",
    detectedArtifacts: rawData.detectedArtifacts,
    forensics: rawData.forensics,
  };
};
