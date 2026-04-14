"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getToken, extractRole, extractUserId, extractEmail, isTokenExpired, removeToken, setToken as setCookieToken } from "./jwt";

interface AuthContextType {
  token: string | null;
  role: number | null;
  userId: number | null;
  email: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUser: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = getToken();

      if (storedToken && !isTokenExpired(storedToken)) {
        setToken(storedToken);
        setRole(extractRole(storedToken));
        setUserId(extractUserId(storedToken));
        setEmail(extractEmail(storedToken));
      } else if (storedToken) {
        // Token exists but is expired
        removeToken();
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [pathname]); // Re-check auth state on route changes

  const login = (newToken: string) => {
    setCookieToken(newToken);
    setToken(newToken);
    
    const extractedRole = extractRole(newToken);
    setRole(extractedRole);
    setUserId(extractUserId(newToken));
    setEmail(extractEmail(newToken));
    
    // Redirect based on role
    if (extractedRole === 1) {
      router.push("/admin/dashboard");
    } else if (extractedRole === 2) {
      router.push("/user-dashboard");
    } else {
      router.push("/home");
    }
  };

  const logout = () => {
    removeToken();
    setToken(null);
    setRole(null);
    setUserId(null);
    setEmail(null);
    
    // Determine where to redirect based on current path
    if (pathname?.startsWith("/admin")) {
      router.push("/admin/login");
    } else {
      router.push("/login");
    }
  };

  const isAuthenticated = !!token && !isTokenExpired(token);
  const isAdmin = isAuthenticated && role === 1;
  const isUser = isAuthenticated && role === 2;

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        userId,
        email,
        isAuthenticated,
        isAdmin,
        isUser,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
