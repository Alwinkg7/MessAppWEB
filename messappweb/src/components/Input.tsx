import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, id, ...props }, ref) => {
    const defaultId = React.useId();
    const inputId = id || defaultId;

    return (
      <div className="w-full flex flex-col gap-1.5 mb-4">
        {label && (
          <label 
            htmlFor={inputId} 
            className="font-heading font-bold text-sm tracking-wide uppercase"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`brutal-input ${error ? "border-red-500 bg-red-50 dark:bg-red-950" : ""} ${className}`}
          {...props}
        />
        {error && (
          <span className="text-red-500 text-sm font-bold mt-1 bg-white border-2 border-border-color px-2 py-1 inline-block w-fit">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
