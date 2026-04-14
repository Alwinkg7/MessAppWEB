"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiShield } from "react-icons/fi";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useAuth } from "@/utils/auth-context";
import { validateEmail, validatePassword } from "@/utils/validation";
import { loginUser } from "@/data/auth";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string | null; password?: string | null }>({});
  
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    
    setErrors({ email: emailErr, password: passErr });
    
    if (emailErr || passErr) return;
    
    setIsLoading(true);
    
    try {
      const response = await loginUser({ email, password });
      
      if (response && response.token) {
        toast.success("Admin login successful!");
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-brutal-cyan pattern-dots-md">
      <Link 
        href="/home" 
        className="absolute top-6 left-6 flex items-center gap-2 font-heading font-bold bg-white px-4 py-2 border-3 border-border-color shadow-brutal hover:-translate-y-1 transition-transform z-20"
      >
        <FiArrowLeft size={20} className="stroke-[3]" /> Home
      </Link>
      
      <div className="w-full max-w-md bg-brutal-dark text-white border-[4px] border-border-color shadow-[12px_12px_0px_#FF499E] p-8 -rotate-1 relative animate-slide-up rounded-sm z-10">
        <div className="absolute -top-6 -right-6 w-16 h-16 bg-white border-3 border-border-color flex items-center justify-center shadow-brutal transform rotate-12 text-brutal-dark">
          <FiShield size={32} className="stroke-[2.5]" />
        </div>
        
        <h1 className="text-4xl font-heading font-black uppercase mb-2">Admin Portal</h1>
        <p className="font-bold text-gray-300 mb-8 max-w-[80%]">Secure access for administrative operations only.</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <Input 
            label="Admin Email" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="admin@example.com"
            className="bg-gray-800 text-white placeholder:text-gray-700 border-gray-600 focus:border-white shadow-none"
          />
          <Input 
            label="Password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="••••••••"
            className="bg-gray-800 text-white placeholder:text-gray-700 border-gray-600 focus:border-white shadow-none"
          />
          
          <Button type="submit" className="w-full text-lg mt-4 bg-white text-brutal-dark hover:bg-brutal-cyan shadow-[4px_4px_0px_#FF499E]" isLoading={isLoading}>
            Authenticate
          </Button>
        </form>
        
        <div className="mt-8 pt-6 border-t-[3px] border-dashed border-gray-700 text-center font-bold">
          <p>
            User? {" "}
            <Link href="/login" className="text-brutal-cyan hover:underline decoration-2 underline-offset-4 uppercase">
              Go to User Portal
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
