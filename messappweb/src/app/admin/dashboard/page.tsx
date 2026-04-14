"use client";

import { useEffect, useState } from "react";
import { FiUsers, FiDollarSign, FiAlertCircle, FiGrid, FiClock, FiActivity, FiCheckCircle } from "react-icons/fi";
import { getAdminDashboardStats } from "@/data/dashboard";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { StatCard } from "@/components/StatCard";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/utils/auth";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 0,
    mealsToday: 0,
    pendingPayments: 0,
    monthlyRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const role = getUserRole();
    if (role !== "1") {
      toast.error("Access denied");
      router.push("/");
      return;
    }
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const data = await getAdminDashboardStats();
        setStats({
          totalUsers: data.totalUsers || 0,
          mealsToday: data.mealsToday || 0,
          pendingPayments: data.pendingPayments || 0,
          monthlyRevenue: data.monthlyRevenue || 0,
        });
      } catch (error: any) {
        console.error("Failed to fetch dashboard stats", error);
        toast.error("Failed to load statistics.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: "Total Users", value: stats.totalUsers, icon: FiUsers, color: "bg-brutal-cyan" },
    { title: "Meals Served Today", value: stats.mealsToday, icon: FiActivity, color: "bg-brutal-green" },
    { title: "Pending Payments", value: stats.pendingPayments, icon: FiClock, color: "bg-brutal-yellow" },
    { title: "Monthly Revenue", value: `$${Number(stats.monthlyRevenue).toFixed(2)}`, icon: FiDollarSign, color: "bg-brutal-pink", textWhite: true },
  ];

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="border-b-[4px] border-border-color pb-4 mb-8">
        <h1 className="text-3xl md:text-5xl font-heading font-black uppercase">Dashboard Overview</h1>
        <p className="font-bold text-gray-800 mt-2">Manage the mess from a single brutal control panel.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          isLoading ? (
             <SkeletonLoader key={idx} className="h-40" />
          ) : (
            <StatCard 
              key={idx} 
              title={stat.title} 
              value={stat.value} 
              icon={stat.icon} 
              colorClass={stat.color} 
              textColorClass={stat.textWhite ? "text-white" : "text-black"} 
            />
          )
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <div className="brutal-card p-6 border-4">
          <h2 className="text-2xl font-heading font-black uppercase mb-4 flex items-center gap-2">
            <FiAlertCircle className="text-brutal-pink stroke-[3]" /> Needs Attention
          </h2>
          <div className="space-y-4">
            {[
              "3 users have pending bills for over 2 months.",
              "Dinner pricing takes effect tomorrow.",
              "System backup completed successfully at 02:00 AM."
            ].map((msg, i) => (
              <div key={i} className="py-3 px-4 bg-gray-100 dark:bg-gray-800 border-l-4 border-brutal-yellow font-bold">
                {msg}
              </div>
            ))}
          </div>
        </div>

        <div className="brutal-card p-0 overflow-hidden border-4 flex flex-col">
          <div className="bg-brutal-dark text-white p-6 border-b-4 border-border-color">
            <h2 className="text-2xl font-heading font-black uppercase">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-0 flex-1">
             <button className="border-r-4 border-b-4 border-border-color bg-brutal-yellow hover:bg-white transition-colors flex flex-col items-center justify-center p-8 gap-4 font-heading font-bold uppercase">
               <FiCheckCircle size={32} className="stroke-[3]" />
               Scan QR
             </button>
             <button className="border-b-4 border-border-color bg-brutal-cyan hover:bg-white transition-colors flex flex-col items-center justify-center p-8 gap-4 font-heading font-bold uppercase">
               <FiDollarSign size={32} className="stroke-[3]" />
               Generate Bills
             </button>
             <button className="border-r-4 border-border-color bg-brutal-pink text-white hover:text-black hover:bg-white transition-colors flex flex-col items-center justify-center p-8 gap-4 font-heading font-bold uppercase">
               <FiUsers size={32} className="stroke-[3]" />
               Add User
             </button>
             <button className="bg-gray-200 text-black hover:bg-white transition-colors flex flex-col items-center justify-center p-8 gap-4 font-heading font-bold uppercase">
               <FiGrid size={32} className="stroke-[3]" />
               Config Meals
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
