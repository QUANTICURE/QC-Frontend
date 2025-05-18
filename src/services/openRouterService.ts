import { 
  OPENROUTER_API_KEY, 
  OPENROUTER_BASE_URL, 
  DEFAULT_MODEL,
  SYSTEM_PROMPTS,
  OpenRouterMessage,
  OpenRouterResponse
} from '../config/api';

class OpenRouterService {
  private async makeRequest(messages: OpenRouterMessage[], model: string = DEFAULT_MODEL): Promise<OpenRouterResponse> {
    try {
      const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'QuantiCure Medical Platform'
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.5,
          max_tokens: 800,
          top_p: 0.8,
          frequency_penalty: 0.3,
          presence_penalty: 0.3,
          stream: false
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to get response from OpenRouter');
      }

      return await response.json();
    } catch (error) {
      console.error('OpenRouter API Error:', error);
      throw error;
    }
  }

  async getMedicalAssistantResponse(
    userMessage: string,
    patientContext?: string,
    conversationHistory: OpenRouterMessage[] = []
  ): Promise<string> {
    const context = patientContext ? 
      `Context: ${patientContext.split('\n').join(' | ')}` : '';

    const messages: OpenRouterMessage[] = [
      {
        role: 'system',
        content: SYSTEM_PROMPTS.MEDICAL_ASSISTANT
      },
      ...conversationHistory,
      { 
        role: 'user', 
        content: context ? `${context}\n\nQuery: ${userMessage}` : userMessage 
      }
    ];

    const response = await this.makeRequest(messages);
    return response.choices[0].message.content;
  }

  async getAppointmentRecommendation(
    symptoms: string,
    patientHistory: string
  ): Promise<string> {
    const messages: OpenRouterMessage[] = [
      {
        role: 'system',
        content: SYSTEM_PROMPTS.APPOINTMENT_SCHEDULER
      },
      {
        role: 'user',
        content: `Patient Info:
Symptoms: ${symptoms}
History: ${patientHistory}

Provide:
1. Urgency level
2. Specialist type
3. Duration
4. Preparations
5. Special notes`
      }
    ];

    const response = await this.makeRequest(messages);
    return response.choices[0].message.content;
  }

  async analyzeMedicalData(
    labResults: string,
    vitalSigns: string,
    medications: string
  ): Promise<string> {
    const messages: OpenRouterMessage[] = [
      {
        role: 'system',
        content: 'You are a medical data analyst. Provide clear, actionable insights from medical data.'
      },
      {
        role: 'user',
        content: `Analyze:

Labs: ${labResults}
Vitals: ${vitalSigns}
Meds: ${medications}

Provide:
1. Key findings
2. Concerns
3. Follow-up needs
4. Drug interactions
5. Monitoring plan`
      }
    ];

    const response = await this.makeRequest(messages);
    return response.choices[0].message.content;
  }
}

export const openRouterService = new OpenRouterService(); 