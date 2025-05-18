import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <footer className={`py-3 px-4 border-t ${
      isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-400' : 'bg-white border-gray-200 text-gray-600'
    } text-sm`}>
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-2 sm:mb-0">
          <span>© {new Date().getFullYear()} QuantiCure • Precision Medicine Platform</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="flex items-center gap-1">
            <Heart size={14} className="text-cyan-500" /> v1.0.2
          </span>
          <a href="#" className="hover:text-cyan-500 transition-colors">Terms</a>
          <a href="#" className="hover:text-cyan-500 transition-colors">Privacy</a>
          <a href="#" className="hover:text-cyan-500 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;