"use client";

import { useEffect } from "react";
import { Truck, Clock, Droplets } from "lucide-react";

export default function LiveStatusBar() {
  useEffect(() => {
    const timer = setInterval(() => {}, 60000);
    return () => clearInterval(timer);
  }, []);

  const nextHarvest = "Tomorrow, 5:30 AM";
  const currentStatus = "Loading & Delivering";

  return (
    <div className="w-full bg-muted py-3 border-y overflow-hidden whitespace-nowrap">
      <div className="container mx-auto px-4 flex items-center justify-center space-x-12 animate-marquee-slow md:animate-none md:justify-around">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Clock size={16} className="text-primary" />
          <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-bold">Next Harvest:</span>
          <span className="text-primary">{nextHarvest}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm font-medium">
          <Truck size={16} className="text-primary" />
          <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-bold">Status:</span>
          <span className="text-primary font-bold">{currentStatus}</span>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium">
          <Droplets size={16} className="text-primary" />
          <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-bold">Lawn Hydration:</span>
          <span className="text-primary">Condition Ideal</span>
        </div>
      </div>
    </div>
  );
}
