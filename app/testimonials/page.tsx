"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/shared/Reveal";
import { Star, Quote, ChevronDown, Filter, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

const ALL_TESTIMONIALS = [
  {
    name: "Robert Henderson",
    role: "Professional Landscaper",
    location: "Sarasota, FL",
    text: "The 'Cut at Dawn' promise isn't just marketing. The hydration levels in their Bermuda are significantly higher than any big-box supplier. My clients' lawns establish 30% faster. We've used them for over 50 residential projects this year and the quality is consistently world-class.",
    rating: 5,
    tag: "Landscaping Pros",
    date: "2026-03-10"
  },
  {
    name: "Sarah Jenkins",
    role: "Estate Homeowner",
    location: "Bradenton, FL",
    text: "I was worried about ordering sod online for our new estate, but the process was seamless. The calculator was spot on, and the delivery team placed the pallets exactly where I needed them. The grass was vibrant green and felt cool to the touch even in the Florida heat.",
    rating: 5,
    tag: "Residential",
    date: "2026-02-24"
  },
  {
    name: "David Chen",
    role: "Golf Course Manager",
    location: "Naples, FL",
    text: "Purity and consistency are critical for us. Fresh Cut Sod delivers the highest grade turfgrass with deep root systems that thrive in our local heat. Their specialized loading process prevents the root damage we often see with traditional suppliers.",
    rating: 5,
    tag: "Commercial",
    date: "2025-09-15"
  },
  {
    name: "Michael Rossi",
    role: "Homeowner",
    location: "Venice, FL",
    text: "Switched my whole front yard to their Zoysia. It's like walking on a carpet. The delivery was exactly at 9:30 AM as promised. Highly recommend for anyone who cares about their curb appeal.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-01"
  },
  {
    name: "Amanda Smith",
    role: "Landscape Architect",
    location: "Tampa, FL",
    text: "I specify Fresh Cut Sod for all my premium projects. Their attention to soil compatibility is unmatched. It makes my job so much easier when the product establishes this reliably.",
    rating: 5,
    tag: "Landscaping Pros",
    date: "2026-01-20"
  },
  {
    name: "James Wilson",
    role: "Property Developer",
    location: "Orlando, FL",
    text: "Found our new permanent supplier. We needed 40 units for a new subdivision on short notice and they delivered perfection. Not a single dead patch in the entire shipment.",
    rating: 5,
    tag: "Commercial",
    date: "2026-03-15"
  },
  {
    name: "Elena Rodriguez",
    role: "Homeowner",
    location: "Miami, FL",
    text: "The St. Augustine CitraBlue is stunning. My neighbors keep asking what my secret is. It handles the shade under my oak trees much better than what we had before.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-22"
  },
  {
    name: "Marcus Thorne",
    role: "Commercial Landscaper",
    location: "Jacksonville, FL",
    text: "The pallet quality is the best I've seen in 20 years. Uniform thickness makes installation twice as fast. Their customer service team actually knows their grass varieties.",
    rating: 5,
    tag: "Landscaping Pros",
    date: "2026-03-08"
  },
  {
    name: "Linda Grosse",
    role: "HOA President",
    location: "Palm Beach, FL",
    text: "We revitalized our community common areas with their Celebration Bermuda. The durability under foot traffic is exactly what we needed for the park areas.",
    rating: 5,
    tag: "Commercial",
    date: "2026-02-28"
  },
  {
    name: "Kevin Park",
    role: "Homeowner",
    location: "Fort Myers, FL",
    text: "Great experience from start to finish. The website was easy to use, and the grass arrived smelling fresh and looking incredibly healthy. It's been 2 months and it looks like a fairway.",
    rating: 5,
    tag: "Residential",
    date: "2026-01-15"
  },
  {
    name: "Sophia Martinez",
    role: "Luxury Home Builder",
    location: "Boca Raton, FL",
    text: "In the luxury market, details matter. The emerald green of their Empire Zoysia provides that premium look my clients expect. Consistency is key, and they deliver every time.",
    rating: 5,
    tag: "Landscaping Pros",
    date: "2026-03-18"
  },
  {
    name: "Thomas Wright",
    role: "Sports Field Manager",
    location: "Gainesville, FL",
    text: "High-performance turf for high-performance athletes. The shear strength of their sod is impressive. We've seen significantly fewer divots since switching our practice fields.",
    rating: 5,
    tag: "Commercial",
    date: "2026-02-10"
  },
  {
    name: "Rachel Green",
    role: "First-time Homeowner",
    location: "Clearwater, FL",
    text: "I was intimidated by the idea of laying sod myself, but their guides and the quality of the product made it a breeze. My backyard went from dirt to paradise in one weekend.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-05"
  },
  {
    name: "Brian O'Conner",
    role: "Landscape Maintenance",
    location: "Jupiter, FL",
    text: "Better grass means fewer callbacks for me. Their sod is virtually weed-free, which saves my team hours of post-install maintenance. Highly recommended for pros.",
    rating: 5,
    tag: "Landscaping Pros",
    date: "2026-03-20"
  },
  {
    name: "Nancy Pelosi",
    role: "Estate Manager",
    location: "Key West, FL",
    text: "Logistics to the Keys can be tricky, but they handled it perfectly. The sod arrived fresh despite the long drive and took root immediately in our salty environment.",
    rating: 5,
    tag: "Residential",
    date: "2025-11-20"
  },
  {
    name: "Gregory House",
    role: "Hotel Operations",
    location: "Daytona Beach, FL",
    text: "We needed a quick turnaround for a beachfront event. They provided 15 pallets of salt-tolerant Seashore Paspalum that looked incredible and held up perfectly.",
    rating: 5,
    tag: "Commercial",
    date: "2026-03-14"
  },
  {
    name: "Lisa Simpson",
    role: "Environmental Consultant",
    location: "St. Petersburg, FL",
    text: "Impressed by their sustainable growing practices. The low-water requirements of their drought-resistant varieties align perfectly with our xeriscaping goals.",
    rating: 5,
    tag: "Landscaping Pros",
    date: "2026-02-05"
  },
  {
    name: "Walter White",
    role: "Homeowner",
    location: "Pensacola, FL",
    text: "The chemistry is right. You can tell they put a lot of science into their soil prep. My lawn has never looked more vibrant. It's the best on the block by far.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-11"
  },
  {
    name: "Tony Stark",
    role: "Tech CEO",
    location: "Malibu (Relocated to Orlando), FL",
    text: "Efficiency meets aesthetics. I automated my irrigation system, but the real star is the grass. It's resilient, beautiful, and tech-friendly (if grass can be tech-friendly).",
    rating: 5,
    tag: "Residential",
    date: "2026-03-23"
  },
  {
    name: "Diana Prince",
    role: "Museum Curator",
    location: "Tallahassee, FL",
    text: "We wanted a classic, timeless look for the museum grounds. Their Floratam St. Augustine provided exactly the stately appearance we were aiming for. Exceptional service.",
    rating: 5,
    tag: "Commercial",
    date: "2026-01-30"
  },
  {
    name: "Arthur Curry",
    role: "Aquarium Director",
    location: "Tampa Bay, FL",
    text: "Stands up to high moisture environments better than any other sod we've tried. The root structure is dense and healthy. Perfect for our coastal property.",
    rating: 5,
    tag: "Commercial",
    date: "2026-02-15"
  },
  {
    name: "Peter Parker",
    role: "Freelance Photographer",
    location: "New York (Queens), FL Delivery",
    text: "The colors in their sod are incredible for photography. I did a shoot for a home magazine and the lawn looked so good it didn't even need retouching. Amazing quality.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-19"
  },
  {
    name: "Bruce Wayne",
    role: "Philanthropist",
    location: "Gotham (Manor in Ocala), FL",
    text: "Reliability is paramount. When we order for the estate, we expect the best. Fresh Cut Sod delivers without fail. The dark green hue of their Zoysia is unmatched.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-07"
  },
  {
    name: "Clark Kent",
    role: "Journalist",
    location: "Metropolis (Farm in Lakeland), FL",
    text: "Solid, dependable product. It's tough, grows fast, and looks great without constant attention. Exactly what a busy reporter needs for his home base.",
    rating: 5,
    tag: "Residential",
    date: "2026-02-20"
  },
  {
    name: "Steve Rogers",
    role: "Veteran",
    location: "Brooklyn (Retiring to Melbourne), FL",
    text: "Honest people, honest product. They did what they said they would, when they said they would. The grass is strong and resilient, just like it should be.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-16"
  },
  {
    name: "Natasha Romanoff",
    role: "Private Investigator",
    location: "Hidden Location, FL",
    text: "Discreet and efficient delivery. The sod itself is perfect for a low-profile, high-quality landscape. It established quickly and looks very natural.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-03"
  },
  {
    name: "Wanda Maximoff",
    role: "Interior Designer",
    location: "Westview, FL",
    text: "The lawn is the first 'room' people see. Their sod created a magical transformation of our outdoor space. It's like it appeared out of thin air, but better.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-21"
  },
  {
    name: "Thor Odinson",
    role: "Landscape Hobbyist",
    location: "Asgard (New Asgard, FL)",
    text: "Tough as the gods! This grass survives the Florida sun like it's nothing. Very impressed with the resilience. Truly a product worthy of the highest praise.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-13"
  },
  {
    name: "Loki Laufeyson",
    role: "Architect",
    location: "Varies, FL",
    text: "I appreciate the versatility. I can use their different varieties to create complex, beautiful patterns in my landscape designs. Always high quality, always reliable.",
    rating: 5,
    tag: "Landscaping Pros",
    date: "2026-03-09"
  },
  {
    name: "Stephen Strange",
    role: "Neurosurgeon",
    location: "Greenwich Village (Winter Home in Naples), FL",
    text: "Precision is everything. The way they cut and harvest their sod is clearly superior. The results are aesthetically pleasing and biologically sound. Remarkable.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-17"
  },
  {
    name: "T'Challa",
    role: "Conservationist",
    location: "Wakanda (Conservation Park in Miami), FL",
    text: "Respect for the earth is evident in their sod. The root systems are robust and the grass is vibrant. It's the perfect foundation for our urban greening project.",
    rating: 5,
    tag: "Commercial",
    date: "2026-02-25"
  },
  {
    name: "Carol Danvers",
    role: "Pilot",
    location: "Cocoa Beach, FL",
    text: "Fast delivery, high quality. I'm often away, so I need grass that's tough and low-maintenance. This fit the bill perfectly. Looks great even after a long trip.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-04"
  },
  {
    name: "Barry Allen",
    role: "Forensic Scientist",
    location: "Central City (Lab in Orlando), FL",
    text: "Everything happened so fast! From ordering to delivery, it was a blur of efficiency. The grass is high-quality and took root in record time. Excellent service.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-24"
  },
  {
    name: "Oliver Queen",
    role: "Business Owner",
    location: "Star City (Office in Miami), FL",
    text: "We needed our corporate office to look sharp. Fresh Cut Sod hit the mark perfectly. Professional service and a product that really stands out.",
    rating: 5,
    tag: "Commercial",
    date: "2026-03-06"
  },
  {
    name: "Hal Jordan",
    role: "Test Pilot",
    location: "Coast City (Base in Pensacola), FL",
    text: "Clear and bright green. It's a great product that stands up to the elements. I'm very happy with how it turned out. Definitely worth the investment.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-20"
  }
];

const CATEGORIES = ["All Stories", "Residential", "Commercial", "Landscaping Pros"];

export default function TestimonialsPage() {
  const [activeCategory, setActiveCategory] = useState("All Stories");
  const [sortBy, setSortBy] = useState("Recent");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filteredTestimonials = useMemo(() => {
    let result = [...ALL_TESTIMONIALS];

    // Filter by category
    if (activeCategory !== "All Stories") {
      result = result.filter(t => t.tag === activeCategory);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "Recent") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "Highest Rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

    return result;
  }, [activeCategory, sortBy]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    // Reset hours to compare dates only
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffDays = Math.floor((nowOnly.getTime() - dateOnly.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} Days Ago`;
    if (diffDays < 14) return "1 Week Ago";
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} Weeks Ago`;
    if (diffDays < 60) return "1 Month Ago";
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} Months Ago`;
    if (diffDays < 730) return "1 Year Ago";
    return `${Math.floor(diffDays / 365)} Years Ago`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/10">
      <Navbar />
      <main className="flex-grow pt-32 pb-24">
        {/* Header Section */}
        <section className="container mx-auto px-4 mb-20 text-center">
          <Reveal direction="up">
            <span className="text-secondary font-black uppercase tracking-[0.4em] text-xs mb-6 block">Customer Success</span>
            <h1 className="text-6xl md:text-9xl font-black text-primary italic uppercase tracking-tighter leading-none mb-12">
               Proven <br />
               <span className="text-glow">Results.</span>
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
             <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-medium">
                From luxury estates to championship golf courses, we provide the foundation for Florida&apos;s most beautiful landscapes.
             </p>
          </Reveal>
        </section>

        {/* Filters Sticky Bar */}
        <div className="sticky top-28 z-30 container mx-auto px-4 mb-12">
           <div className="glass px-8 py-4 rounded-3xl flex flex-wrap justify-between items-center gap-4 border-muted">
              <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                 {CATEGORIES.map((cat) => (
                   <button 
                    key={cat} 
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "font-black uppercase text-xs tracking-widest transition-all pb-1 whitespace-nowrap",
                      activeCategory === cat 
                        ? "text-primary border-b-2 border-primary" 
                        : "text-muted-foreground hover:text-primary"
                    )}
                   >
                      {cat}
                   </button>
                 ))}
              </div>
              <div className="relative">
                <button 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 text-primary hover:scale-105 transition-transform"
                >
                   <Filter size={18} />
                   <span className="text-xs font-black uppercase tracking-widest text-primary">Sort By {sortBy}</span>
                   <ChevronDown size={14} className={cn("transition-transform duration-300", isSortOpen && "rotate-180")} />
                </button>

                {isSortOpen && (
                  <div className="absolute top-full right-0 mt-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-primary/10 p-2 min-w-[200px] z-50 animate-in fade-in zoom-in duration-200">
                    {["Recent", "Highest Rating"].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          setIsSortOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-between transition-colors",
                          sortBy === option ? "bg-primary text-white" : "text-primary hover:bg-primary/5"
                        )}
                      >
                        {option}
                        {sortBy === option && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
           </div>
        </div>

        {/* Testimonials Grid */}
        <section className="container mx-auto px-4">
           {filteredTestimonials.length > 0 ? (
             <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {filteredTestimonials.map((t, i) => (
                  <Reveal key={`${t.name}-${i}`} direction="up" delay={i * 0.05}>
                    <Card className="rounded-[3rem] border-none shadow-sm hover:shadow-2xl transition-all duration-700 bg-white break-inside-avoid glass border-white/40">
                      <CardContent className="p-10 space-y-10">
                         <div className="flex justify-between items-start">
                            <div className="flex gap-1">
                               {[...Array(t.rating)].map((_, s) => (
                                 <Star key={s} size={14} className="fill-secondary text-secondary" />
                               ))}
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary/40 italic">{formatDate(t.date)}</span>
                         </div>
                         
                         <div className="relative">
                            <Quote className="absolute -top-6 -left-6 text-primary/5 h-20 w-20 -z-10" />
                            <p className="text-xl font-medium text-foreground leading-relaxed italic">
                               &quot;{t.text}&quot;
                            </p>
                         </div>

                         <div className="flex items-center justify-between pt-10 border-t border-muted">
                            <div className="flex items-center gap-4">
                               <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black italic uppercase">
                                  {t.name[0]}
                               </div>
                               <div>
                                  <h4 className="font-bold text-primary">{t.name}</h4>
                                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{t.role}</p>
                               </div>
                            </div>
                            <span className="bg-primary px-3 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-widest">
                               {t.tag}
                            </span>
                         </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                ))}
             </div>
           ) : (
             <div className="text-center py-20 bg-white/50 rounded-[3rem] border-2 border-dashed border-muted text-muted-foreground font-bold uppercase tracking-widest">
               No testimonials found for this category.
             </div>
           )}
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 mt-32">
           <div className="bg-primary rounded-[5rem] p-16 md:p-32 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 translate-x-1/2"></div>
              <Reveal direction="up">
                 <h2 className="text-4xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-12">
                    Start Your <br />
                    <span className="text-secondary text-glow">Success Story.</span>
                 </h2>
                 <p className="text-xl md:text-2xl opacity-60 max-w-2xl mx-auto mb-16 font-medium">
                    Ready for a professional-grade lawn? Our team is standing by to help you choose the perfect variety for your environment.
                 </p>
                 <div className="flex flex-wrap justify-center gap-8 items-center">
                    <Link href="/shop">
                       <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-12 py-8 rounded-3xl font-black italic uppercase tracking-widest text-xl h-auto shadow-2xl">
                          Explore Shop
                       </Button>
                    </Link>
                    <Link href="/contact" className="text-xl font-black italic uppercase tracking-widest border-b-2 border-white/20 hover:border-white transition-all pb-1">
                       Request A Quote
                    </Link>
                 </div>
              </Reveal>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
