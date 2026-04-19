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
    text: "The 'Cut at Dawn' promise isn't just marketing. The hydration levels in their Bermuda are significantly higher than any big-box supplier. My clients' lawns establish 30% faster. We've used them for over 50 residential projects this year and the quality is consistently world-class.",
    rating: 5,
    tag: "Landscaping Pros",
    date: "2026-03-10"
  },
  {
    name: "Sarah Jenkins",
    role: "Homeowner",
    text: "I was worried about ordering sod online for our new home, but the process was seamless. The calculator was spot on, and the delivery team placed the pallets exactly where I needed them. The grass was vibrant green and felt cool to the touch even in the summer heat.",
    rating: 5,
    tag: "Residential",
    date: "2026-02-24"
  },
  {
    name: "David Chen",
    role: "Landlord",
    text: "I manage several rental properties and curb appeal is everything for attracting good tenants. FreshCut Sod Farms delivers consistent quality every time, and the sod establishes fast even with minimal irrigation.",
    rating: 5,
    tag: "Residential",
    date: "2025-09-15"
  },
  {
    name: "Michael Rossi",
    role: "Homeowner",
    text: "Switched my whole front yard to their Zoysia. It's like walking on a carpet. The delivery was exactly at 9:30 AM as promised. Highly recommend for anyone who cares about their curb appeal.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-01"
  },
  {
    name: "Amanda Smith",
    role: "Landscape Architect",
    text: "I specify FreshCut Sod Farms for all my premium projects. Their attention to soil compatibility is unmatched. It makes my job so much easier when the product establishes this reliably.",
    rating: 5,
    tag: "Landscaping Pros",
    date: "2026-01-20"
  },
  {
    name: "James Wilson",
    role: "Landlord",
    text: "I own five rental homes and FreshCut has become my go-to supplier. Needed 40 pallets on short notice for a property turnover and they came through perfectly — not a single dead patch.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-15"
  },
  {
    name: "Elena Rodriguez",
    role: "Homeowner",
    text: "The St. Augustine CitraBlue is stunning. My neighbors keep asking what my secret is. It handles the shade under my oak trees much better than what we had before.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-22"
  },
  {
    name: "Marcus Thorne",
    role: "Commercial Landscaper",
    text: "The pallet quality is the best I've seen in 20 years. Uniform thickness makes installation twice as fast. Their customer service team actually knows their grass varieties.",
    rating: 5,
    tag: "Landscaping Pros",
    date: "2026-03-08"
  },
  {
    name: "Linda Gross",
    role: "Landlord",
    text: "Between tenant turnovers I always refresh the lawn. FreshCut makes it easy to order exactly what I need without overspending. My tenants always comment on how nice the yard looks when they move in.",
    rating: 5,
    tag: "Residential",
    date: "2026-02-28"
  },
  {
    name: "Kevin Park",
    role: "Homeowner",
    text: "Great experience from start to finish. The website was easy to use, and the grass arrived smelling fresh and looking incredibly healthy. It's been 2 months and it looks like a fairway.",
    rating: 5,
    tag: "Residential",
    date: "2026-01-15"
  },
  {
    name: "Sophia Martinez",
    role: "Homeowner",
    text: "We renovated our entire backyard and the sod was the finishing touch. The emerald green tied everything together. Neighbors have been stopping to ask who did our lawn.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-18"
  },
  {
    name: "Tyler Charles",
    role: "Landlord",
    text: "First impressions matter when you're renting out a property. A fresh lawn between tenants makes the home show better and rent faster. FreshCut has been reliable every single time.",
    rating: 5,
    tag: "Residential",
    date: "2026-02-10"
  },
  {
    name: "Rachel Green",
    role: "First-time Homeowner",
    text: "I was intimidated by the idea of laying sod myself, but their guides and the quality of the product made it a breeze. My backyard went from dirt to paradise in one weekend.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-05"
  },
  {
    name: "Brian O'Conner",
    role: "Landscape Maintenance",
    text: "Better grass means fewer callbacks for me. Their sod is virtually weed-free, which saves my team hours of post-install maintenance. Highly recommended for pros.",
    rating: 5,
    tag: "Landscaping Pros",
    date: "2026-03-20"
  },
  {
    name: "Nancy Pellegrino",
    role: "Landlord",
    text: "I own three properties in South Florida and the lawns always take a beating. FreshCut's sod holds up through heavy foot traffic better than anything else I've tried.",
    rating: 5,
    tag: "Residential",
    date: "2025-11-20"
  },
  {
    name: "Greg Harrison",
    role: "Homeowner",
    text: "We wanted the backyard ready before summer so the kids would have somewhere to play. They delivered ahead of schedule and the grass was perfect. Still looks brand new two months later.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-14"
  },
  {
    name: "Lisa Simmons",
    role: "Homeowner",
    text: "We went with their drought-resistant Bermuda after dealing with high water bills. It's been a game changer — looks great and our irrigation costs dropped noticeably.",
    rating: 5,
    tag: "Residential",
    date: "2026-02-05"
  },
  {
    name: "Walter Briggs",
    role: "Homeowner",
    text: "Did a full front yard replacement after a rough winter. The sod arrived in great condition, installation went smoothly, and it took root fast. Thick and even all the way through.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-11"
  },
  {
    name: "Anthony Mercer",
    role: "Homeowner",
    text: "Set up an automatic irrigation system and paired it with their Zoysia. Yard basically takes care of itself now. Beautiful, resilient grass that looks great year round.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-23"
  },
  {
    name: "Diana Pryor",
    role: "Homeowner",
    text: "We wanted a classic, timeless look for our front yard. Their Floratam St. Augustine delivered exactly that — thick, even, and lush. Exceptional service from quote to delivery.",
    rating: 5,
    tag: "Residential",
    date: "2026-01-30"
  },
  {
    name: "Arthur Perry",
    role: "Landlord",
    text: "I manage a rental duplex and needed something tough that tenants' kids could play on without destroying it. The Bermuda has held up great all season without needing constant care.",
    rating: 5,
    tag: "Residential",
    date: "2026-02-15"
  },
  {
    name: "Pete Larson",
    role: "Homeowner",
    text: "My yard photographs beautifully now. I listed my home last month and the realtor said the lawn was one of the best she'd seen in the neighborhood. Made a real difference.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-19"
  },
  {
    name: "Brad Walsh",
    role: "Homeowner",
    text: "Reliability is what matters. We order for our property every couple of years and FreshCut never disappoints. The dark green of their Zoysia is consistently beautiful.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-07"
  },
  {
    name: "Craig Matthews",
    role: "Homeowner",
    text: "Solid, dependable product. It's tough, grows fast, and looks great without constant attention. Exactly what a busy homeowner needs.",
    rating: 5,
    tag: "Residential",
    date: "2026-02-20"
  },
  {
    name: "Steven Aldridge",
    role: "Homeowner",
    text: "Straightforward process, honest people, strong product. They did what they said they would, when they said they would. That's all you can ask for.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-16"
  },
  {
    name: "Natalie Romano",
    role: "Homeowner",
    text: "Delivery was easy to coordinate and the sod looked perfect straight off the pallet. It established quickly and blends in naturally, like it's been there for years.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-03"
  },
  {
    name: "Wendy Maxwell",
    role: "Homeowner",
    text: "The lawn is the first thing people see when they pull up to our house. FreshCut completely transformed our curb appeal. It's like a whole new home from the street.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-21"
  },
  {
    name: "Tom Hensley",
    role: "Homeowner",
    text: "Put in about 1,200 sq ft over a weekend with a couple of friends. Grass was in great shape off the truck and easy to lay. Three weeks later it looks like it's always been there.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-13"
  },
  {
    name: "Logan Lawrence",
    role: "Homeowner",
    text: "They recommended a variety based on my soil and shade conditions and it was the right call. Dense, uniform, green all season — way better than what we'd had before.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-09"
  },
  {
    name: "Stephen Grant",
    role: "Homeowner",
    text: "My wife did all the research and picked FreshCut. I handled the install. We're both very happy with it. The sod was fresh and easy to work with right out of the delivery truck.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-17"
  },
  {
    name: "Oliver Quinn",
    role: "Landlord",
    text: "Used FreshCut twice now for property turnovers. Great value for the quality, delivery was right on time, and the sod grabbed hold quickly even with minimal watering.",
    rating: 5,
    tag: "Residential",
    date: "2026-02-25"
  },
  {
    name: "Carol Daniels",
    role: "Homeowner",
    text: "I travel often for work so I needed something low-maintenance. Their drought-tolerant Zoysia is perfect. My neighbor checks on it once a week and it still looks thick and green.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-04"
  },
  {
    name: "Barry Knowles",
    role: "Homeowner",
    text: "The whole process was fast from start to finish. I measured, requested a quote, got a call the next morning, and had sod delivered two days later. Really well run operation.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-24"
  },
  {
    name: "Marcus DeVane",
    role: "Landlord",
    text: "Managing multiple properties means I need a supplier I can count on. FreshCut is exactly that — professional service, quality product, and a team that actually communicates.",
    rating: 5,
    tag: "Residential",
    date: "2026-03-06"
  },
  {
    name: "Hal Perry",
    role: "Homeowner",
    text: "Good, honest grass. It grows in thick, handles our summers well, and has been worth every bit of the investment. Happy to recommend FreshCut to anyone in the area.",
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
                From luxury estates to championship golf courses, we provide the foundation for the most beautiful landscapes.
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
