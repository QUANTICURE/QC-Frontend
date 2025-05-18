import React from 'react';
import ChatInterface from '../components/chatbot/ChatInterface';

const Chatbot: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Medical Knowledge Assistant</h1>
      <div className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden flex flex-col">
        <ChatInterface />
      </div>
    </div>
  );
};

export default Chatbot;