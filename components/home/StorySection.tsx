"use client";

import Reveal from "@/components/shared/Reveal";
import { ArrowRight, Scissors, Droplets, Sun } from "lucide-react";

export default function StorySection() {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative">
             <Reveal direction="left">
                <div className="aspect-[4/5] bg-muted rounded-[4rem] overflow-hidden shadow-2xl relative border-[12px] border-white ring-1 ring-black/5">
                   <img 
                      src="https://images.pexels.com/photos/5231239/pexels-photo-5231239.jpeg" 
                      alt="Dawn Harvest at the Farm"
                      className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                   {/* Placeholder Image Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
                   <div className="absolute bottom-12 left-12 right-12">
                      <p className="text-xs font-black text-secondary uppercase tracking-[0.3em] mb-2">Dawn Harvest</p>
                      <h4 className="text-3xl font-black text-white italic uppercase tracking-tighter">05:42 AM Today</h4>
                   </div>
                </div>
             </Reveal>
             
             {/* Dynamic Floatings Cards */}
             <Reveal direction="right" delay={0.5}>
                <div className="absolute -bottom-12 -right-8 glass p-10 rounded-[3rem] border-white/20 shadow-2xl max-w-xs rotate-6 hover:rotate-0 transition-all duration-700 hidden md:block">
                   <div className="bg-primary h-12 w-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-primary/20">
                      <Droplets size={24} />
                   </div>
                   <h5 className="text-xl font-black text-primary uppercase italic tracking-tighter mb-2">98% Hydration</h5>
                   <p className="text-xs text-muted-foreground leading-relaxed font-bold">Our harvest timing ensures roots retain maximum moisture for immediate bonding.</p>
                </div>
             </Reveal>
          </div>

          <div className="space-y-12">
            <Reveal direction="up">
               <span className="text-secondary font-black uppercase tracking-[0.4em] text-xs mb-4 block">The Process</span>
               <h2 className="text-5xl md:text-7xl font-black text-primary italic uppercase tracking-tighter leading-none mb-8">
                  From Farm <br />
                  <span className="text-glow">To Property.</span>
               </h2>
               <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Traditional sod retailers store grass on concrete for days. We operate a zero-inventory logistics model. Your grass is still growing in our soil while you&apos;re getting your morning coffee.
               </p>
            </Reveal>

            <div className="space-y-8">
               {[
                 { 
                   icon: <Scissors className="text-secondary" />, 
                   title: "Precision Dawn Cut", 
                   desc: "Laser-guided harvest starting at 5 AM." 
                 },
                 { 
                   icon: <ArrowRight className="text-secondary" />, 
                   title: "Instant Loading", 
                   desc: "Directly from the cutter onto our delivery fleet." 
                 },
                 { 
                   icon: <Sun className="text-secondary" />, 
                   title: "Same Day Setup", 
                   desc: "Arrives at your door while roots are still active." 
                 }
               ].map((item, idx) => (
                 <Reveal key={idx} direction="up" delay={0.2 + (idx * 0.1)}>
                   <div className="flex gap-8 group">
                      <div className="h-16 w-16 glass rounded-2xl flex items-center justify-center border-primary/5 group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                         {item.icon}
                      </div>
                      <div className="pt-2 border-b border-muted flex-grow pb-8">
                         <h4 className="text-xl font-bold text-primary mb-2 italic uppercase tracking-tight">{item.title}</h4>
                         <p className="text-sm text-muted-foreground font-medium">{item.desc}</p>
                      </div>
                   </div>
                 </Reveal>
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
