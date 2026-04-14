"use client";

import { useAuth } from "@/utils/auth-context";
import { ThemeToggle } from "./ThemeToggle";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";

interface DashboardHeaderProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

export const DashboardHeader = ({ onMenuToggle, isMenuOpen }: DashboardHeaderProps) => {
  const { email, role, logout } = useAuth();

  return (
    <header className="h-20 border-b-4 border-border-color bg-theme-card sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8">
      <div className="flex items-center gap-4">
        {onMenuToggle && (
          <button 
            onClick={onMenuToggle}
            className="p-2 border-3 border-border-color bg-white text-brutal-border hover:bg-theme-primary shadow-brutal-sm transition-colors rounded-sm"
          >
            {isMenuOpen ? <FiX size={24} className="stroke-[3]" /> : <FiMenu size={24} className="stroke-[3]" />}
          </button>
        )}
        <h1 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight hidden sm:block">
          {role === 1 ? "Admin Portal" : "User Portal"}
        </h1>
      </div>
      
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden sm:flex flex-col items-end">
          <span className="font-bold text-sm bg-brutal-yellow px-2 py-0.5 border-2 border-border-color text-brutal-border">
            {role === 1 ? "ADMIN" : "USER"}
          </span>
          <span className="font-bold text-xs mt-1">{email}</span>
        </div>
        
        <ThemeToggle />
        
        <button 
          onClick={logout}
          className="p-2 border-3 border-border-color bg-brutal-pink text-white hover:bg-theme-primary hover:text-brutal-border shadow-brutal hover:shadow-brutal-sm hover:translate-y-1 hover:translate-x-1 transition-all rounded-sm flex items-center justify-center"
          title="Logout"
        >
          <FiLogOut size={20} className="stroke-[3]" />
        </button>
      </div>
    </header>
  );
};
