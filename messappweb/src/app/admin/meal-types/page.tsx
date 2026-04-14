"use client";

import { FiGrid } from "react-icons/fi";

export default function AdminMealTypesPage() {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="border-b-[4px] border-border-color pb-4 mb-8">
        <h1 className="text-3xl font-heading font-black uppercase flex items-center gap-3">
           <FiGrid /> Meal Types Config
        </h1>
        <p className="font-bold text-gray-800 mt-1">Configure different meal types (Breakfast, Lunch, Dinner).</p>
      </div>
      
      <div className="brutal-card bg-brutal-yellow p-10 text-center border-4">
         <h2 className="font-heading font-black text-2xl uppercase mb-2">Coming Soon</h2>
         <p className="font-bold">This module requires additional backend API endpoints to be fully implemented according to the schema.</p>
      </div>
    </div>
  );
}
