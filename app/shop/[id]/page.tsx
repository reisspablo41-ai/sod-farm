"use client";

import { use, useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SodCalculator from "@/components/shared/SodCalculator";
import { Truck, Sun, Droplets, Calendar, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

type Product = {
  id: string;
  format: string;
  sq_ft_coverage: number;
  price: number;
  weight_lbs: number | null;
  is_available: boolean;
};

type GrassType = {
  id: string;
  name: string;
  description: string | null;
  sun_requirement: string | null;
  image_url: string | null;
  image_urls: string[];
  products: Product[];
};

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [grassType, setGrassType] = useState<GrassType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/grass-types/${id}`)
      .then(r => {
        if (!r.ok) { setNotFound(true); return null; }
        return r.json();
      })
      .then((data: GrassType | null) => {
        if (!data) return;
        setGrassType(data);
        const firstAvailable = data.products.find(p => p.is_available) ?? null;
        setSelectedProduct(firstAvailable);
        const images = data.image_urls?.length ? data.image_urls : data.image_url ? [data.image_url] : [];
        setActiveImage(images[0] ?? null);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-12 lg:py-20 bg-muted/20 flex items-center justify-center">
          <p className="text-muted-foreground font-medium animate-pulse">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !grassType) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow py-12 lg:py-20 bg-muted/20 flex items-center justify-center flex-col gap-4">
          <p className="text-2xl font-black text-primary italic uppercase">Variety Not Found</p>
          <Link href="/shop" className="text-sm font-bold text-primary hover:underline uppercase tracking-widest">
            &larr; Back to Shop
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const availableProducts = grassType.products.filter(p => p.is_available);
  const lowestPricePerSqft = availableProducts.length > 0
    ? Math.min(...availableProducts.map(p => p.price / p.sq_ft_coverage)).toFixed(2)
    : null;
  const allImages = grassType.image_urls?.length
    ? grassType.image_urls
    : grassType.image_url ? [grassType.image_url] : [];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12 lg:py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <Link href="/shop" className="text-sm font-bold text-primary hover:underline mb-8 block uppercase tracking-widest">
            &larr; Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Gallery Section */}
            <div className="space-y-6">
              {/* Main image */}
              <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-2xl border-8 border-white group relative">
                {activeImage ? (
                  <img
                    src={activeImage}
                    alt={grassType.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-black text-4xl italic opacity-20 uppercase tracking-tighter">{grassType.name}</span>
                  </div>
                )}
                <div className="absolute top-6 left-6 flex flex-col gap-3">
                  <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">Top Choice</span>
                  <span className="bg-white/90 backdrop-blur text-primary px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg border">Local Farm Fresh</span>
                </div>
              </div>

              {/* Thumbnails — only shown when there are multiple images */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className={`aspect-square rounded-2xl overflow-hidden border-4 transition-all ${activeImage === img ? "border-primary shadow-lg scale-105" : "border-white shadow-md hover:border-primary/40 hover:scale-105"}`}
                    >
                      <img src={img} alt={`${grassType.name} view ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-black/5">
                <h3 className="text-lg font-black mb-6 uppercase tracking-tight flex items-center gap-2">
                  <Calendar size={20} className="text-secondary" /> Establishment Timeline
                </h3>
                <div className="space-y-6 relative">
                  <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-muted"></div>
                  {[
                    { days: "Day 1-7", task: "Critical Watering", desc: "Water 2-3 times daily for 15-20 mins each." },
                    { days: "Day 8-14", task: "Root Development", desc: "Reduce frequency to 1 time daily, deep soak." },
                    { days: "Day 15+", task: "First Mow", desc: "Once roots are set, perform your first high-cut mow." }
                  ].map((step, idx) => (
                    <div key={idx} className="relative pl-10">
                      <div className="absolute left-[13px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-white ring-4 ring-primary/10"></div>
                      <p className="text-xs font-black text-secondary uppercase tracking-widest">{step.days}</p>
                      <p className="font-bold text-primary">{step.task}</p>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details & Purchase */}
            <div className="space-y-12">
              <div>
                <h1 className="text-5xl md:text-7xl font-black text-primary leading-none mb-6 italic uppercase tracking-tighter">
                  {grassType.name}
                </h1>
                <div className="flex flex-wrap gap-4 mb-8">
                  {grassType.sun_requirement && (
                    <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-xs font-bold text-muted-foreground uppercase">
                      <Sun size={14} className="text-secondary" /> {grassType.sun_requirement}
                    </div>
                  )}
                  <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-xs font-bold text-muted-foreground uppercase">
                    <ShieldCheck size={14} className="text-secondary" /> Sod Quality A+
                  </div>
                </div>
                {grassType.description && (
                  <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                    {grassType.description}
                  </p>
                )}

                {/* Format selector */}
                {grassType.products.length > 0 && (
                  <div className="border-y py-8 border-black/5 space-y-4">
                    <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-4">Choose a Format</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {grassType.products.map(p => {
                        const isSelected = selectedProduct?.id === p.id;
                        return (
                          <button
                            key={p.id}
                            disabled={!p.is_available}
                            onClick={() => setSelectedProduct(p)}
                            className={`flex items-center justify-between p-4 rounded-2xl border text-left transition-all ${
                              !p.is_available
                                ? "border-muted bg-muted/30 opacity-50 cursor-not-allowed"
                                : isSelected
                                ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                                : "border-primary/10 bg-primary/5 hover:border-primary/40 hover:bg-primary/10"
                            }`}
                          >
                            <div>
                              <p className={`font-black text-sm uppercase tracking-wide ${isSelected ? "text-white" : "text-primary"}`}>{p.format}</p>
                              <p className={`text-xs font-medium ${isSelected ? "text-white/70" : "text-muted-foreground"}`}>
                              {p.sq_ft_coverage.toLocaleString()} sq ft
                              {p.weight_lbs != null && ` · ${p.weight_lbs.toLocaleString()} lbs`}
                            </p>
                            </div>
                            <div className="text-right">
                              <p className={`text-2xl font-black italic ${isSelected ? "text-secondary" : "text-primary"}`}>${Number(p.price).toFixed(2)}</p>
                              <p className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? "text-white/60" : "text-muted-foreground"}`}>
                                ${(p.price / p.sq_ft_coverage).toFixed(3)} / sq ft
                              </p>
                            </div>
                            {!p.is_available && (
                              <span className="ml-3 text-[10px] font-black uppercase tracking-widest text-red-400 bg-red-50 px-2 py-1 rounded-full">Out of Stock</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {lowestPricePerSqft && (
                      <p className="text-xs text-muted-foreground font-medium pt-2">
                        Starting from <span className="font-black text-primary">${lowestPricePerSqft}</span> / sq ft
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-8">
                <SodCalculator product={selectedProduct ?? undefined} grassTypeName={grassType.name} />

                <Card className="border-primary/10 bg-primary/5 rounded-[32px] overflow-hidden">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4 text-primary">Ordering Process</h3>
                    <ul className="space-y-4">
                      {[
                        "Use the calculator above to estimate your needs",
                        "Click 'Request This Sod Quote' to send us your details",
                        "Our farm team will contact you with a final quote",
                        "Pay via Invoice or on Delivery"
                      ].map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm font-medium text-primary/80">
                          <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</div>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex gap-4 items-start bg-primary/5 p-6 rounded-2xl">
                    <Truck className="text-primary shrink-0" size={24} />
                    <div>
                      <p className="font-black text-primary uppercase text-xs tracking-widest mb-1">Dawn-Cut Freshness</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">Harvested 5-9 AM and delivered within hours.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start bg-primary/5 p-6 rounded-2xl">
                    <Droplets className="text-primary shrink-0" size={24} />
                    <div>
                      <p className="font-black text-primary uppercase text-xs tracking-widest mb-1">Hydration Lock</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">Retains maximum moisture for easy rooting.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
