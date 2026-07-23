"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { useDistributorModal } from "@/store/useDistributorModal";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Recipes", href: "/recipes" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const pathname = usePathname();
  const openModal = useDistributorModal((state) => state.openModal);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // 1. Shrink scale trigger
      if (currentScroll > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Hide on scroll down, show on scroll up
      if (currentScroll > lastScrollYRef.current && currentScroll > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollYRef.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav when link changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -110 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 py-4"
    >
      <div
        className={`max-w-[1280px] w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] xl:w-full mx-auto px-6 md:px-8 flex items-center justify-between transition-all duration-300 rounded-full border bg-white/95 backdrop-blur-md ${
          isScrolled
            ? "border-[#EFE9E0] shadow-md py-2.5"
            : "border-transparent shadow-sm py-4"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="relative flex items-center gap-2 group shrink-0">
          <Image
            src="/assets/Sreelakshmiagro logo.png"
            alt="Sreelakshmi Agro Industries Logo"
            width={160}
            height={50}
            className="w-auto h-9 object-contain transition-transform duration-300 group-hover:scale-102"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative font-sans text-[13px] font-bold uppercase tracking-wider transition-colors duration-200 py-1 text-[#70655F] hover:text-[#7E1A25] group"
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#DF9820] origin-left transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action CTAs */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <a
            href="https://wa.me/919847997979"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-text-secondary hover:text-brand-primary transition-colors duration-200"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-600/10" />
          </a>
          <a
            href="tel:+919847997979"
            className="p-1.5 text-text-secondary hover:text-brand-primary transition-colors duration-200"
            title="Call Us"
            aria-label="Call Us"
          >
            <Phone className="w-4 h-4 text-[#7E1A25]" />
          </a>
          <button
            onClick={openModal}
            className="bg-[#7E1A25] hover:bg-[#9D222B] text-white font-sans text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-300 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-brand-gold"
          >
            Become a Partner
          </button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-text-primary focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden absolute top-[100%] left-0 right-0 bg-white border-b border-border-light shadow-lg flex flex-col py-6 px-6 gap-6"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-sans text-base font-semibold transition-colors duration-200 ${
                      isActive ? "text-brand-primary" : "text-text-secondary"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="h-[1px] bg-border-light" />

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-6 justify-center">
                <a
                  href="https://wa.me/919847997979"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-[#70655F] hover:text-[#7E1A25] transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
                <div className="w-[1px] h-4 bg-border-light" />
                <a
                  href="tel:+919847997979"
                  className="flex items-center gap-2 text-sm font-medium text-[#70655F] hover:text-[#7E1A25] transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#7E1A25]" />
                  <span>Call Sales</span>
                </a>
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  openModal();
                }}
                className="w-full text-center bg-[#7E1A25] text-white font-sans text-base font-medium py-3 rounded-full hover:bg-[#9D222B] transition-all duration-300 shadow"
              >
                Become a Partner
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
