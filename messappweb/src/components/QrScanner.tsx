"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { Button } from "@/components/Button";
import { FiCameraOff, FiRefreshCw } from "react-icons/fi";

interface QrScannerProps {
  onScanSuccess: (decodedText: string) => void;
  isLoading: boolean;
}

export function QrScanner({ onScanSuccess, isLoading }: QrScannerProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isScanning, setIsScanning] = useState(true);

  const lastScanTime = useRef<number>(0);
  const scannerContainerId = "qr-reader-container";

  useEffect(() => {
    let html5QrCode: Html5Qrcode;

    const startScanner = async () => {
      try {
        html5QrCode = new Html5Qrcode(scannerContainerId, {
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
          verbose: false
        });
        
        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }
          },
          (decodedText) => {
            const now = Date.now();
            if (now - lastScanTime.current > 2000) {
              lastScanTime.current = now;
              
              // Play success sound
              try {
                const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
                audio.play().catch(e => console.log("Audio play failed:", e));
              } catch (e) {}
              
              setIsScanning(false);
              html5QrCode.stop().then(() => {
                onScanSuccess(decodedText);
              }).catch((err) => {
                console.error("Failed to stop scanner", err);
                onScanSuccess(decodedText);
              });
            }
          },
          (errorMessage) => {
            // Ignore normal non-matching frames to prevent console spam
          }
        );
        setHasPermission(true);
      } catch (err: any) {
        setHasPermission(false);
        setErrorMsg(err?.message || "Failed to access camera.");
        console.error("Camera start error", err);
      }
    };

    if (isScanning) {
      // Small timeout to ensure DOM is ready
      setTimeout(() => startScanner(), 100);
    }

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(console.error);
        html5QrCode.clear();
      }
    };
  }, [isScanning, onScanSuccess]);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 w-full">
      {hasPermission === false && (
        <div className="text-brutal-pink font-bold flex flex-col items-center">
          <FiCameraOff size={48} className="mb-4 text-brutal-pink" />
          <p>Camera access denied or unavailable.</p>
          <p className="text-sm px-4 text-center mt-2 text-gray-700">{errorMsg}</p>
          <Button 
            onClick={() => setIsScanning(true)} 
            className="mt-6 bg-brutal-dark text-white hover:bg-brutal-pink"
          >
            Try Again
          </Button>
        </div>
      )}

      {isScanning ? (
        <div className="relative w-full max-w-sm mx-auto overflow-hidden border-[6px] border-brutal-border shadow-brutal-lg bg-black rotate-1 h-[300px]">
          {/* We must wait until the element is actually present. It's always rendered here. */}
          <div id={scannerContainerId} className="w-full h-full"></div>
          
          <style jsx>{`
            @keyframes scan-line {
              0% { top: 0; }
              50% { top: 100%; }
              100% { top: 0; }
            }
            .animate-scan-line {
              animation: scan-line 2.5s ease-in-out infinite;
            }
          `}</style>
          <div className="absolute left-0 w-full h-[4px] bg-brutal-green animate-scan-line shadow-[0_0_15px_#22c55e] z-10"></div>
        </div>
      ) : (
        <div className="w-full max-w-sm border-[6px] border-brutal-border shadow-brutal-lg bg-brutal-yellow p-8 flex flex-col items-center text-center -rotate-1">
          <h3 className="font-heading font-black text-xl uppercase mb-4 text-brutal-border">
            Scan Complete
          </h3>
          <p className="font-bold text-gray-800 mb-6">QR Code processed.</p>
          <Button 
            onClick={() => setIsScanning(true)} 
            isLoading={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-brutal-green text-brutal-border border-[3px]"
          >
            {!isLoading && <FiRefreshCw size={20} />}
            Scan Again
          </Button>
        </div>
      )}
    </div>
  );
}
