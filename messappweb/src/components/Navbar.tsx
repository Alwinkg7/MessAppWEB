"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./Button";
import { useAuth } from "@/utils/auth-context";

export const Navbar = () => {
  const { isAuthenticated, role, logout } = useAuth();

  return (
    <nav className="w-full border-b-[3px] border-border-color bg-theme-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/home" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-theme-primary border-[3px] border-border-color flex items-center justify-center shadow-brutal transition-transform group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-brutal-lg">
                <span className="font-heading font-black text-xl text-brutal-border">M</span>
              </div>
              <span className="font-heading font-black text-2xl tracking-tighter uppercase">MessApp</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            <Link href="/home#features" className="font-heading font-bold text-lg uppercase hover:text-theme-primary hover:underline decoration-4 underline-offset-4 transition-all">Features</Link>
            <Link href="/home#about" className="font-heading font-bold text-lg uppercase hover:text-theme-primary hover:underline decoration-4 underline-offset-4 transition-all">About</Link>
            <Link href="/home#contact" className="font-heading font-bold text-lg uppercase hover:text-theme-primary hover:underline decoration-4 underline-offset-4 transition-all">Contact</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link href={role === 1 ? "/admin/dashboard" : "/user-dashboard"}>
                  <Button variant="secondary" className="px-4 py-2 text-sm">Dashboard</Button>
                </Link>
                <Button variant="ghost" onClick={logout} className="px-4 border-3 border-transparent hover:border-border-color hover:shadow-brutal">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="secondary" className="px-4 py-2">Login</Button>
                </Link>
                {/* <Link href="/admin/login" className="hidden sm:block">
                  <Button variant="ghost" className="px-4 py-2 border-3 border-transparent hover:border-border-color hover:shadow-brutal bg-white dark:bg-black">Admin</Button>
                </Link> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
