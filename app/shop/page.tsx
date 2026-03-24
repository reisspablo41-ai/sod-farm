"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, Search, Users, Droplets, ArrowRight } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/shared/Reveal";

type Product = {
  id: string;
  format: string;
  sq_ft_coverage: number;
  price: number;
  is_available: boolean;
};

type GrassType = {
  id: string;
  name: string;
  description: string | null;
  sun_requirement: string | null;
  image_url: string | null;
  image_urls: string[] | null;
  products: Product[];
};

function getLowestPricePerSqft(products: Product[]): string {
  const available = products.filter(p => p.is_available);
  if (!available.length) return "—";
  const prices = available.map(p => p.price / p.sq_ft_coverage);
  return Math.min(...prices).toFixed(2);
}

export default function ShopPage() {
  const [grassTypes, setGrassTypes] = useState<GrassType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sunFilter, setSunFilter] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/grass-types")
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setGrassTypes(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function toggleSun(val: string) {
    setSunFilter(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  }

  const filtered = grassTypes.filter(gt => {
    const matchesSearch = gt.name.toLowerCase().includes(search.toLowerCase());
    const matchesSun = sunFilter.length === 0 || sunFilter.includes(gt.sun_requirement ?? "");
    return matchesSearch && matchesSun;
  });

  return (
    <div className="flex flex-col min-h-screen bg-muted/10">
      <Navbar />
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Shop Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
            <div className="max-w-2xl">
              <Reveal direction="left">
                 <span className="text-secondary font-black uppercase tracking-[0.4em] text-xs mb-6 block">Farm Inventory</span>
                 <h1 className="text-6xl md:text-[9rem] font-black text-primary italic uppercase tracking-tighter leading-[0.85] mb-8">
                    The Sod <br />
                    <span className="text-secondary text-glow">Gallery.</span>
                 </h1>
              </Reveal>
              <Reveal direction="up" delay={0.2}>
                 <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium">
                    Order by 4 PM daily for same-day harvest and regional delivery while roots are still peak active.
                 </p>
              </Reveal>
            </div>

            <Reveal direction="right" delay={0.4} className="w-full lg:w-auto">
               <div className="glass px-8 py-4 rounded-3xl flex items-center gap-6 border-muted w-full">
                  <div className="relative flex-grow lg:w-80">
                    <input
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search varieties..."
                      className="w-full pl-12 h-14 rounded-2xl border-none bg-primary/5 text-primary placeholder:text-primary/30 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={20} />
                  </div>
                  <Button variant="outline" className="h-14 w-14 rounded-2xl border-primary/10 hover:bg-primary hover:text-white transition-all p-0">
                    <Filter size={20} />
                  </Button>
               </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1 space-y-12">
              <Reveal direction="up">
                 <Card className="glass rounded-[3rem] border-white/40 shadow-xl overflow-hidden">
                   <CardContent className="p-10 space-y-12">
                     <div>
                       <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-primary/40 flex items-center gap-4">
                          <span className="h-px w-8 bg-primary/10"></span>
                          Sun Exposure
                       </h3>
                       <div className="space-y-4">
                         {["Full Sun", "Partial Shade", "Mixed Sun", "Shade Tolerant"].map(item => (
                           <label key={item} className="flex items-center gap-4 cursor-pointer group" onClick={() => toggleSun(item)}>
                             <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${sunFilter.includes(item) ? "border-primary bg-primary" : "border-primary/10 group-hover:border-primary"}`}>
                                <div className={`w-2 h-2 rounded-sm bg-white transition-all ${sunFilter.includes(item) ? "opacity-100" : "opacity-0 group-hover:opacity-30"}`}></div>
                             </div>
                             <span className={`text-sm font-bold transition-all ${sunFilter.includes(item) ? "text-primary" : "text-foreground/60 group-hover:text-primary"}`}>{item}</span>
                           </label>
                         ))}
                       </div>
                     </div>

                     <Button
                       onClick={() => setSunFilter([])}
                       className="w-full bg-primary text-white rounded-[2rem] py-8 font-black italic uppercase tracking-widest h-auto shadow-2xl hover:scale-105 transition-all"
                     >
                        Clear Filters
                     </Button>
                   </CardContent>
                 </Card>
              </Reveal>

              {/* Promo Card */}
              <Reveal direction="up" delay={0.2}>
                 <div className="bg-secondary p-12 rounded-[3.5rem] text-secondary-foreground space-y-6 shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                   <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none">FREE <br />DELIVERY</h3>
                   <p className="text-sm font-bold opacity-70 leading-relaxed">On all orders of 4+ pallets within our 50-mile farm radius.</p>
                   <Link href="/shipping" className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-black/5 p-2 pr-4 rounded-full transition-all w-fit">
                     View Zone Map <ArrowRight size={14} />
                   </Link>
                 </div>
              </Reveal>
            </aside>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="rounded-[4rem] bg-muted/30 animate-pulse aspect-[1.2]" />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground font-medium">
                  {grassTypes.length === 0 ? "No products available yet. Check back soon." : "No varieties match your filters."}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {filtered.map((sod, idx) => (
                    <Reveal key={sod.id} direction="up" delay={idx * 0.1}>
                      <Card className="rounded-[4rem] border-none shadow-sm hover:shadow-2xl transition-all duration-700 bg-white group overflow-hidden">
                        <div className="aspect-[1.2] bg-primary/20 relative overflow-hidden">
                           {(sod.image_urls?.[0] ?? sod.image_url) ? (
                             <img
                               src={(sod.image_urls?.[0] ?? sod.image_url)!}
                               alt={sod.name}
                               className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                             />
                           ) : (
                             <div className="absolute inset-0 flex items-center justify-center text-primary/20 font-black text-4xl italic uppercase tracking-tighter">{sod.name}</div>
                           )}
                           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

                           {sod.sun_requirement && (
                             <div className="absolute top-8 left-8 flex gap-3">
                                <span className="glass px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-xl">{sod.sun_requirement}</span>
                             </div>
                           )}

                           <div className="absolute bottom-10 left-10 right-10">
                              <Link href={`/shop/${sod.id}`} className="text-4xl font-black text-white group-hover:text-secondary transition-colors italic uppercase tracking-tighter block mb-4 leading-none">
                                {sod.name}
                              </Link>
                              <div className="flex items-center gap-6 text-white/50 text-[10px] font-black uppercase tracking-[0.2em]">
                                 {sod.products.length > 0 && (
                                   <span className="flex items-center gap-2"><Users size={14} /> {sod.products.length} format{sod.products.length > 1 ? "s" : ""}</span>
                                 )}
                                 {sod.products.some(p => p.is_available) ? (
                                   <span className="flex items-center gap-2 text-green-400"><Droplets size={14} /> In Stock</span>
                                 ) : (
                                   <span className="flex items-center gap-2 text-red-400"><Droplets size={14} /> Out of Stock</span>
                                 )}
                              </div>
                           </div>
                        </div>
                        <CardContent className="p-12 space-y-10">
                          {sod.description && (
                            <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                              {sod.description}
                            </p>
                          )}

                          <div className="flex justify-between items-center pt-8 border-t border-muted">
                            <div>
                              <span className="text-4xl font-black text-primary italic uppercase tracking-tighter">${getLowestPricePerSqft(sod.products)}</span>
                              <span className="text-muted-foreground text-[10px] font-black tracking-widest ml-3 uppercase">/ sq. ft.</span>
                            </div>
                            <Link href={`/shop/${sod.id}`}>
                               <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-[1.5rem] px-10 py-8 font-black italic uppercase tracking-widest text-sm h-auto shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
                                 Select Variety
                               </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
