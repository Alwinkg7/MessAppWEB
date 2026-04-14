"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiUser } from "react-icons/fi";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useAuth } from "@/utils/auth-context";
import { validateEmail, validatePassword } from "@/utils/validation";
import { loginUser } from "@/data/auth";
import toast from "react-hot-toast";

export default function UserLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string | null; password?: string | null }>({});
  
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    
    setErrors({ email: emailErr, password: passErr });
    
    if (emailErr || passErr) return;
    
    setIsLoading(true);
    
    try {
      const response = await loginUser({ email, password });
      
      if (response && response.token) {
        toast.success("Login successful!");
        login(response.token);
      } else {
        toast.error("Invalid response from server");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-brutal-pink pattern-dots-md">
      <Link 
        href="/home" 
        className="absolute top-6 left-6 flex items-center gap-2 font-heading font-bold bg-white px-4 py-2 border-3 border-border-color shadow-brutal hover:-translate-y-1 transition-transform"
      >
        <FiArrowLeft size={20} className="stroke-[3]" /> Home
      </Link>
      
      <div className="w-full max-w-md bg-white border-[4px] border-border-color shadow-[12px_12px_0px_#000] p-8 -rotate-1 relative animate-slide-up rounded-sm z-10">
        <div className="absolute -top-6 -right-6 w-16 h-16 bg-brutal-yellow border-3 border-border-color flex items-center justify-center shadow-brutal transform rotate-12">
          <FiUser size={32} className="stroke-[2.5]" />
        </div>
        
        <h1 className="text-4xl font-heading font-black uppercase mb-2">User Portal</h1>
        <p className="font-bold text-gray-800 mb-8 max-w-[80%]">Enter your credentials to access the mess dashboard.</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <Input 
            label="Email Address" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="user@example.com"
          />
          <Input 
            label="Password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="••••••••"
          />
          
          <Button type="submit" className="w-full text-lg mt-4" isLoading={isLoading}>
            Login
          </Button>
        </form>
        
        {/* <div className="mt-8 pt-6 border-t-[3px] border-dashed border-gray-300 text-center font-bold">
          <p>
            Admin? {" "}
            <Link href="/admin/login" className="text-brutal-pink hover:underline decoration-2 underline-offset-4 uppercase">
              Go to Admin Portal
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
}
