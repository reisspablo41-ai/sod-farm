"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Truck, Heart, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Reveal from "@/components/shared/Reveal";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/10">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary pt-48 pb-32 text-white relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/5231241/pexels-photo-5231241.jpeg')] bg-cover bg-center grayscale opacity-10 mix-blend-overlay"></div>
           <div className="container mx-auto px-4 relative z-10 text-center">
              <Reveal direction="up">
                 <span className="text-secondary font-black uppercase tracking-[0.4em] text-xs mb-6 block">Our Legacy</span>
                 <h1 className="text-6xl md:text-[9rem] font-black italic uppercase tracking-tighter leading-none mb-12">
                    Three <br />
                    <span className="text-secondary text-glow">Generations.</span>
                 </h1>
              </Reveal>
              <Reveal direction="up" delay={0.2}>
                 <p className="text-xl md:text-3xl opacity-60 max-w-3xl mx-auto leading-relaxed font-medium italic">
                    From a single family acre to a regional leader, our commitment to &quot;Dawn-Cut&quot; quality is the heart of every lawn we grow.
                 </p>
              </Reveal>
           </div>
        </section>

        {/* The Story */}
        <section className="section-padding bg-white relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2"></div>
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
            <div className="space-y-12">
              <Reveal direction="left">
                 <span className="text-secondary font-black uppercase tracking-[0.4em] text-xs mb-4 block">The Mission</span>
                 <h2 className="text-5xl md:text-7xl font-black text-primary italic uppercase tracking-tighter leading-none">
                    Harvesting <br />
                    <span className="text-glow text-primary/50">Excellence.</span>
                 </h2>
              </Reveal>
              
              <Reveal direction="up" delay={0.2}>
                 <div className="space-y-8">
                    <p className="text-xl text-muted-foreground leading-relaxed">
                       FreshCut Sod Farms was founded in 1978 with a simple realization: the best turf doesn&apos;t come from a warehouse. It comes from soil that has been cared for across generations.
                    </p>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                       Originally a small family operation, we&apos;ve expanded our acreage while maintaining the strict quality standards that made us famous. Every pallet is inspected for root density and hydration before it ever touches a truck.
                    </p>
                 </div>
              </Reveal>

              <div className="grid grid-cols-2 gap-8">
                 {[
                   { label: "Acres Cultivated", val: "1,200+" },
                   { label: "Expert Farmers", val: "45+" }
                 ].map((stat, i) => (
                   <Reveal key={i} direction="up" delay={0.4 + (i * 0.1)}>
                      <div className="glass p-10 rounded-[3rem] border-muted shadow-xl">
                         <p className="text-5xl font-black text-primary italic uppercase tracking-tighter mb-2">{stat.val}</p>
                         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">{stat.label}</p>
                      </div>
                   </Reveal>
                 ))}
              </div>
            </div>

            <Reveal direction="right" delay={0.4}>
               <div className="aspect-[4/5] bg-muted rounded-[5rem] overflow-hidden shadow-2xl relative border-[16px] border-white ring-1 ring-black/5 rotate-3 hover:rotate-0 transition-transform duration-700">
                   <img 
                      src="https://images.pexels.com/photos/5231243/pexels-photo-5231243.jpeg" 
                      alt="Miller Family Archives"
                      className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                   />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-12 left-12 right-12">
                     <p className="text-xs font-black text-secondary uppercase tracking-[0.3em] mb-2">Since 1978</p>
                     <h4 className="text-3xl font-black text-white italic uppercase tracking-tighter">Generational Roots</h4>
                  </div>
               </div>
            </Reveal>
          </div>
        </section>

        {/* Core Values */}
        <section className="section-padding bg-primary text-white overflow-hidden relative">
           <div className="container mx-auto px-4">
              <h2 className="text-4xl md:text-8xl font-black text-center mb-24 italic uppercase tracking-tighter">The FreshCut <span className="text-secondary">Pillars</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                {[
                  { 
                    icon: <Leaf size={48} className="text-secondary" />, 
                    title: "Soil Integrity", 
                    desc: "We prioritize soil microbiome health, ensuring your grass arrives with a rich nutrient base for instant root take." 
                  },
                  { 
                    icon: <Truck size={48} className="text-secondary" />, 
                    title: "Hyper-Efficiency", 
                    desc: "Our zero-shelf-time model means your grass is cut, loaded, and delivered within hours, not days." 
                  },
                  { 
                    icon: <Heart size={48} className="text-secondary" />, 
                    title: "Customer Support", 
                    desc: "You aren&apos;t just buying grass; you&apos;re gaining a lifetime partner in lawn care and horticultural expertise." 
                  }
                ].map((item, idx) => (
                  <Reveal key={idx} direction="up" delay={idx * 0.2}>
                    <div className="space-y-8 group">
                      <div className="h-24 w-24 glass rounded-[2rem] flex items-center justify-center border-white/10 group-hover:bg-white group-hover:text-primary transition-all duration-500 shadow-2xl">
                         {item.icon}
                      </div>
                      <h3 className="text-3xl font-black uppercase tracking-tighter italic">{item.title}</h3>
                      <p className="opacity-60 leading-relaxed text-lg font-medium">{item.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
           </div>
        </section>

        {/* Leadership Team */}
        <section className="section-padding bg-white relative overflow-hidden">
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
           <div className="container mx-auto px-4">
              <div className="max-w-3xl mb-24">
                 <Reveal direction="left">
                    <span className="text-secondary font-black uppercase tracking-[0.4em] text-xs mb-4 block">The Guardians</span>
                    <h2 className="text-5xl md:text-7xl font-black text-primary italic uppercase tracking-tighter leading-none mb-8">
                       Leadership <br />
                       <span className="text-glow text-primary/50">At the Helm.</span>
                    </h2>
                 </Reveal>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                 {[
                   { name: "John Miller III", role: "Master Harvester", bio: "Leading our harvest team for over 25 years with a focus on dawn timing.", image: "https://images.pexels.com/photos/5754935/pexels-photo-5754935.jpeg" },
                   { name: "Sarah Miller", role: "Logistics Director", bio: "Architecture background specialized in farm-to-door delivery systems.", image: "https://images.pexels.com/photos/6194969/pexels-photo-6194969.jpeg" },
                   { name: "Mike Evans", role: "Hydration Expert", bio: "Ph.D. in Horticulture, ensuring peak root moisture for every pallet.", image: "https://images.pexels.com/photos/7472470/pexels-photo-7472470.jpeg" },
                   { name: "Dave Roberts", role: "Fleet Captain", bio: "Managing 50+ specialized delivery units across our service regions.", image: "https://images.pexels.com/photos/5231239/pexels-photo-5231239.jpeg" }
                 ].map((member, i) => (
                  <Reveal key={member.name} direction="up" delay={i * 0.1}>
                    <Card className="rounded-[4rem] border-none shadow-xl hover:shadow-2xl transition-all duration-700 bg-muted/20 group overflow-hidden">
                      <div className="aspect-square bg-white relative overflow-hidden">
                          <img 
                             src={member.image} 
                             alt={member.name}
                             className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                          />
                       </div>
                      <CardContent className="p-10 text-center space-y-4">
                         <div>
                            <p className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-2">{member.role}</p>
                            <h3 className="text-2xl font-black text-primary italic uppercase tracking-tighter">{member.name}</h3>
                         </div>
                         <p className="text-xs text-muted-foreground font-bold leading-relaxed">{member.bio}</p>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
              </div>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
