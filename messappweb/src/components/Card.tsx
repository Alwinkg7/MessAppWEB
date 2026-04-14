import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const Card = ({ children, className = "", noPadding = false }: CardProps) => {
  return (
    <div className={`brutal-card ${noPadding ? "" : "p-6"} ${className}`}>
      {children}
    </div>
  );
};
