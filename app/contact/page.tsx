"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, MessageSquare, Clock, Globe, CheckCircle2, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const variety = searchParams.get("variety") ?? "";
  const format = searchParams.get("format") ?? "";
  const sqft = searchParams.get("sqft") ?? "";
  const hasQuote = !!(variety || sqft);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const body: Record<string, string> = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      zip: formData.get("zip") as string,
      message: formData.get("message") as string,
    };
    if (variety) body.variety = variety;
    if (format) body.format = format;
    if (sqft) body.sqft = sqft;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? "Failed to send");
      }
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting inquiry:", err);
      alert("There was an error sending your inquiry. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="rounded-[40px] shadow-2xl border-none p-4 md:p-8 bg-white">
      <CardContent className="p-4 md:p-8">
        {!submitted ? (
          <form className="space-y-8" onSubmit={handleSubmit}>

            {/* Quote summary banner */}
            {hasQuote && (
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 space-y-3">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-primary/50">Quote Request</p>
                <div className="flex flex-wrap gap-6">
                  {variety && (
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Variety</p>
                      <p className="text-base font-black text-primary">{variety}</p>
                    </div>
                  )}
                  {format && (
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Format</p>
                      <p className="text-base font-black text-primary">{format}</p>
                    </div>
                  )}
                  {sqft && (
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Coverage Needed</p>
                      <p className="text-base font-black text-primary">{Number(sqft).toLocaleString()} sq ft</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-primary font-bold">Full Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required className="rounded-xl border-muted h-14" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary font-bold">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="john@example.com" required className="rounded-xl border-muted h-14" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-primary font-bold">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" placeholder="(555) 000-0000" required className="rounded-xl border-muted h-14" />
              </div>
              <div className="space-y-4">
                <Label htmlFor="zip" className="text-primary font-bold">Delivery Area Code</Label>
                <Input id="zip" name="zip" placeholder="Enter Code" required className="rounded-xl border-muted h-14" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-primary font-bold">Your Message</Label>
              <Textarea id="message" name="message" placeholder="I'm interested in Bermuda sod for a 2,000 sq ft back yard..." className="rounded-xl border-muted min-h-[150px]" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white py-8 rounded-2xl font-black text-xl italic uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Sending..." : hasQuote ? "Send Quote Request" : "Send Inquiry"}
            </button>
          </form>
        ) : (
          <div className="py-20 text-center space-y-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto shadow-xl shadow-green-500/20">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-4xl font-black text-primary italic uppercase tracking-tighter">
              {hasQuote ? "Quote Request Sent!" : "Inquiry Received!"}
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              {hasQuote
                ? "Our farm team will review your quote and reach out within 24 hours with pricing and a delivery window."
                : "Thanks for reaching out! A farm representative will contact you within 24 hours to discuss your project."
              }
            </p>
            <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-xl">Send Another Message</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pb-24">
        {/* Contact Hero */}
        <section className="bg-primary py-24 text-white overflow-hidden relative">
          <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 space-y-6 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Get In <span className="text-secondary">Touch</span>
              </h1>
              <p className="text-xl opacity-80 leading-relaxed max-w-lg">
                Question about varieties? Need a bulk quote? We're here to help you get the greenest lawn on the block.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-2xl font-bold flex items-center gap-2 h-auto text-lg transition-transform hover:scale-105">
                  <MessageSquare size={20} /> WhatsApp Us
                </Button>
              </div>
            </div>

            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                <Clock className="text-secondary mb-4" size={32} />
                <p className="font-bold text-sm uppercase tracking-widest text-white/50 mb-1">Office Hours</p>
                <p className="text-lg font-bold">5 AM - 4 PM</p>
                <p className="text-xs opacity-60 italic">Mon - Sat</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                <Globe className="text-secondary mb-4" size={32} />
                <p className="font-bold text-sm uppercase tracking-widest text-white/50 mb-1">Service Area</p>
                <p className="text-lg font-bold">Multiple Regions</p>
                <p className="text-xs opacity-60 italic">Check Your Zip</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="container mx-auto px-4 -mt-12 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Suspense fallback={
                <Card className="rounded-[40px] shadow-2xl border-none p-4 md:p-8 bg-white">
                  <CardContent className="p-4 md:p-8">
                    <div className="h-96 animate-pulse bg-muted/30 rounded-2xl" />
                  </CardContent>
                </Card>
              }>
                <ContactForm />
              </Suspense>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-8">
              <Card className="rounded-[40px] shadow-xl border-none bg-muted/30 p-8">
                <CardContent className="p-0 space-y-10">
                  <h3 className="text-2xl font-black text-primary uppercase italic tracking-tighter">Visit the Farm</h3>
                  <div className="space-y-8">
                    <div className="flex gap-4">
                      <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm shrink-0">
                        <Mail size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-primary">Email Us</p>
                        <p className="text-sm text-muted-foreground">contact@freshcutsodfarms.com</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Embed */}
              <div className="aspect-[4/3] rounded-[40px] shadow-xl overflow-hidden relative border-8 border-white bg-slate-100 flex items-center justify-center p-8 text-center group">
                 <div className="space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto">
                       <Truck size={32} />
                    </div>
                    <h3 className="text-xl font-black text-primary uppercase italic">Fast Delivery</h3>
                    <p className="text-sm text-muted-foreground">We harvest fresh at dawn and deliver same-day to ensure your sod arrives in peak condition.</p>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
