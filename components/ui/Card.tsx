import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'gradient';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default'
}) => {
  const variants = {
    default: 'bg-white border border-gray-200 text-black',
    dark: 'bg-gray-900 border border-gray-800 text-white',
    gradient: 'bg-gradient-to-br from-hotpink/20 to-hung/20 border border-gray-600 text-white backdrop-blur-sm'
  };

  return (
    <div
      className={cn(
        'rounded-lg p-6 shadow-lg transition-all duration-200 hover:shadow-xl',
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
};