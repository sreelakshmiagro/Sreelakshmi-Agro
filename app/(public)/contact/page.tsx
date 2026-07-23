import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ContactForm from "@/features/contact/ContactForm";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";

const GoogleMap = dynamic(() => import("@/components/common/GoogleMap"), {
  loading: () => (
    <div className="w-full h-full bg-bg-tertiary animate-pulse flex items-center justify-center font-sans text-sm text-text-tertiary">
      Loading Location Map...
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Sreelakshmi Agro Industries. Reach out for sales, product inquiries, distributor partnerships, or careers.",
  keywords: ["Contact Sreelakshmi Agro", "Agro Industries Phone", "Harvest Valley Address", "Sreelakshmi Email"],
  alternates: {
    canonical: "https://sreelakshmiagro.com/contact",
  },
};

const contacts = [
  {
    icon: Phone,
    title: "Call Us Today",
    desc: "For general inquiries, distributor opportunities, and immediate support.",
    actionText: "+91 9847997979",
    href: "tel:+919847997979",
  },
  {
    icon: Mail,
    title: "Email Support",
    desc: "Send us a detailed proposal or quality query. We read every email.",
    actionText: "sreelakshmi7979@gmail.com",
    href: "mailto:sreelakshmi7979@gmail.com",
  },
  {
    icon: Clock,
    title: "Working Hours",
    desc: "We are available online and offline during these times.",
    actionText: "Mon - Sat: 9:00 AM - 6:00 PM",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="bg-bg-secondary min-h-screen">
      
      {/* Section 1: Hero */}
      <section className="bg-gradient-to-b from-brand-primary/5 via-transparent to-transparent pt-16 pb-12 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
          <div className="max-w-3xl mx-auto flex flex-col gap-4 items-center">
            <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
              Get In Touch
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-text-primary leading-tight">
              Contact Sreelakshmi Agro
            </h1>
            <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed">
              Have questions about our Samba Broken Wheat, bulk pricing, or distributor applications? Our team is here to assist.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Contact Info cards & Form */}
      <section className="pb-20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact details & Map */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              {contacts.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-white p-5 rounded-xl border border-border-light flex gap-4 shadow-sm"
                  >
                    <div className="p-3 bg-brand-primary/5 text-brand-primary rounded-lg shrink-0 w-max h-max">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-serif text-base font-bold text-text-primary">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
                        {item.desc}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-sans text-sm font-semibold text-brand-primary hover:underline mt-1 w-max"
                        >
                          {item.actionText}
                        </a>
                      ) : (
                        <span className="font-sans text-sm font-semibold text-text-primary mt-1">
                          {item.actionText}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Corporate Location Details */}
            <div className="bg-white p-6 rounded-xl border border-border-light shadow-sm flex flex-col gap-4">
              <div className="flex gap-4 items-start">
                <MapPin className="w-6 h-6 text-brand-primary shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <h3 className="font-serif text-base font-bold text-text-primary">Office</h3>
                  <p className="font-sans text-sm text-text-secondary leading-relaxed">
                    Sreelakshmi Agro Industries, Methalapadam, Kodungallur, Thrissur District, Pin Code- 680 669, Kerala
                  </p>
                </div>
              </div>
              
              {/* WhatsApp direct CTA */}
              <a
                href="https://wa.me/919847997979"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-emerald-500 hover:bg-emerald-500 hover:text-white text-emerald-600 font-sans text-sm font-semibold py-3 rounded-md transition-all duration-300 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 fill-current/10" />
                <span>Chat Instantly via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Ingestion Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </section>

      {/* Section 3: Maps Frame */}
      <section className="py-12 bg-white border-t border-border-light/60">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="w-full h-96 rounded-xl overflow-hidden border border-border-light shadow-inner bg-bg-tertiary">
            <GoogleMap />
          </div>
        </div>
      </section>
      
    </div>
  );
}
