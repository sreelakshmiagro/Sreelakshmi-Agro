"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const team = [
  {
    name: "T A Girishkumar",
    role: "Founder & Managing Director",
    image: "/assets/Founder.jpeg",
  },
  {
    name: "Sajitha M V",
    role: "Proprietor",
    image: "/assets/sajitha_m_v.png",
  },
];

interface TeamMemberData {
  name: string;
  designation: string;
  image: string;
}

export default function TeamGrid({ data }: { data?: TeamMemberData[] }) {
  const displayTeam = data && data.length > 0
    ? data.map(m => ({ name: m.name, role: m.designation, image: m.image }))
    : team;

  return (
    <section className="py-20 bg-bg-secondary border-b border-border-light overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-16">
          <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
            Brand Leadership
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-text-primary leading-tight">
            The Team Driving Purity
          </h2>
          <p className="font-sans text-text-secondary text-base leading-relaxed max-w-xl mx-auto">
            Experienced professionals leading food processing, supply management, and quality standards.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {displayTeam.map((member, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-border-light overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full"
              >
                {/* Visual Header (Photo) */}
                <div className="relative w-full aspect-[4/5] bg-bg-secondary flex items-center justify-center overflow-hidden border-b border-border-light shrink-0">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-103"
                    sizes="(max-width: 640px) 100vw, 400px"
                  />
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col flex-grow gap-1.5">
                  <h3 className="font-serif text-lg font-bold text-text-primary group-hover:text-brand-primary transition-colors">
                    {member.name}
                  </h3>
                  <span className="font-sans text-xs font-semibold text-brand-primary uppercase tracking-wider">
                    {member.role}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
