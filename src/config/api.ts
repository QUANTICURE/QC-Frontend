/// <reference types="node" />

declare global {
  interface Window {
    _env_?: {
      REACT_APP_OPENROUTER_API_KEY?: string;
    }
  }
}

export const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';
export const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

export const DEFAULT_MODEL = 'meta-llama/llama-3.3-8b-instruct:free';

export interface OpenRouterMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OpenRouterResponse {
  id: string;
  choices: {
    message: OpenRouterMessage;
    finish_reason: string;
  }[];
  created: number;
  model: string;
}

export const SYSTEM_PROMPTS = {
  MEDICAL_ASSISTANT: `You are a medical AI assistant for QuantiCure. Focus on:
1. Analyzing symptoms and history
2. Suggesting relevant questions
3. Identifying drug interactions
4. Explaining medical terms simply
5. Providing evidence-based info

Be professional and clear. Defer to healthcare providers when uncertain.`,
  
  APPOINTMENT_SCHEDULER: `You are QuantiCure's scheduling assistant. Focus on:
1. Assessing appointment urgency
2. Matching specialists to conditions
3. Setting appropriate duration
4. Listing preparation requirements
5. Providing visit guidelines

Prioritize patient care and safety.`
}; 