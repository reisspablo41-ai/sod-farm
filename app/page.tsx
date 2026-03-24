"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import LiveStatusBar from "@/components/home/LiveStatusBar";
import ZipCodeCheck from "@/components/shared/ZipCodeCheck";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import StorySection from "@/components/home/StorySection";
import TestimonialSection from "@/components/home/TestimonialSection";
import Reveal from "@/components/shared/Reveal";
import { useState, useEffect } from "react";

type GrassType = {
  id: string;
  name: string;
  description: string | null;
  sun_requirement: string | null;
  image_url: string | null;
  image_urls: string[] | null;
  products: { price: number; sq_ft_coverage: number; is_available: boolean }[];
};

function getLowestPricePerSqft(products: GrassType["products"]): string {
  const available = products.filter(p => p.is_available);
  if (!available.length) return "—";
  const prices = available.map(p => p.price / p.sq_ft_coverage);
  return Math.min(...prices).toFixed(2);
}

export default function Home() {
  const [grassTypes, setGrassTypes] = useState<GrassType[]>([]);

  useEffect(() => {
    fetch("/api/grass-types")
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setGrassTypes(data.slice(0, 3)); })
      .catch(() => {});
  }, []);

  const featuredSods = grassTypes.length > 0 ? grassTypes : [];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        <div className="relative z-20">
           <LiveStatusBar />
        </div>

        <StorySection />
        
        {/* Premium Varieties Section */}
        <section className="section-padding bg-muted/20 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <Reveal direction="left">
                   <span className="text-secondary font-black uppercase tracking-[0.4em] text-xs mb-4 block">The Collection</span>
                   <h2 className="text-5xl md:text-7xl font-black text-primary italic uppercase tracking-tighter leading-none mb-6">
                      Engineered <br />
                      <span className="text-glow">Varieties.</span>
                   </h2>
                </Reveal>
                <Reveal direction="left" delay={0.2}>
                   <p className="text-xl text-muted-foreground leading-relaxed">
                      Every blade of grass is grown on our private acreage, specifically developed for your climate and soil properties.
                   </p>
                </Reveal>
              </div>
              <Reveal direction="right" delay={0.4}>
                <Link href="/shop" className="bg-primary text-white px-10 py-6 rounded-3xl font-black italic uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl inline-block h-auto">
                   Explore Full Shop
                </Link>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {featuredSods.map((sod, idx) => (
                <Reveal key={sod.id} direction="up" delay={idx * 0.2}>
                  <Card className="rounded-[3rem] overflow-hidden group hover:shadow-2xl transition-all duration-700 border-none bg-white">
                    <div className="aspect-[4/3] bg-primary/20 relative overflow-hidden">
                       {(sod.image_urls?.[0] ?? sod.image_url) && (
                         <img
                           src={(sod.image_urls?.[0] ?? sod.image_url)!}
                           alt={sod.name}
                           className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                         />
                       )}
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                       {sod.sun_requirement && (
                         <div className="absolute top-6 left-6 bg-secondary text-secondary-foreground px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                           {sod.sun_requirement}
                         </div>
                       )}
                    </div>
                    <CardContent className="p-10 space-y-6">
                      <div>
                        <h3 className="text-3xl font-black text-primary italic uppercase tracking-tighter mb-2">{sod.name}</h3>
                        {sod.description && (
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{sod.description}</p>
                        )}
                      </div>
                      <div className="flex justify-between items-center pt-6 border-t border-muted">
                        <div>
                          <span className="text-3xl font-black text-primary italic uppercase tracking-tighter">${getLowestPricePerSqft(sod.products)}</span>
                          <span className="text-muted-foreground text-[10px] font-black uppercase tracking-widest ml-2">/ SQ. FT.</span>
                        </div>
                        <Link href={`/shop/${sod.id}`}>
                          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-2xl px-6 font-black italic uppercase tracking-widest h-auto">
                             View Specs
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <TestimonialSection />

        {/* Global Impact / Stats */}
        <section className="py-32 bg-primary text-white overflow-hidden relative">
           <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5231236/pexels-photo-5231236.jpeg')] bg-cover bg-center grayscale opacity-10 mix-blend-overlay"></div>
           <div className="container mx-auto px-4 relative z-10 text-center">
              <Reveal direction="up">
                 <h2 className="text-4xl md:text-8xl font-black uppercase italic tracking-tighter mb-20 leading-none">
                    Greening the <span className="text-secondary">Modern Landscape.</span>
                 </h2>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                 {[
                   { label: "Sq Ft Delivered", val: "2.4M+" },
                   { label: "Happy Lawns", val: "5,000+" },
                   { label: "Sod Varieties", val: "12" },
                   { label: "Harvested Today", val: "42,000" }
                 ].map((stat, i) => (
                   <Reveal key={i} direction="up" delay={i * 0.1}>
                      <div className="space-y-4">
                         <p className="text-6xl md:text-8xl font-black text-secondary italic uppercase tracking-tighter">{stat.val}</p>
                         <p className="text-sm font-black uppercase tracking-[0.4em] opacity-40">{stat.label}</p>
                      </div>
                   </Reveal>
                 ))}
              </div>
           </div>
        </section>

        {/* Zip Check Integration */}
        <section className="section-padding bg-white">
           <div className="container mx-auto px-4 max-w-6xl">
              <div className="glass rounded-[4rem] p-12 md:p-24 border-muted overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2"></div>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 items-center">
                    <div className="space-y-8 text-center lg:text-left">
                       <Reveal direction="left">
                          <h2 className="text-5xl md:text-7xl font-black text-primary italic uppercase tracking-tighter leading-none">
                             Delivery <br />
                             <span className="text-glow">Status</span>
                          </h2>
                          <p className="text-xl text-muted-foreground leading-relaxed font-medium pt-4">
                             Enter your delivery code to confirm real-time availability and find your neighborhood&apos;s next harvest window.
                          </p>
                       </Reveal>
                    </div>
                    <Reveal direction="right">
                       <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-muted ring-1 ring-black/5">
                          <ZipCodeCheck />
                       </div>
                    </Reveal>
                 </div>
              </div>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
