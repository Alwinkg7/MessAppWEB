import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", isLoading, children, ...props }, ref) => {
    
    const baseClass = "brutal-btn";
    
    const variantClasses = {
      primary: "brutal-btn-primary",
      secondary: "brutal-btn-secondary",
      danger: "bg-[var(--color-brutal-pink)] text-white shadow-brutal",
      ghost: "bg-transparent border-0 shadow-none hover:bg-gray-100 dark:hover:bg-gray-800 text-foreground",
    };

    return (
      <button
        ref={ref}
        className={`${baseClass} ${variantClasses[variant]} ${isLoading ? "opacity-70 cursor-not-allowed" : ""} ${className}`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
