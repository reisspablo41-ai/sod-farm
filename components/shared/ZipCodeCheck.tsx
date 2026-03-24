"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Truck, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ZipCodeCheck() {
  const [zipCode, setZipCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "pickup">("idle");
  const [message, setMessage] = useState("");

  const handleCheck = async () => {
    if (!zipCode || zipCode.length < 5) {
      setStatus("error");
      setMessage("Please enter a valid 5-digit zip code.");
      return;
    }

    setStatus("loading");
    
    try {
      const response = await fetch("/api/zip-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zipCode }),
      });
      
      const data = await response.json();
      
      if (data.isDeliverable) {
        setStatus("success");
        setMessage(data.message);
      } else {
        setStatus("pickup");
        setMessage(data.message);
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="flex gap-4">
          <div className="relative flex-grow group">
            <Input
              type="text"
              placeholder="Enter Area Code"
              maxLength={5}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ""))}
              className="bg-white border-primary/20 rounded-xl px-12 py-7 focus:outline-none focus:ring-2 focus:ring-secondary text-primary placeholder:text-primary/30 text-lg transition-all"
            />
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors" size={20} />
          </div>
          <Button
            onClick={handleCheck}
            disabled={status === "loading"}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-7 h-auto rounded-xl font-bold transition-all hover:scale-105 active:scale-95"
          >
            {status === "loading" ? "Checking..." : "Check"}
          </Button>
        </div>

        {status !== "idle" && (
          <div className={cn(
            "mt-6 p-4 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300",
            status === "success" ? "bg-green-50 text-green-800 border border-green-200" :
            status === "pickup" ? "bg-amber-50 text-amber-800 border border-amber-200" :
            "bg-red-50 text-red-800 border border-red-200"
          )}>
            {status === "success" && <CheckCircle2 className="shrink-0 mt-0.5" size={18} />}
            {(status === "pickup" || status === "error") && <AlertCircle className="shrink-0 mt-0.5" size={18} />}

            <div>
              <p className="font-bold text-sm">{status === "success" ? "Local Delivery Available" : status === "pickup" ? "Farm Pickup Only" : "Error"}</p>
              <p className="text-xs opacity-90">{message}</p>
            </div>
          </div>
        )}

        <div className="mt-8 grid grid-cols-2 gap-4 text-[10px] text-primary/40 uppercase font-bold tracking-widest">
           <div className="flex items-center gap-2">
             <Truck size={14} className="text-secondary" />
             <span>Daily 5AM-9AM Deliveries</span>
           </div>
           <div className="flex items-center gap-2">
             <MapPin size={14} className="text-secondary" />
             <span>Shipping to Several Areas</span>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
