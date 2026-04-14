import React from "react";
import { Card } from "@/components/Card";
import { IconType } from "react-icons";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  colorClass: string;
  textColorClass?: string;
}

export function StatCard({ title, value, icon: Icon, colorClass, textColorClass = "text-black" }: StatCardProps) {
  return (
    <Card className={`${colorClass} ${textColorClass} flex flex-col justify-between hover:-translate-y-1 hover:shadow-brutal-lg transition-transform duration-200`}>
      <div className="flex justify-between items-start mb-6">
        <h2 className="font-heading font-black text-sm md:text-base uppercase opacity-90">{title}</h2>
        <Icon size={24} className="stroke-[3]" />
      </div>
      <p className="text-4xl lg:text-5xl font-heading font-black drop-shadow-[2px_2px_0_var(--color-brutal-border)]">
        {value}
      </p>
    </Card>
  );
}
