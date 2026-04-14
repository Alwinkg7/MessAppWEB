"use client";

import { useEffect, useState } from "react";
import { FiDollarSign, FiCalendar, FiDownload } from "react-icons/fi";
import { getAllBills, generateBilling, markBillAsPaid } from "@/data/billing";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import toast from "react-hot-toast";
import { TableSkeleton } from "@/components/SkeletonLoader";

export default function AdminBillingPage() {
  const [bills, setBills] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending">("all");
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // 1-12

  const [genYear, setGenYear] = useState<number>(currentYear);
  const [genMonth, setGenMonth] = useState<number>(currentMonth);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    setIsLoading(true);
    try {
      const data = await getAllBills();
      setBills(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to load billing history");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (bill: any) => {
    const dataStr = JSON.stringify(bill, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `bill-${bill.id}.json`;
    link.click();

    window.URL.revokeObjectURL(url);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!genYear || !genMonth) return toast.error("Year and month required");

    setIsGenerating(true);
    try {
      const response = await generateBilling(genYear, genMonth);
      toast.success(response?.message || "Billing generated successfully");
      fetchBills(); // Refresh list
    } catch (error: any) {
      toast.error(error.message || "Bills might be already generated or failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleMarkPaid = async (billId: number) => {
    if (!confirm("Mark this bill as paid?")) return;

    try {
      await markBillAsPaid(billId);
      toast.success("Payment marked as paid");

      fetchBills(); // refresh data
    } catch (error: any) {
      toast.error(error.message || "Failed to update payment");
    }
  };

  const columns = [
    {
      header: "Bill ID",
      accessorKey: "id",
      cell: (item: any) => (
        <div className={item.status !== "Paid" ? "bg-red-50 px-2 py-1" : ""}>
          {item.id}
        </div>
      )
    },
    { header: "User ID", accessorKey: "userId", cell: (item: any) => <span className="font-bold">UID-{item.userId}</span> },
    { header: "Period", accessorKey: "month", cell: (item: any) => `${item.month}/${item.year}` },
    { header: "Meals", accessorKey: "totalMealsConsumed", cell: (item: any) => <span className="font-bold px-2 py-0.5 bg-gray-200 border-2 border-border-color">{item.totalMealsConsumed}</span> },
    { header: "Amount", accessorKey: "totalAmount", cell: (item: any) => <span className="font-heading font-black">₹{item.totalAmount.toFixed(2)}</span> },
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
      header: "Actions",
      accessorKey: "id",
      cell: (item: any) => {
        const isPaid = item.status === "Paid";

        return (
          <div className="flex gap-2">
            {!isPaid && (
              <button
                onClick={() => handleMarkPaid(item.id)}
                className="px-3 py-1 text-sm font-bold bg-green-300 border-2 border-border-color hover:bg-green-400 transition"
              >
                ✅ Mark Paid
              </button>
            )}

            <button
              onClick={() => handleDownload(item)}
              className="p-2 border-2 border-border-color hover:bg-brutal-cyan transition-all rounded-sm"
            >
              <FiDownload size={16} />
            </button>
          </div>
        );
      }
    }
  ];

  const filteredBills =
    filter === "pending"
      ? bills.filter((b) => b.status !== "Paid")
      : bills;

  const collectedThisMonth = bills
    .filter(b => b.status === "Paid")
    .reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="border-b-[4px] border-border-color pb-4">
        <h1 className="text-3xl font-heading font-black uppercase">Financial Management</h1>
        <p className="font-bold text-gray-600 mt-1">Generate and track monthly mess bills for all users.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* GENERATOR CARD */}
        <Card className="bg-brutal-cyan border-4">
          <div className="flex justify-between items-start mb-6 border-b-4 border-brutal-border pb-4">
            <h2 className="font-heading font-black text-xl uppercase">Generate Bills</h2>
            <FiDollarSign size={24} className="stroke-[3]" />
          </div>

          <form onSubmit={handleGenerate} className="space-y-4 bg-white p-6 border-4 border-brutal-border shadow-brutal translate-x-[-2px] translate-y-[-2px]">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-heading font-bold text-black text-sm uppercase">Year</label>
                <input
                  type="number"
                  className="brutal-input"
                  value={genYear}
                  onChange={e => setGenYear(parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-heading font-bold text-black text-sm uppercase">Month (1-12)</label>
                <input
                  type="number"
                  min="1" max="12"
                  className="brutal-input"
                  value={genMonth}
                  onChange={e => setGenMonth(parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="pt-4 border-t-2 border-dashed border-gray-300">
              <p className="text-xs font-bold text-gray-700 mb-4 uppercase">This triggers the DB stored procedure for all users simultaneously.</p>
              <Button type="submit" className="w-full text-lg bg-brutal-yellow text-brutal-border shadow-[4px_4px_0_#111]" isLoading={isGenerating}>
                Execute Generation
              </Button>
            </div>
          </form>
        </Card>

        {/* SUMMARY STATS */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="brutal-card p-6 bg-brutal-pink text-white flex flex-col justify-center items-center text-center">
            <h3 className="font-heading font-black text-lg uppercase mb-2">Total Pending Collection</h3>
            <span className="text-5xl lg:text-6xl font-heading font-black drop-shadow-[3px_3px_0_#111]">
              ₹{bills.filter(b => b.status === "Generated").reduce((sum, b) => sum + b.totalAmount, 0).toFixed(2)}
            </span>
          </div>
          <div className="brutal-card p-6 bg-brutal-green text-black flex flex-col justify-center items-center text-center">
            <h3 className="font-heading font-black text-lg uppercase mb-2">Collected This Month</h3>
            <span className="text-5xl lg:text-6xl font-heading font-black">
              ₹{collectedThisMonth.toFixed(2)}
            </span>
            <p className="font-bold text-sm mt-2">API stub not provided in schema setup yet.</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 border-2 ${filter === "all" ? "bg-brutal-cyan" : ""
            }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 border-2 ${filter === "pending" ? "bg-brutal-pink text-white" : ""
            }`}
        >
          Pending Only
        </button>
      </div>

      <p className="font-bold mb-4">
        {filter === "pending"
          ? `Showing Pending Bills (${filteredBills.length})`
          : `Total Bills: ${bills.length}`}
      </p>

      <div>
        <div className="flex items-center gap-2 mb-6">
          <FiCalendar className="text-brutal-pink stroke-[3]" size={24} />
          <h2 className="text-2xl font-heading font-black uppercase inline-block border-b-4 border-brutal-pink pb-1">
            Global Billing Ledger
          </h2>
        </div>

        {isLoading ? (
          <TableSkeleton rows={6} />
        ) : filteredBills.length === 0 ? (
          <div className="text-center p-10 border-2 border-dashed">
            <p className="font-bold text-lg">No bills found</p>
            <p className="text-sm text-gray-500">
              Try generating bills or changing filter
            </p>
          </div>
        ) : (
          <DataTable data={filteredBills} columns={columns} keyExtractor={(item) => item.id} />
        )}
      </div>
    </div>
  );
}
