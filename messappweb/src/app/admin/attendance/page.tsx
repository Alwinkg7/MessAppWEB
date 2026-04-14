"use client";

import { useState } from "react";
import { FiCamera, FiCheckCircle } from "react-icons/fi";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { scanAttendance } from "@/data/attendance";
import toast from "react-hot-toast";
import { QrScanner } from "@/components/QrScanner";

export default function AdminAttendancePage() {
  const [mode, setMode] = useState<"manual" | "camera">("manual");
  const [qrCode, setQrCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanResult, setLastScanResult] = useState<{ success: boolean; msg: string; time?: string } | null>(null);

  const handleScan = async (e?: React.FormEvent | string) => {
    if (e && typeof e !== "string" && 'preventDefault' in e) {
      e.preventDefault();
    }
    const valueToScan = typeof e === "string" ? e : qrCode;

    if (!valueToScan) return toast.error("Please enter a QR code value");

    setIsScanning(true);
    try {
      const response = await scanAttendance(qrCode);
      
      toast.success(response.message || "Attendance recorded");
      setLastScanResult({
        success: true,
        msg: `${response.message || 'Meal recorded'} - ${response.mealType}`,
        time: new Date().toLocaleTimeString(),
      });
      setQrCode(""); // Clear for next scan
    } catch (error: any) {
      toast.error(error.message || "Failed to record attendance");
      setLastScanResult({
        success: false,
        msg: error.message || "Failed to record attendance",
        time: new Date().toLocaleTimeString(),
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-6 animate-slide-up max-w-4xl mx-auto">
      <div className="border-b-[4px] border-border-color pb-4 mb-8">
        <h1 className="text-3xl font-heading font-black uppercase">QR Scanner Portal</h1>
        <p className="font-bold text-gray-600 mt-1">Simulate scanning QR codes to record user attendance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-brutal-yellow flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-6 border-b-4 border-brutal-border pb-4">
            <h2 className="font-heading font-black text-xl text-brutal-border uppercase">Scanner Input</h2>
            <FiCamera size={24} className="stroke-[3] text-brutal-border" />
          </div>

          <div className="flex w-full mb-6 border-4 border-brutal-border shadow-[4px_4px_0_#000] font-bold uppercase overflow-hidden bg-white">
            <button
              onClick={() => setMode("manual")}
              className={`flex-1 py-3 text-center transition-colors border-r-4 border-brutal-border text-black ${mode === "manual" ? "bg-brutal-border text-white" : "hover:bg-gray-100"}`}
            >
              Manual Input
            </button>
            <button
              onClick={() => setMode("camera")}
              className={`flex-1 py-3 text-center transition-colors text-black ${mode === "camera" ? "bg-brutal-border text-white" : "hover:bg-gray-100"}`}
            >
              Camera Scan
            </button>
          </div>

          <div className="bg-white p-8 border-4 border-brutal-border shadow-brutal-lg w-full mb-8 rotate-1 min-h-[350px] flex flex-col items-center justify-center">
            {mode === "manual" ? (
              <div className="w-full">
                <form onSubmit={handleScan} className="space-y-4 text-black">
                   <Input 
                     label="Scan QR Code or Type UUID" 
                     value={qrCode}
                     onChange={(e) => setQrCode(e.target.value)}
                     placeholder="e.g. c659e732-ed98-..."
                     className="text-lg font-mono text-center rounded-sm"
                     autoFocus={mode === "manual"}
                   />
                   <Button type="submit" className="w-full h-14 text-xl bg-brutal-dark text-white hover:bg-brutal-pink border-4" isLoading={isScanning}>
                     Record Attendance
                   </Button>
                </form>
                <p className="font-bold text-center text-brutal-border px-4 mt-6">
                  Point physical scanner to field above. It acts as keyboard input ending with Enter.
                </p>
              </div>
            ) : (
              <QrScanner 
                onScanSuccess={(decodedText) => handleScan(decodedText)} 
                isLoading={isScanning} 
              />
            )}
          </div>
        </Card>

        <div className="space-y-6">
          <div className="brutal-card p-0 border-4 flex flex-col h-full bg-white">
            <div className="bg-brutal-dark text-white p-4 border-b-4 border-brutal-border flex items-center justify-between">
               <h2 className="font-heading font-black uppercase text-lg">Last Scan Result</h2>
               <div className="w-3 h-3 rounded-full bg-brutal-green animate-pulse"></div>
            </div>
            
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center bg-pattern-grid">
               {lastScanResult ? (
                 <div className="animate-slide-up">
                   <div className={`mx-auto w-20 h-20 border-4 border-brutal-border flex items-center justify-center mb-6 shadow-[4px_4px_0_#000] rotate-[-5deg] ${lastScanResult.success ? 'bg-brutal-green' : 'bg-brutal-pink text-white'}`}>
                     {lastScanResult.success ? <FiCheckCircle size={40} className="stroke-[3] text-brutal-border" /> : <span className="font-heading font-black text-3xl">X</span>}
                   </div>
                   <h3 className="font-heading font-black text-2xl uppercase mb-2">{lastScanResult.success ? 'SUCCESS' : 'ERROR'}</h3>
                   <p className="font-bold text-lg px-4 border-2 border-dashed border-gray-400 py-2 inline-block bg-white">{lastScanResult.msg}</p>
                   {lastScanResult.time && <p className="mt-4 font-mono text-sm font-bold text-gray-700">Scanned at: {lastScanResult.time}</p>}
                 </div>
               ) : (
                 <div className="opacity-50 font-bold max-w-xs uppercase tracking-widest text-sm text-black">
                   Waiting for scan input...
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
