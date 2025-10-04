import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Card({ children, className = '', id }: CardProps) {
  return (
    <div id={id} className={`bg-white rounded-2xl shadow-sm border border-umep-border p-6 ${className}`}>
      {children}
    </div>
  );
}
