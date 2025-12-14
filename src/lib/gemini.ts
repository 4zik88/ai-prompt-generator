import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn('GOOGLE_GEMINI_API_KEY is not set. API calls will fail.');
}

export const genAI = new GoogleGenAI({ apiKey: apiKey || '' });

export const MODEL_ID = 'gemini-2.5-flash';

export const generationConfig = {
  maxOutputTokens: 1024,
  temperature: 0.7,
  topP: 0.9,
};
