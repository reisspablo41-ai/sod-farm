"use client";

import Reveal from "@/components/shared/Reveal";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TESTIMONIALS = [
  {
    name: "Robert Henderson",
    role: "Professional Landscaper",
    text: "The 'Cut at Dawn' promise isn't just marketing. The hydration levels in their Bermuda are significantly higher than any big-box supplier. My clients' lawns establish 30% faster.",
    rating: 5,
    tag: "Landscaping Pros"
  },
  {
    name: "Sarah Jenkins",
    role: "Homeowner",
    text: "I was worried about ordering sod online, but the process was seamless. The calculator was spot on, and the delivery team placed the pallets exactly where I needed them.",
    rating: 5,
    tag: "Estate Owners"
  },
  {
    name: "David Chen",
    role: "Golf Course Manager",
    text: "Purity and consistency are critical for us. Fresh Cut Sod delivers the highest grade turfgrass with deep root systems that thrive in our local heat.",
    rating: 5,
    tag: "Commercial"
  }
];

export default function TestimonialSection() {
  return (
    <section className="section-padding bg-muted/20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <Reveal direction="left">
               <span className="text-secondary font-black uppercase tracking-[0.4em] text-xs mb-4 block">Social Proof</span>
               <h2 className="text-5xl md:text-7xl font-black text-primary italic uppercase tracking-tighter leading-none mb-6">
                  Trusted by the <br />
                  <span className="text-glow">Experts.</span>
               </h2>
            </Reveal>
            <Reveal direction="left" delay={0.2}>
               <p className="text-xl text-muted-foreground leading-relaxed">
                  Join hundreds of professional landscapers and homeowners who refuse to settle for anything less than farm-fresh turfgrass.
               </p>
            </Reveal>
          </div>
          
          <Reveal direction="right" delay={0.4}>
             <div className="flex gap-4">
                <Button variant="outline" size="icon" className="h-16 w-16 rounded-2xl border-primary/10 hover:bg-primary hover:text-white transition-all">
                   <ChevronLeft size={24} />
                </Button>
                <Button variant="outline" size="icon" className="h-16 w-16 rounded-2xl border-primary/10 hover:bg-primary hover:text-white transition-all">
                   <ChevronRight size={24} />
                </Button>
             </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} direction="up" delay={0.2 * i}>
              <div className="glass p-10 rounded-[3rem] h-full flex flex-col justify-between border-white/40 group hover:shadow-2xl transition-all duration-700">
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={14} className="fill-secondary text-secondary" />
                      ))}
                    </div>
                    <span className="bg-primary/5 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-primary/60 group-hover:bg-primary group-hover:text-white transition-colors">
                      {t.tag}
                    </span>
                  </div>
                  <div className="relative">
                    <Quote className="absolute -top-4 -left-6 text-primary/5 h-16 w-16 -z-10" />
                    <p className="text-lg font-medium text-foreground leading-relaxed italic">
                      &quot;{t.text}&quot;
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-10 mt-auto">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl italic uppercase">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">{t.name}</h4>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        
        <Reveal direction="up" delay={0.6}>
           <div className="mt-24 text-center">
              <Link href="/testimonials" className="bg-primary text-white px-12 py-6 rounded-3xl font-black italic uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all shadow-2xl inline-block">
                 View All Stories
              </Link>
           </div>
        </Reveal>
      </div>
    </section>
  );
}
