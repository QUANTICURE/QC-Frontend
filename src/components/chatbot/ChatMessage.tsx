import React from 'react';
import { BookOpen, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { Components } from 'react-markdown';

interface Citation {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  url: string;
  text: string;
}

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  citations?: Citation[];
}

interface ChatMessageProps {
  message: Message;
  onCitationClick: (citationId: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onCitationClick }) => {
  const isUser = message.role === 'user';
  
  const markdownComponents: Components = {
    div: ({ node, className, children, ...props }) => (
      <div {...props} className="prose dark:prose-invert max-w-none">
        {children}
      </div>
    ),
    a: ({ node, children, ...props }) => (
      <a 
        {...props} 
        className="text-cyan-600 dark:text-cyan-400 hover:underline" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    code: ({ node, children, className, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return (
        <code
          {...props}
          className={`${match ? 'block bg-gray-100 dark:bg-gray-800 p-4 rounded-lg' : 'bg-gray-200 dark:bg-gray-700 rounded px-1'}`}
        >
          {children}
        </code>
      );
    }
  };
  
  const renderMarkdown = (text: string) => (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]} 
      rehypePlugins={[rehypeRaw]}
      components={markdownComponents}
    >
      {text}
    </ReactMarkdown>
  );
  
  // Function to replace citation markers with clickable spans
  const renderMessageWithCitations = (text: string, citations?: Citation[]) => {
    if (!citations || citations.length === 0) {
      return renderMarkdown(text);
    }
    
    // Create a regex pattern to match [1], [2], etc.
    const pattern = /\[(\d+)\]/g;
    const parts = text.split(pattern);
    
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        const citationNumber = parseInt(part, 10);
        const citation = citations[citationNumber - 1];
        
        if (citation) {
          return (
            <button
              key={`citation-${index}`}
              onClick={() => onCitationClick(citation.id)}
              className="inline-flex items-center text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/30 rounded px-1.5 mx-0.5 hover:bg-cyan-100 dark:hover:bg-cyan-800/30 cursor-pointer"
            >
              <BookOpen size={12} className="mr-1" />
              [{part}]
            </button>
          );
        }
      }
      
      return <span key={`markdown-${index}`}>{renderMarkdown(part)}</span>;
    });
  };

  return (
    <div className={`flex items-start ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center mr-3 mt-1">
          AI
        </div>
      )}
      
      <div 
        className={`rounded-2xl ${
          isUser 
          ? 'bg-cyan-600 text-white rounded-tr-none'
          : 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
        } p-3 max-w-[85%]`}
      >
        <div className="text-sm">
          {isUser ? message.content : renderMessageWithCitations(message.content, message.citations)}
        </div>
        
        {!isUser && message.citations && message.citations.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {message.citations.map((citation, index) => (
              <button
                key={citation.id}
                onClick={() => onCitationClick(citation.id)}
                className="inline-flex items-center text-xs text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/30 rounded-full px-2 py-0.5 hover:bg-cyan-100 dark:hover:bg-cyan-800/30"
              >
                <BookOpen size={10} className="mr-1" />
                [{index + 1}] {citation.title.slice(0, 20)}...
              </button>
            ))}
          </div>
        )}
        
        <div className="mt-1 text-right">
          <span className="text-xs opacity-70">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center ml-3 mt-1">
          <User size={18} className="text-gray-600 dark:text-gray-300" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;