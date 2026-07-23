"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

interface Photo {
  src: string;
  title: string;
  category: string;
}

const galleryPhotos: Photo[] = [
  {
    src: "/assets/premium_samba_wheat.jpg",
    title: "Premium Raw Wheat Grains",
    category: "Grain Sourcing",
  },
  {
    src: "/assets/heritage_grain_measure.jpg",
    title: "Traditional Heritage Grits",
    category: "Heritage",
  },
  {
    src: "/assets/samba_wheat.png",
    title: "Samba Broken Wheat Package",
    category: "Packaging",
  },
  {
    src: "/assets/Founder.jpeg",
    title: "Shri. T. A. Girishkumar Profile",
    category: "Leadership",
  },
];

export default function AboutGallery() {
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);

  return (
    <section id="gallery" className="py-20 bg-white border-b border-border-light overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-16">
          <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
            Visual Gallery
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-text-primary leading-tight">
            Inside Sreelakshmi Agro Industries
          </h2>
          <p className="font-sans text-text-secondary text-base leading-relaxed">
            Take a visual tour through our raw ingredient selection, heritage processes, and executive leadership profiles.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryPhotos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.08 }}
              whileHover={{ y: -5 }}
              onClick={() => setActivePhoto(photo)}
              className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border-light shadow-sm bg-bg-secondary group cursor-pointer"
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-103"
                sizes="(max-width: 640px) 100vw, 300px"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="p-3 bg-white/95 rounded-full text-brand-primary shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 z-10 flex flex-col text-left text-white drop-shadow-md">
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                  {photo.category}
                </span>
                <h3 className="font-serif text-sm font-bold mt-0.5">{photo.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Popup Lightbox overlay */}
        <AnimatePresence>
          {activePhoto && (
            <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
              <div className="absolute inset-0" onClick={() => setActivePhoto(null)} />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-4xl w-full aspect-[3/2] bg-black rounded-xl overflow-hidden shadow-2xl z-10"
              >
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  fill
                  className="object-contain"
                />
                
                {/* Close Button overlay */}
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-6 right-6 p-2.5 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors border border-white/20 focus:outline-none"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Caption Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-6 text-left text-white flex flex-col gap-1">
                  <span className="font-sans text-xs font-bold text-brand-gold uppercase tracking-wider">
                    {activePhoto.category}
                  </span>
                  <h4 className="font-serif text-lg font-bold">{activePhoto.title}</h4>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
