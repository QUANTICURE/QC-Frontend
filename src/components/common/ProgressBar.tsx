import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  color = 'primary',
  size = 'md',
  showValue = false,
  className = '',
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  const sizeStyles = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };
  
  const colorStyles = {
    primary: 'bg-cyan-600',
    secondary: 'bg-indigo-600',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
  };
  
  const progressClasses = `${colorStyles[color]} rounded-full transition-all duration-300 ease-in-out`;
  
  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</div>
          {showValue && (
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{Math.round(percentage)}%</div>
          )}
        </div>
      )}
      
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${sizeStyles[size]}`}>
        <div
          className={progressClasses}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};

export default ProgressBar;