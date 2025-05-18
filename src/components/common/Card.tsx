import React, { ReactNode } from 'react';
import { useTheme } from '../../hooks/useTheme';

interface CardProps {
  children: ReactNode;
  title?: string;
  description?: string;
  footer?: ReactNode;
  className?: string;
  hoverable?: boolean;
  bordered?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  description,
  footer,
  className = '',
  hoverable = false,
  bordered = true,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div 
      className={`
        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
        ${bordered ? (isDarkMode ? 'border border-gray-700' : 'border border-gray-200') : ''}
        ${hoverable ? (isDarkMode ? 'hover:border-gray-600 transition-all' : 'hover:shadow-md transition-all') : ''}
        rounded-lg overflow-hidden
        ${className}
      `}
    >
      {(title || description) && (
        <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
      )}
      
      <div className="p-4">
        {children}
      </div>
      
      {footer && (
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;