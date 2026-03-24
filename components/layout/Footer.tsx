import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h3 className="text-xl font-bold tracking-tight">FRESH CUT <span className="text-secondary">SOD</span></h3>
          <p className="text-primary-foreground/80 text-sm leading-relaxed">
            Direct from the farm to your lawn. We specialize in high-performance turfgrass harvested at dawn and delivered fresh to your door.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-secondary transition-colors"><Facebook size={20} /></Link>
            <Link href="#" className="hover:text-secondary transition-colors"><Instagram size={20} /></Link>
            <Link href="#" className="hover:text-secondary transition-colors"><Twitter size={20} /></Link>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li><Link href="/shop" className="hover:text-secondary transition-colors">Sod Varieties</Link></li>
            <li><Link href="/testimonials" className="hover:text-secondary transition-colors">Testimonials</Link></li>
            <li><Link href="/about" className="hover:text-secondary transition-colors">Farm Story</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Support</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li><Link href="/shipping" className="hover:text-secondary transition-colors">Delivery Info</Link></li>
            <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-secondary transition-colors">FAQs</Link></li>
            <li><Link href="/terms" className="hover:text-secondary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm text-primary-foreground/80">
            <li className="flex items-center gap-3">
              <Mail size={18} className="shrink-0 text-secondary" />
              <span>contact@freshcutsodfarms.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/60">
        <p>&copy; {new Date().getFullYear()} Fresh Cut Sod Farm. All rights reserved.</p>
      </div>
    </footer>
  );
}
