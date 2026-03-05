import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
// We use a singleton pattern to reuse the instance
let aiClient: GoogleGenAI | null = null;

export function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set. AI features will not work.");
      // In a real app, we might throw an error or handle this more gracefully
      // For now, we'll return null and handle it in the components
      return null;
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

export async function generateCampaignContent(goal: string, description: string, channel: 'email' | 'sms') {
  const ai = getAiClient();
  if (!ai) throw new Error("AI Client not initialized");

  const prompt = `
    You are an expert marketing copywriter for small businesses.
    Write a ${channel === 'email' ? 'short, punchy email' : 'concise SMS (under 160 chars)'} for a campaign.
    
    Goal: ${goal}
    Context: ${description}
    
    Tone: Friendly, professional, and action-oriented.
    
    ${channel === 'email' ? 'Output format: Subject Line: [Subject]\n\n[Body]' : 'Output format: [Message Body]'}
    Do not include any other text or explanations.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

export async function chatWithAi(message: string, history: { role: 'user' | 'model', text: string }[]) {
  const ai = getAiClient();
  if (!ai) throw new Error("AI Client not initialized");

  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    history: history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    })),
    config: {
      systemInstruction: "You are a helpful marketing assistant for a small business owner. Keep advice simple, actionable, and brief."
    }
  });

  const result = await chat.sendMessage({ message });
  return result.text;
}
