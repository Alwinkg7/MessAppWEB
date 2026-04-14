import React from "react";

export const SkeletonLoader = ({ className = "", type = "rectangle" }: { className?: string, type?: "rectangle" | "circle" | "text" }) => {
  
  const typeClasses = {
    rectangle: "rounded-sm min-h-[100px]",
    circle: "rounded-full aspect-square",
    text: "rounded-sm h-6 w-full",
  };

  return (
    <div 
      className={`bg-gray-300 dark:bg-gray-700 animate-pulse border-2 border-transparent ${typeClasses[type]} ${className}`}
    ></div>
  );
};

export const TableSkeleton = ({ rows = 5, cols = 4 }: { rows?: number, cols?: number }) => {
  return (
    <div className="w-full border-3 border-border-color bg-theme-card shadow-brutal rounded-sm overflow-hidden">
      <div className="border-b-3 border-border-color bg-gray-100 dark:bg-gray-800 p-4 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <SkeletonLoader key={`h-${i}`} type="text" className="flex-1 h-8" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rIndex) => (
        <div key={`r-${rIndex}`} className="border-b-[1px] border-border-color p-4 flex gap-4 hover:bg-gray-50 dark:hover:bg-gray-900">
          {Array.from({ length: cols }).map((_, cIndex) => (
            <SkeletonLoader key={`c-${rIndex}-${cIndex}`} type="text" className="flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
};
