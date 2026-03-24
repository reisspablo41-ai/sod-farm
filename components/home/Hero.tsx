"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { ChevronRight, Play, ArrowDownRight } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/shared/Reveal";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax effect for the background
    const moveBackground = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to(bgRef.current, {
        x: xPos,
        y: yPos,
        duration: 2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveBackground);
    return () => window.removeEventListener("mousemove", moveBackground);
  }, []);

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden pt-20">
      {/* Background Media Placeholder */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 scale-110"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5231236/pexels-photo-5231236.jpeg')] bg-cover bg-center grayscale opacity-20"></div>
        
        {/* Decorative Circles */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-5xl">
          <Reveal direction="left" delay={0.2}>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-12 bg-secondary"></span>
              <span className="text-secondary font-black uppercase tracking-[0.4em] text-xs">Premium Turfgrass Farm</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.4}>
            <h1 className="text-6xl md:text-[9rem] font-black text-white leading-[0.85] mb-12 italic uppercase tracking-tighter">
              Harvested <br />
              <span className="text-secondary text-glow">at Dawn.</span>
            </h1>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-end">
            <Reveal direction="up" delay={0.6}>
              <div className="space-y-12">
                <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-medium">
                  We deliver zero-shelf-time, high-hydration sod directly to your property within hours of cutting. Your lawn doesn&apos;t wait, and neither do we.
                </p>
                
                <div className="flex flex-wrap gap-6 items-center">
                  <Link href="/shop">
                    <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-[2rem] px-10 py-8 font-black italic uppercase tracking-widest text-lg h-auto shadow-2xl shadow-secondary/20 hover:scale-105 transition-all flex items-center gap-3">
                      Order For Tomorrow <ChevronRight size={24} />
                    </Button>
                  </Link>
                  <Button variant="ghost" className="text-white hover:bg-white/10 rounded-full h-16 w-16 p-0 group">
                    <div className="bg-white/20 rounded-full p-4 group-hover:bg-secondary/20 transition-colors">
                      <Play className="fill-white" size={24} />
                    </div>
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.8}>
               <div className="glass p-10 rounded-[3rem] border-white/10 space-y-6 md:-translate-y-24 rotate-3 hover:rotate-0 transition-transform duration-700">
                  <div className="flex justify-between items-start">
                     <div className="h-14 w-14 bg-secondary rounded-2xl flex items-center justify-center text-secondary-foreground shadow-lg">
                        <ArrowDownRight size={32} />
                     </div>
                     <span className="bg-white/10 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-white/60">Live Status</span>
                  </div>
                  <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter">Next Harvest</h3>
                  <div className="space-y-2">
                     <div className="flex justify-between text-white/50 text-xs font-bold uppercase tracking-widest">
                        <span>Current Phase</span>
                        <span>Est. Completion</span>
                     </div>
                     <div className="flex justify-between text-2xl font-black text-secondary italic uppercase tracking-tighter">
                        <span>Loading Now</span>
                        <span>9:45 AM</span>
                     </div>
                  </div>
               </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 animate-bounce">
         <span className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em] rotate-90">Scroll</span>
      </div>
    </section>
  );
}
