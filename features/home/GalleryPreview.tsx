"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Image as ImageIcon, ArrowRight } from "lucide-react";

const photos = [
  {
    src: "/assets/samba_wheat.png",
    title: "Flagship Samba Wheat",
    category: "Products",
  },
  {
    src: "/assets/Founder.jpeg",
    title: "T A Girishkumar Profile",
    category: "Leadership",
  },
  {
    initials: "MFG",
    title: "Processing Plant Floor",
    category: "Manufacturing",
    gradient: "from-brand-primary/10 to-brand-brown/20",
  },
  {
    initials: "PKG",
    title: "Hygienic Clean Room",
    category: "Packaging",
    gradient: "from-brand-gold/10 to-brand-cream/35",
  },
];

export default function GalleryPreview() {
  return (
    <section className="py-20 bg-white border-b border-border-light overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3 max-w-2xl text-left">
            <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
              Visual Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-text-primary leading-tight">
              Sreelakshmi Agro Gallery Preview
            </h2>
            <p className="font-sans text-text-secondary text-base leading-relaxed">
              Explore photographs from our processing silos, laboratory testing, and modern parboiling facilities.
            </p>
          </div>
          <Link
            href="/about#gallery"
            className="border border-border-light hover:border-brand-primary text-text-secondary hover:text-brand-primary font-sans text-sm font-semibold px-6 py-3 rounded-md transition-all duration-300 shadow-sm flex items-center gap-2 shrink-0 h-max w-max"
          >
            <span>Explore Full Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photos.map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className="relative aspect-square rounded-xl overflow-hidden border border-border-light shadow-sm bg-bg-secondary flex flex-col justify-end p-6 group cursor-pointer"
              >
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-103"
                    sizes="(max-width: 640px) 100vw, 300px"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-tr ${item.gradient} flex items-center justify-center`}>
                    <span className="font-serif text-4xl font-bold text-brand-primary/20 group-hover:text-brand-primary/40 transition-colors">
                      {item.initials}
                    </span>
                  </div>
                )}
                
                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Caption info */}
                <div className="relative z-10 flex flex-col gap-1 text-left text-white">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-base font-bold">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
