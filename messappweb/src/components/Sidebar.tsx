"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiUsers, FiClock, FiGrid, FiDollarSign, FiCalendar } from "react-icons/fi";
import { useAuth } from "@/utils/auth-context";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const { role } = useAuth();
  
  if (role !== 1) return null; // Only for admin

  const links = [
    { name: "Dashboard", href: "/admin/dashboard", icon: FiHome },
    { name: "Users", href: "/admin/users", icon: FiUsers },
    { name: "Attendance", href: "/admin/attendance", icon: FiClock },
    { name: "Billing", href: "/admin/billing", icon: FiDollarSign },
    { name: "Meal Types", href: "/admin/meal-types", icon: FiGrid },
    { name: "Meal Windows", href: "/admin/meal-windows", icon: FiCalendar },
    { name: "Pricing", href: "/admin/pricing", icon: FiDollarSign },
  ];

  const sidebarClass = `fixed inset-y-0 left-0 z-30 w-64 bg-theme-card border-r-4 border-border-color transform transition-transform duration-300 ease-in-out ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  } pt-20 md:pt-0 mt-0 md:mt-20`;

  return (
    <>
      <div className={sidebarClass}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8 hidden md:flex">
            <div className="w-10 h-10 bg-brutal-yellow border-3 border-border-color flex items-center justify-center shadow-brutal">
              <span className="font-heading font-black text-xl text-brutal-border">M</span>
            </div>
            <span className="font-heading font-black text-2xl uppercase">MessApp</span>
          </div>

          <nav className="space-y-4">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      onClose();
                    }
                  }}
                  className={`flex items-center gap-3 px-4 py-3 font-heading font-bold text-lg uppercase transition-all rounded-sm border-3 ${
                    isActive 
                      ? "bg-theme-primary text-brutal-border border-border-color shadow-brutal translate-x-[-2px] translate-y-[-2px]" 
                      : "bg-transparent border-transparent hover:border-border-color hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon size={20} className={isActive ? "stroke-[3]" : "stroke-[2.5]"} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
      
      {/* Overlay for mobile and desktop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 backdrop-blur-sm"
          onClick={onClose}
        />
      )}
    </>
  );
};
