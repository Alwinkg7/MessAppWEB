import React from "react";

interface StatusBadgeProps {
  status: string;
  type?: "success" | "warning" | "danger" | "info" | "neutral";
}

export const StatusBadge = ({ status, type = "neutral" }: StatusBadgeProps) => {
  
  const isPaid = status === "Paid";

  const typeStyles = {
    success: "bg-brutal-green text-black",
    warning: "bg-brutal-yellow text-black",
    danger: "bg-brutal-pink text-white",
    info: "bg-brutal-cyan text-black",
    neutral: "bg-gray-200 text-black dark:bg-gray-700 dark:text-white",
  };

  return (
    <span className={`brutal-badge flex items-center gap-1 ${typeStyles[type]}`}>
      {isPaid ? "🟢 Paid" : "🔴 Pending"}
    </span>
  );
};