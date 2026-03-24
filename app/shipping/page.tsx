"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Truck, Calendar, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import ZipCodeCheck from "@/components/shared/ZipCodeCheck";

export default function ShippingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <Navbar />
      <main className="flex-grow">
        {/* Shipping Hero */}
        <section className="bg-primary py-24 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/10 skew-x-12 translate-x-1/2"></div>
           <div className="container mx-auto px-4 relative z-10">
              <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-8">
                 Farm To <span className="text-secondary">Front Door</span>
              </h1>
              <p className="text-xl md:text-2xl opacity-80 max-w-2xl leading-relaxed">
                 We deliver fresh-cut sod directly from our fields to your property within 24 hours of harvest.
              </p>
           </div>
        </section>

        {/* Radius Check */}
        <section className="container mx-auto px-4 -mt-12 relative z-20">
           <Card className="rounded-[40px] shadow-2xl border-none overflow-hidden bg-white">
              <CardContent className="p-8 md:p-16 flex flex-col lg:flex-row gap-16 items-center">
                 <div className="lg:w-1/2 space-y-8">
                    <h2 className="text-3xl md:text-5xl font-black text-primary italic uppercase tracking-tight">Check Your Zone</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                       We ship to several areas. Simply input your zip code to check if your zip code is part of our service area.
                    </p>
                    <div className="p-8 bg-muted/50 rounded-3xl border border-muted">
                       <ZipCodeCheck />
                    </div>
                 </div>
                 <div className="lg:w-1/2 aspect-square rounded-[40px] shadow-xl overflow-hidden relative border-8 border-muted bg-slate-100 flex items-center justify-center p-12 text-center group">
                    <div className="space-y-6">
                       <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto">
                          <Truck size={40} />
                       </div>
                       <h3 className="text-2xl font-black text-primary uppercase italic">Ready For Arrival</h3>
                       <p className="text-muted-foreground">Our fleet is equipped with specialized forklifts to ensure precision placement on your property.</p>
                    </div>
                 </div>
              </CardContent>
           </Card>
        </section>

        {/* Delivery Timeline */}
        <section className="py-24">
           <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-5xl font-black text-center mb-16 text-primary italic uppercase tracking-tight">The Harvest Timeline</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                 {[
                   { time: "4:00 PM", stage: "Order Cutoff", desc: "All next-day delivery orders must be finalized by 4 PM." },
                   { time: "5:00 AM", stage: "Dawn Harvest", desc: "Our team begins cutting sod while moisture levels are peak." },
                   { time: "8:00 AM", stage: "Load & Go", desc: "Trucks are loaded immediately to ensure zero moisture loss." },
                   { time: "10:00 AM+", stage: "Delivery", desc: "Arrival at your site, ready for immediate installation." }
                 ].map((step, idx) => (
                   <div key={idx} className="relative group">
                      <div className="h-full bg-white p-8 rounded-3xl shadow-sm border border-black/5 group-hover:shadow-xl transition-shadow">
                         <p className="text-secondary font-black text-xs uppercase tracking-widest mb-2">{step.time}</p>
                         <h3 className="text-xl font-bold text-primary mb-4">{step.stage}</h3>
                         <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Delivery Details */}
        <section className="bg-primary py-24 text-white">
           <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-12">
                 <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">What to <span className="text-secondary">Expect</span></h2>
                 <div className="space-y-8">
                    {[
                      { icon: <Truck />, title: "Forklift On-Board", desc: "Our trucks carry their own forklift to place sod exactly where you need it." },
                      { icon: <ShieldCheck />, title: "Curbside Standard", desc: "Standard delivery is curbside or driveway. Back yard delivery depends on accessibility." },
                      { icon: <Calendar />, title: "Weather Prepared", desc: "We harvest rain or shine, but extreme storms may delay delivery for safety." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-6 items-start">
                         <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center text-secondary shrink-0">
                            {item.icon}
                         </div>
                         <div>
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="opacity-70 leading-relaxed">{item.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="space-y-8">
                 <Card className="bg-secondary p-12 rounded-[40px] border-none text-secondary-foreground shadow-2xl">
                    <CardContent className="p-0 space-y-8">
                       <h3 className="text-3xl font-black italic uppercase tracking-tighter">Delivery Fees</h3>
                       <div className="space-y-4">
                           <div className="flex justify-between items-center border-b border-black/10 pb-4">
                              <p className="font-bold">Local Delivery</p>
                              <p className="font-black">$125.00</p>
                           </div>
                           <div className="flex justify-between items-center border-b border-black/10 pb-4">
                              <p className="font-bold">Extended Delivery</p>
                              <p className="font-black">$175.00</p>
                           </div>
                          <div className="flex justify-between items-center">
                             <p className="font-bold">4+ Pallets</p>
                             <p className="font-black text-primary uppercase">FREE</p>
                          </div>
                       </div>
                       <Link href="/shop" className="w-full">
                         <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white py-8 rounded-2xl font-black text-lg italic uppercase tracking-widest h-auto">
                            Go To Shop
                         </Button>
                       </Link>
                    </CardContent>
                 </Card>
                 <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 flex items-center justify-between">
                    <div>
                       <p className="font-bold text-white/50 text-xs uppercase tracking-widest mb-1">Need special routing?</p>
                       <p className="text-lg font-bold">Contact our dispatch</p>
                    </div>
                    <Link href="/contact">
                      <Button variant="outline" className="border-white text-white hover:bg-white/10 rounded-xl">
                        Inquire Now
                      </Button>
                    </Link>
                 </div>
              </div>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
