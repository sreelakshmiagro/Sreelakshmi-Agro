import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-bg-secondary min-h-[75vh] flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl border border-border-light shadow-lg max-w-md w-full text-center flex flex-col items-center gap-6">
        
        {/* Warning Icon Badge */}
        <div className="w-16 h-16 rounded-full bg-brand-primary/5 text-brand-primary flex items-center justify-center animate-pulse">
          <AlertCircle className="w-9 h-9" />
        </div>

        {/* Content details */}
        <div className="flex flex-col gap-2">
          <span className="font-sans text-[11px] font-bold text-brand-primary uppercase tracking-widest">
            Error Code: 404
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-text-primary">
            Page Not Found
          </h2>
          <p className="font-sans text-sm text-text-secondary leading-relaxed">
            The page you are looking for might have been moved, deleted, or does not exist. Let's redirect you back.
          </p>
        </div>

        {/* Action Link button */}
        <Link
          href="/"
          className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-sans text-sm font-semibold py-3.5 rounded-md shadow hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <span>Return to Homepage</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

      </div>
    </div>
  );
}
