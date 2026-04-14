"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { FiUser, FiCreditCard, FiClock, FiDownload, FiRefreshCw, FiCheckCircle, FiCoffee, FiSun, FiMoon } from "react-icons/fi";
import { useAuth } from "@/utils/auth-context";
import { getUserBills } from "@/data/billing";
import { getUserById } from "@/data/user";
import { getUserAttendance } from "@/data/attendance";
import { Card } from "@/components/Card";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { SkeletonLoader, TableSkeleton } from "@/components/SkeletonLoader";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/utils/auth";

export default function UserDashboardPage() {
  const { userId, email } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [bills, setBills] = useState<any[]>([]);
  const [attendanceData, setAttendanceData] = useState<{ today: any, history: any[] } | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const role = getUserRole();
    if (role !== "2") {
      toast.error("Access denied");
      router.push("/");
      return;
    }
    if (!userId) return;
    
    let isMounted = true;

    const fetchAttendance = async (isBackground = false) => {
      if (isBackground && isMounted) {
        setIsPolling(true);
      }
      try {
         const data = await getUserAttendance(userId);
         if (!isMounted) return;
         setAttendanceData(prev => {
            if (prev && prev.history && data.history) {
               if (data.history.length > prev.history.length) {
                   const sorted = [...data.history].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
                   const newMeal = sorted[0];
                   if (newMeal) {
                     toast.success(`Meal recorded: ${newMeal.mealType}`);
                   }
               }
            }
            return data;
         });
      } catch (err) {
         console.error("Failed to fetch attendance", err);
      } finally {
         if (isBackground && isMounted) setIsPolling(false);
      }
    };
    
    fetchAttendance();
  
    const intervalId = setInterval(() => {
       fetchAttendance(true);
    }, 5000);
    
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [userId]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      
      setIsLoading(true);
      try {
        // Fetch user data for QR Code
        const userData = await getUserById(userId);
        setUser(userData);
        
        // Fetch user bills
        const userBills = await getUserBills(userId);
        setBills(Array.isArray(userBills) ? userBills : []);
      } catch (error: any) {
        toast.error("Failed to load dashboard data");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const currentBill = bills.length > 0 ? bills[bills.length - 1] : null;

  const attendanceColumns = [
    { header: "Date", accessorKey: "date", cell: (item: any) => new Date(item.date).toLocaleDateString() },
    { header: "Meal Type", accessorKey: "mealType" },
    { header: "Time", accessorKey: "time", cell: (item: any) => new Date(item.time).toLocaleTimeString() }
  ];

  const billColumns = [
    { header: "Month/Year", accessorKey: "month", cell: (item: any) => `${item.month}/${item.year}` },
    { header: "Meals", accessorKey: "totalMealsConsumed" },
    { header: "Amount", accessorKey: "totalAmount", cell: (item: any) => `$${item.totalAmount.toFixed(2)}` },
    { 
      header: "Status", 
      accessorKey: "status", 
      cell: (item: any) => {
        let type: "success" | "warning" | "neutral" = "neutral";
        if (item.status === "Paid") type = "success";
        if (item.status === "Generated") type = "warning";
        return <StatusBadge status={item.status} type={type} />;
      }
    },
    {
      header: "Action",
      accessorKey: "id",
      cell: (item: any) => (
        <button className="p-2 border-2 border-border-color hover:bg-theme-primary transition-all rounded-sm flex items-center justify-center">
          <FiDownload size={16} className="stroke-[3]" />
        </button>
      )
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonLoader className="h-64" />
          <SkeletonLoader className="h-64 md:col-span-2" />
        </div>
        <TableSkeleton rows={3} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="flex justify-between items-end border-b-[4px] border-border-color pb-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-heading font-black uppercase">Welcome Back</h1>
          <p className="font-bold text-gray-800 dark:text-gray-500 mt-2">Here's your mess summary, {user?.name || email}.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* QR CODE CARD */}
        <Card className="flex flex-col items-center text-center bg-brutal-yellow">
          <div className="w-full flex justify-between items-center mb-6">
            <h2 className="font-heading font-black text-xl uppercase">Your QR Pass</h2>
            <FiUser size={24} className="stroke-[3]" />
          </div>
          
          <div className="bg-white p-4 border-4 border-border-color shadow-[6px_6px_0_#000] mb-6">
            {user?.qrCodeValue ? (
              <QRCodeSVG 
                value={user.qrCodeValue}
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"H"}
              />
            ) : (
              <div className="w-[200px] h-[200px] flex items-center justify-center text-black bg-gray-100 font-bold">
                No QR Available
              </div>
            )}
          </div>
          
          <p className="font-bold text-sm">Scan this at the mess hall counter to mark your attendance.</p>
        </Card>

        {/* SUMMARY CARDS */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Card className="bg-brutal-cyan flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <h2 className="font-heading font-black text-xl uppercase">Current Due</h2>
              <FiCreditCard size={24} className="stroke-[3]" />
            </div>
            
            <div className="mt-8">
              <span className="text-5xl font-heading font-black drop-shadow-[2px_2px_0_#fff]">
                ${currentBill?.status === "Generated" ? currentBill.totalAmount.toFixed(2) : "0.00"}
              </span>
              <div className="mt-4">
                {currentBill?.status === "Generated" ? (
                  <StatusBadge status="PENDING" type="danger" />
                ) : (
                  <StatusBadge status="CLEAR" type="success" />
                )}
              </div>
            </div>
          </Card>

          <Card className="bg-brutal-pink text-white flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <h2 className="font-heading font-black text-xl uppercase">Meals This Month</h2>
              <FiClock size={24} className="stroke-[3]" />
            </div>
            
            <div className="mt-8">
              <span className="text-5xl font-heading font-black drop-shadow-[2px_2px_0_#000]">
                {currentBill?.totalMealsConsumed || 0}
              </span>
              <p className="font-bold mt-4 border-t-2 border-white/30 pt-2">
                Keep track of your eating habits.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* TODAY'S MEALS */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-[4px] border-border-color pb-4 mb-6 mt-12">
          <div>
            <h2 className="text-2xl font-heading font-black uppercase">Today's Meals</h2>
            <p className="font-bold text-gray-800 dark:text-gray-800 mt-1">Live status of your daily allowances.</p>
          </div>
          {isPolling && (
            <div className="text-sm font-bold flex items-center text-gray-500 mt-2 sm:mt-0 bg-gray-100 px-3 py-1 border-2 border-dashed border-gray-300 shadow-[2px_2px_0_#000]">
              <FiRefreshCw className="animate-spin mr-2" /> Updating...
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
          {["Breakfast", "Lunch", "Dinner"].map((meal) => {
            const status = attendanceData?.today?.[meal.toLowerCase()] || "Pending";
            const isCompleted = status === "Completed";
            
            return (
              <div key={meal} className={`border-4 border-brutal-border p-6 flex flex-col justify-between ${isCompleted ? 'bg-brutal-green' : 'bg-white'} shadow-brutal transition-colors duration-500`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-heading font-black text-black text-xl uppercase">{meal}</h3>
                  {meal === "Breakfast" && <FiCoffee size={24} className="stroke-[3] text-black" />}
                  {meal === "Lunch" && <FiSun size={24} className="stroke-[3] text-black" />}
                  {meal === "Dinner" && <FiMoon size={24} className="stroke-[3] text-black" />}
                </div>
                <div className="flex items-center gap-2">
                   {isCompleted ? <FiCheckCircle size={24} className="text-brutal-border stroke-[3]" /> : <FiClock size={24} className="text-gray-400 stroke-[3]" />}
                   <span className={`font-bold text-xl uppercase tracking-wider ${isCompleted ? 'text-brutal-border' : 'text-gray-400'}`}>{status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ATTENDANCE HISTORY */}
      <div className="mt-12">
        <h2 className="text-2xl font-heading font-black uppercase mb-6 inline-block border-b-4 border-brutal-yellow pb-1">
          Attendance History
        </h2>
        {attendanceData?.history && attendanceData.history.length > 0 ? (
          <DataTable 
            data={[...attendanceData.history].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())}
            columns={attendanceColumns}
            keyExtractor={(item: any) => item.id ? String(item.id) : String(item.date + item.time)}
          />
        ) : (
          <div className="p-8 border-4 border-brutal-border border-dashed text-center font-bold text-gray-500 uppercase tracking-widest bg-gray-50">
            No attendance yet
          </div>
        )}
      </div>

      {/* BILLING TABLE */}
      <div className="mt-12">
        <h2 className="text-2xl font-heading font-black uppercase mb-6 inline-block border-b-4 border-brutal-yellow pb-1">
          Billing History
        </h2>
        <DataTable 
          data={bills}
          columns={billColumns}
          keyExtractor={(item: any) => String(item.id)}
        />
      </div>
    </div>
  );
}
