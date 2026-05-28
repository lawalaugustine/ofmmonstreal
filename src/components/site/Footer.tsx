import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin, Mail, Phone } from "lucide-react";
import {
  CHURCH_EMAIL,
  CHURCH_PHONE_DISPLAY,
  CHURCH_PHONE_TEL,
  SERVICE_TIMES,
} from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-[oklch(0.92_0.01_80)] mt-24">
      <div className="container mx-auto px-4 lg:px-8 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
            <span className="grid place-items-center h-14 w-14 shrink-0 rounded-full border border-gold/40 bg-white/5 p-1.5 shadow-gold transition-colors group-hover:border-gold group-hover:bg-white/10">
              <img
                src="/logo.png"
                alt=""
                className="h-full w-full object-contain"
              />
            </span>
            <span className="leading-tight">
              <span className="block font-serif-cap text-[0.65rem] text-gold tracking-[0.2em]">
                Omega Fire
              </span>
              <span className="block font-display text-lg font-semibold text-white group-hover:text-gold transition-colors">
                Ministry • Montreal
              </span>
            </span>
          </Link>
          <p className="text-sm text-[oklch(0.78_0.01_80)] leading-relaxed">
            "Please visit our library at the bookstand, buy and enrich yourself
            mightily, also remember to bless someone with it."
          </p>
        </div>

        <div>
          <h4 className="font-serif-cap text-gold text-sm mb-5">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["/", "Home"],
              ["/about", "About"],
              ["/ministry/men", "Men Ministry"],
              ["/ministry/women", "Women Ministry"],
              ["/media/sermons", "Sermons"],
              ["/events", "Events"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-gold transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif-cap text-gold text-sm mb-5">Service Times</h4>
          <ul className="space-y-3 text-sm">
            {SERVICE_TIMES.map((item) => (
              <li key={item.title}>
                <span className="block font-medium text-white">{item.title}</span>
                <span className="text-[oklch(0.78_0.01_80)]">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif-cap text-gold text-sm mb-5">Get in Touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <span>281 Quinlan Street, Lassale QC, H8R 3W4</span>
            </li>
            <li className="flex gap-3">
              <Mail className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <a href={`mailto:${CHURCH_EMAIL}`} className="hover:text-gold">
                {CHURCH_EMAIL}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <a href={`tel:${CHURCH_PHONE_TEL}`} className="hover:text-gold">
                {CHURCH_PHONE_DISPLAY}
              </a>
            </li>
          </ul>

          <h4 className="font-serif-cap text-gold text-sm mt-6 mb-3">Newsletter</h4>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="Your email"
              className="flex-1 bg-white/10 border border-white/15 rounded-md px-3 py-2 text-sm placeholder:text-white/50 focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="bg-gradient-gold text-gold-foreground font-medium px-4 rounded-md text-sm"
            >
              Join
            </button>
          </form>

          <div className="flex gap-3 mt-5">
            {[
              { Icon: Facebook, href: "https://www.facebook.com/ofmmontreal", label: "Facebook" },
              {
                Icon: Instagram,
                href: "https://www.instagram.com/omegafireministriesmontreal/",
                label: "Instagram",
              },
              { Icon: TikTokIcon, href: "https://www.tiktok.com/@ofmmontreal", label: "TikTok" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="grid place-items-center w-9 h-9 rounded-full border border-white/20 hover:bg-gold hover:text-gold-foreground hover:border-gold transition-colors"
                aria-label={`Visit our ${label} page`}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <p className="text-xs text-[oklch(0.7_0.01_80)] mt-3">
            @Omega Fire Ministry Montreal
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-5 flex flex-col md:flex-row gap-2 items-center justify-between text-xs text-[oklch(0.7_0.01_80)]">
          <p>© {new Date().getFullYear()} Omega Fire Ministry, Montreal. All rights reserved.</p>
          <p>Wiping away tears • Ending afflictions • Restoring destinies</p>
        </div>
      </div>
    </footer>
  );
}

function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.07A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.59a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.02z" />
    </svg>
  );
}
