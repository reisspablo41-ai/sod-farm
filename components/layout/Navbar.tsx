"use client"; // force-refresh-1

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-4" : "py-8"
      )}
    >
      <div className="container mx-auto px-4">
        <div className={cn(
          "glass rounded-[2rem] px-6 md:px-10 py-4 flex items-center justify-between transition-all duration-500",
          scrolled ? "bg-white/80 dark:bg-black/60 shadow-lg" : "bg-white/40 dark:bg-black/20"
        )}>
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-white rotate-3 group-hover:rotate-12 transition-transform duration-500">
               <span className="font-black italic text-xl">FC</span>
            </div>
            <span className="text-xl font-black text-primary italic uppercase tracking-tighter">
              FreshCut <span className="text-secondary-foreground font-light">Sod Farms</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {["Shop", "Shipping", "About", "Testimonials", "Contact"].map((item) => (
              <Link 
                key={item} 
                href={item === "Shop" ? "/shop" : `/${item.toLowerCase()}`}
                className="text-sm font-bold text-foreground/70 hover:text-primary transition-colors tracking-widest uppercase relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button className="hidden md:flex bg-primary hover:bg-primary/90 text-white rounded-xl px-8 py-5 font-black italic uppercase text-xs tracking-widest h-auto shadow-xl shadow-primary/20 hover:scale-105 transition-all">
               <Link href="/contact">Inquire Now</Link>
            </Button>
            
            {/* Mobile Toggle */}
            <button 
              className="lg:hidden h-10 w-10 flex items-center justify-center text-primary rounded-xl hover:bg-primary/5 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 bg-background/95 backdrop-blur-2xl z-40 transition-all duration-500 lg:hidden",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}>
        <div className="flex flex-col items-center justify-center h-full gap-12 p-8">
           {["Shop", "Shipping", "About", "Testimonials", "Contact"].map((item) => (
             <Link 
               key={item} 
               href={item === "Shop" ? "/shop" : `/${item.toLowerCase()}`}
               className="text-4xl font-black text-primary italic uppercase tracking-tighter hover:text-secondary-foreground transition-colors"
               onClick={() => setIsOpen(false)}
             >
               {item}
             </Link>
           ))}
           <Link href="/contact" onClick={() => setIsOpen(false)} className="w-full">
             <Button className="w-full bg-primary py-8 rounded-3xl text-xl font-black italic uppercase tracking-widest h-auto shadow-2xl">
                Request Special Quote
             </Button>
           </Link>
        </div>
      </div>
    </nav>
  );
}
