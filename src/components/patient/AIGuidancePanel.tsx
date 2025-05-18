import React, { useState } from 'react';
import { Send, BrainCircuit, ArrowRight } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIGuidancePanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "I'm your AI medical assistant. I can help guide you through the patient intake process. Do you have any questions?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on the symptoms you've entered, please make sure to include any recent changes in medication or diet that might be relevant.",
        "For this condition, it's important to provide detailed information about family history. Would you like me to explain why?",
        "The genetic data format you're using is compatible. Would you like recommendations on what specific genetic markers might be relevant?",
        "I notice you're entering information about hypertension. Consider including details about blood pressure monitoring frequency and recent readings.",
      ];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestedQuestions = [
    "What genetic information is most relevant?",
    "How detailed should symptom descriptions be?",
    "What lab results should I prioritize uploading?",
  ];

  return (
    <Card 
      title="AI Guidance"
      description="Ask questions about patient data entry"
      className="h-full flex flex-col"
    >
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[600px]">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              {message.sender === 'ai' && (
                <div className="flex items-center mb-1 text-cyan-600 dark:text-cyan-400 text-xs font-medium">
                  <BrainCircuit size={14} className="mr-1" />
                  QUANTICURE AI
                </div>
              )}
              <p className="text-sm">{message.text}</p>
              <div className="text-xs mt-1 opacity-70 text-right">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-3 max-w-[85%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse delay-150"></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">Suggested questions:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full px-3 py-1 flex items-center transition-colors"
              onClick={() => setInput(question)}
            >
              {question}
              <ArrowRight size={12} className="ml-1" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto relative">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about patient information..."
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-800 pl-3 pr-10 py-2 resize-none"
          rows={2}
        />
        <Button
          variant={input.trim() ? 'primary' : 'outline'}
          size="sm"
          className="absolute right-2 bottom-2"
          disabled={!input.trim() || isLoading}
          onClick={sendMessage}
          aria-label="Send message"
        >
          <Send size={16} />
        </Button>
      </div>
    </Card>
  );
};

export default AIGuidancePanel;