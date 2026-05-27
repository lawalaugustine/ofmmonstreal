import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";
import heroBg from "@/assets/hero-1.jpg";

interface Crumb {
  label: string;
  to?: string;
}

export default function PageHeader({
  title,
  subtitle,
  crumbs,
}: {
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
}) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.15_0.1_305)/0.92] via-[oklch(0.2_0.12_305)/0.85] to-[oklch(0.15_0.1_305)/0.92]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="container relative mx-auto px-4 lg:px-8 text-center text-white animate-fade-in-up">
        <h1 className="font-display text-4xl md:text-6xl font-semibold mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-2xl mx-auto text-white/80 mb-6">{subtitle}</p>
        )}
        <nav className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-sm">
          <Link to="/" className="inline-flex items-center gap-1.5 text-white/90 hover:text-gold transition-colors">
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          {crumbs.map((c, i) => (
            <span key={i} className="inline-flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-gold/80" />
              {c.to ? (
                <Link to={c.to} className="text-white/90 hover:text-gold transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span className="text-gold font-medium">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
