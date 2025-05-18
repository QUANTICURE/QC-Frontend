import { useState, useCallback } from 'react';
import { openRouterService } from '../services/openRouterService';
import { OpenRouterMessage } from '../config/api';

interface UseAIOptions {
  onError?: (error: Error) => void;
}

export function useAI(options: UseAIOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getMedicalAssistance = useCallback(async (
    message: string,
    patientContext?: string,
    conversationHistory: OpenRouterMessage[] = []
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await openRouterService.getMedicalAssistantResponse(
        message,
        patientContext,
        conversationHistory
      );
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      options.onError?.(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  const getAppointmentAdvice = useCallback(async (
    symptoms: string,
    patientHistory: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await openRouterService.getAppointmentRecommendation(
        symptoms,
        patientHistory
      );
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      options.onError?.(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  const analyzeMedicalData = useCallback(async (
    labResults: string,
    vitalSigns: string,
    medications: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await openRouterService.analyzeMedicalData(
        labResults,
        vitalSigns,
        medications
      );
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setError(error);
      options.onError?.(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  return {
    isLoading,
    error,
    getMedicalAssistance,
    getAppointmentAdvice,
    analyzeMedicalData
  };
} 