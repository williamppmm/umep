import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-umep-text mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full border border-umep-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-600 focus:border-transparent outline-none transition-all ${
            error ? 'border-red-500' : ''
          } ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
