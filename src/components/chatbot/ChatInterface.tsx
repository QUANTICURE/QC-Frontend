import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, Microscope as Microphone, StopCircle, X, BookOpen, Copy, Check } from 'lucide-react';
import Button from '../common/Button';
import ChatMessage from './ChatMessage';
import Citations from './Citations';
import { useVoiceInput } from '../../hooks/useVoiceInput';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  citations?: Citation[];
}

interface Citation {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  url: string;
  text: string;
}

const exampleCitations: Citation[] = [
  {
    id: '1',
    title: 'Quantum Computing Approaches to Drug Discovery',
    authors: 'Johnson, A.B., Smith, C.D.',
    journal: 'Nature Quantum Biology',
    year: '2024',
    url: '#',
    text: 'Recent advances in quantum computing have enabled more accurate simulations of protein-ligand interactions at a fraction of the computational cost.'
  },
  {
    id: '2',
    title: 'Personalized Medicine: The Role of AI in Treatment Selection',
    authors: 'Wang, L., Patel, S., Garcia, M.',
    journal: 'Journal of Medical AI',
    year: '2024',
    url: '#',
    text: 'AI-driven analysis of patient data can identify optimal treatment paths by analyzing thousands of similar cases and their outcomes.'
  },
  {
    id: '3',
    title: 'FDA Guidelines on AI-Recommended Treatments',
    authors: 'U.S. Food & Drug Administration',
    journal: 'Regulatory Guidelines',
    year: '2025',
    url: '#',
    text: 'AI recommendations must be reviewed by licensed healthcare professionals before implementation. The AI system should provide clear explanations for its recommendations.'
  }
];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      content: "I'm the QuantiCure medical AI assistant. I can answer your questions about treatments, medications, and help interpret patient data using the latest medical research. How can I help you today?",
      role: 'assistant',
      timestamp: new Date(Date.now() - 1000 * 60),
    }
  ]);
  
  const [input, setInput] = useState('');
  const [inputRows, setInputRows] = useState(1);
  const [activeCitation, setActiveCitation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isListening, transcript, startListening, stopListening } = useVoiceInput();
  
  // Example suggested questions
  const suggestedQuestions = [
    "What are the latest treatments for rheumatoid arthritis?",
    "How does genomic data impact drug efficacy?",
    "Explain quantum simulation of drug interactions",
    "What are the side effects of combining these medications?"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (transcript) {
      setInput(prev => prev + ' ' + transcript);
    }
  }, [transcript]);

  useEffect(() => {
    // Adjust textarea rows based on content
    const rows = input.split('\n').length;
    setInputRows(Math.min(Math.max(1, rows), 5));
  }, [input]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!input.trim() && !isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response with citations (would be replaced with actual API call)
    setTimeout(() => {
      const responses = [
        {
          text: "Based on recent studies, quantum simulations indicate that for patients with this genetic profile, TNF inhibitors may be more effective than conventional DMARDs for rheumatoid arthritis. The molecular binding simulations show stronger affinity with reduced off-target effects.",
          citations: [exampleCitations[0], exampleCitations[1]]
        },
        {
          text: "Genome sequencing has revealed that patients with specific variants in CYP2D6 metabolize certain antidepressants differently. This can lead to either reduced efficacy or increased side effects at standard dosages. Personalized dosing based on genetic testing has shown significantly improved outcomes.",
          citations: [exampleCitations[1], exampleCitations[2]]
        },
        {
          text: "Quantum molecular simulations allow us to accurately model how drug compounds interact with protein targets at the quantum level. This provides insights into binding energy and conformational changes that traditional molecular dynamics simulations cannot capture.",
          citations: [exampleCitations[0]]
        }
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse.text,
        role: 'assistant',
        timestamp: new Date(),
        citations: randomResponse.citations
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const clearChat = () => {
    setMessages([messages[0]]);
  };

  const copyToClipboard = (citation: Citation) => {
    const citationText = `${citation.authors} (${citation.year}). ${citation.title}. ${citation.journal}.`;
    navigator.clipboard.writeText(citationText);
    setCopiedCitation(citation.id);
    setTimeout(() => setCopiedCitation(null), 2000);
  };

  return (
    <div className="h-full flex flex-col lg:flex-row">
      <div className="flex-1 flex flex-col h-full lg:border-r dark:border-gray-700">
        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-medium">Medical Knowledge Base</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Plus size={16} />}
              onClick={clearChat}
            >
              New Chat
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onCitationClick={(citationId) => setActiveCitation(citationId)}
            />
          ))}
          
          {isLoading && (
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center mr-3 mt-1">
                AI
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none p-3 max-w-[85%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef}></div>
        </div>
        
        {messages.length === 1 && (
          <div className="px-4 py-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Suggested questions:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  className="text-left px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
                  onClick={() => {
                    setInput(question);
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="border-t dark:border-gray-700 p-4">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a medical question..."
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 pl-4 pr-20 py-3 resize-none bg-white dark:bg-gray-800"
              rows={inputRows}
              disabled={isLoading}
            />
            <div className="absolute right-2 bottom-2 flex space-x-1">
              <Button
                variant="text"
                size="sm"
                onClick={toggleVoiceInput}
                className={isListening ? 'text-red-500' : ''}
                aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
              >
                {isListening ? <StopCircle size={20} /> : <Microphone size={20} />}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <span className="mr-1">Powered by QuantiCure AI with RAG technology</span>
            <span className="inline-flex items-center justify-center rounded bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 px-1.5">MEDICAL</span>
          </div>
        </div>
      </div>
      
      <div className="lg:w-96 border-t lg:border-t-0 dark:border-gray-700 h-full overflow-hidden flex flex-col">
        <div className="flex items-center justify-between py-3 px-4 border-b dark:border-gray-700">
          <div className="flex items-center">
            <BookOpen size={16} className="mr-2 text-cyan-600" />
            <h2 className="font-medium">Citations & Sources</h2>
          </div>
          <Button
            variant="text"
            size="sm"
            className="text-gray-500"
            aria-label="Close citations panel"
            onClick={() => setActiveCitation(null)}
          >
            <X size={18} />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {activeCitation ? (
            <div>
              {exampleCitations
                .filter(citation => citation.id === activeCitation)
                .map(citation => (
                  <div key={citation.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-medium text-cyan-700 dark:text-cyan-400">{citation.title}</h3>
                    <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">{citation.authors}</p>
                    <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">{citation.journal}, {citation.year}</p>
                    
                    <div className="mt-3 p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded">
                      <p className="text-sm italic">"{citation.text}"</p>
                    </div>
                    
                    <div className="mt-3 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={copiedCitation === citation.id ? <Check size={16} /> : <Copy size={16} />}
                        onClick={() => copyToClipboard(citation)}
                      >
                        {copiedCitation === citation.id ? 'Copied' : 'Copy citation'}
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <Citations
              citations={messages
                .filter(m => m.citations)
                .flatMap(m => m.citations || [])}
              onCitationClick={setActiveCitation}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;