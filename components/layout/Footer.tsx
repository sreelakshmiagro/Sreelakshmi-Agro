import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageSquare, Facebook, Instagram, Linkedin, Globe } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary border-t border-border-light pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 items-start">
          {/* Column 1: Company Profile */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="relative w-max">
              <Image
                src="/assets/Sreelakshmiagro logo.png"
                alt="Sreelakshmi Agro Industries Logo"
                width={160}
                height={50}
                className="w-auto h-12 object-contain"
              />
            </Link>
            <div className="flex flex-col gap-3 text-sm text-text-secondary">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <span>Sreelakshmi Agro Industries, Methalapadam, Kodungallur, Thrissur District, Pin Code- 680 669, Kerala</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                <a href="tel:+919847997979" className="hover:text-brand-primary transition-colors">
                  +91 9847997979
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                <a href="mailto:sreelakshmi7979@gmail.com" className="hover:text-brand-primary transition-colors">
                  sreelakshmi7979@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-text-primary mb-5 relative pb-2 before:absolute before:bottom-0 before:left-0 before:w-12 before:h-[2px] before:bg-brand-gold">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3 text-sm font-sans text-text-secondary">
              <li>
                <Link href="/about" className="hover:text-brand-primary transition-colors duration-200">
                  About Our Journey
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-brand-primary transition-colors duration-200">
                  Product Catalogue
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-brand-primary transition-colors duration-200">
                  Careers & Openings
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-primary transition-colors duration-200">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/become-distributor" className="hover:text-brand-primary transition-colors duration-200 font-semibold text-brand-primary">
                  Become a Distributor
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Products & Offerings */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-text-primary mb-5 relative pb-2 before:absolute before:bottom-0 before:left-0 before:w-12 before:h-[2px] before:bg-brand-gold">
              Our Products
            </h3>
            <ul className="flex flex-col gap-3 text-sm font-sans text-text-secondary">
              <li>
                <Link href="/products/samba-broken-wheat" className="hover:text-brand-primary transition-colors duration-200 font-medium">
                  Samba Broken Wheat (Flagship)
                </Link>
              </li>
              <li>
                <span className="text-text-tertiary cursor-not-allowed">
                  Organic Crop Inputs (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-text-tertiary cursor-not-allowed">
                  Premium Food Grains (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-text-tertiary cursor-not-allowed">
                  Eco-Fertilizers (Coming Soon)
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Google Map Redirect */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-lg font-semibold text-text-primary mb-5 relative pb-2 before:absolute before:bottom-0 before:left-0 before:w-12 before:h-[2px] before:bg-brand-gold">
              Our Location
            </h3>
            <a
              href="https://maps.app.goo.gl/FmVWS1o1o3imf5RJ7"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-40 rounded-lg overflow-hidden border border-border-light relative bg-bg-tertiary group block"
            >
              <iframe
                title="Sreelakshmi Agro Industries Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15668.687425102573!2d76.2046487!3d10.52825835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ee15edabfcfb%3A0x6b757650f003a277!2sThrissur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, pointerEvents: "none" }}
                allowFullScreen={false}
                loading="lazy"
                className="grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors flex items-center justify-center">
                <span className="bg-white/95 px-3 py-1.5 rounded shadow text-xs font-semibold text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Open Google Maps
                </span>
              </div>
            </a>
          </div>
        </div>

        <div className="h-[1px] bg-border-light my-8" />

        {/* Footer Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-sans text-text-secondary">
          <p>© {currentYear} Sreelakshmi Agro Industries. All rights reserved.</p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/sreelakshmi_agro_inds"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white rounded-full border border-border-light hover:border-brand-primary hover:text-brand-primary transition-all duration-300 shadow-sm"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-brand-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-brand-primary transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
