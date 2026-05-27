import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const linkClass =
  "text-sm font-medium tracking-wide text-foreground/85 hover:text-primary transition-colors";
const activeProps = { className: "text-primary" };
const departmentItems = [
  { to: "/departments#men-department", label: "Men Department" },
  { to: "/departments#women-department", label: "Women Department" },
  { to: "/departments#youth-department", label: "Youth Department" },
  { to: "/departments#children-department", label: "Children Department" },
  { to: "/departments#chior-department", label: "Chior Department" },
  { to: "/departments#intercessor-department", label: "Intercessor Department" },
  { to: "/departments#media-department", label: "Media Department" },
  { to: "/departments#evangelism-department", label: "Evangelism Department" },
  { to: "/departments#sanctuary-department", label: "Sanctuary Department" },
  { to: "/departments#ushering-protocol-department", label: "Ushering & Protocol Department" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Omega Fire Ministry Montreal"
            className="h-12 w-12 object-contain shrink-0"
          />
          <span className="leading-tight">
            <span className="block font-serif-cap text-[0.7rem] text-[oklch(0.48_0.12_75)] tracking-[0.2em]">
              Omega Fire
            </span>
            <span className="block font-display text-base font-semibold text-primary">
              Ministry • Montreal
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/" className={linkClass} activeOptions={{ exact: true }} activeProps={activeProps}>
            Home
          </Link>
          <Link to="/about" className={linkClass} activeProps={activeProps}>
            About
          </Link>
          <Dropdown
            label="Departments"
            items={departmentItems}
          />
          <Dropdown
            label="Media"
            items={[
              { to: "/media/sermons", label: "Sermon" },
              { to: "/media/gallery", label: "Gallery" },
            ]}
          />
          <Link to="/events" className={linkClass} activeProps={activeProps}>
            Events
          </Link>
          <Link to="/contact" className={linkClass} activeProps={activeProps}>
            Contact
          </Link>
          <Link
            to="/donate"
            className="ml-2 inline-flex items-center justify-center rounded-full bg-gradient-gold text-gold-foreground font-semibold px-6 py-2.5 shadow-gold hover:scale-[1.04] transition-transform"
          >
            Donate Now
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          className="lg:hidden p-2 rounded-md text-primary"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <MobileLink to="/" onClick={() => setOpen(false)}>Home</MobileLink>
            <MobileLink to="/about" onClick={() => setOpen(false)}>About</MobileLink>
            <div className="pl-3 border-l-2 border-gold/50 flex flex-col gap-2">
              <span className="text-xs font-serif-cap text-muted-foreground">Departments</span>
              {departmentItems.map((item) => (
                <MobileLink key={item.to} to={item.to} onClick={() => setOpen(false)}>
                  {item.label}
                </MobileLink>
              ))}
            </div>
            <div className="pl-3 border-l-2 border-gold/50 flex flex-col gap-2">
              <span className="text-xs font-serif-cap text-muted-foreground">Media</span>
              <MobileLink to="/media/sermons" onClick={() => setOpen(false)}>Sermon</MobileLink>
              <MobileLink to="/media/gallery" onClick={() => setOpen(false)}>Gallery</MobileLink>
            </div>
            <MobileLink to="/events" onClick={() => setOpen(false)}>Events</MobileLink>
            <MobileLink to="/contact" onClick={() => setOpen(false)}>Contact</MobileLink>
            <Link
              to="/donate"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex justify-center rounded-full bg-gradient-gold text-gold-foreground font-semibold px-6 py-3 shadow-gold"
            >
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Dropdown({
  label,
  items,
}: {
  label: string;
  items: { to: string; label: string }[];
}) {
  return (
    <div className="relative group">
      <button className={`${linkClass} inline-flex items-center gap-1`}>
        {label}
        <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
      </button>
      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="min-w-[200px] rounded-xl border border-border bg-background shadow-elegant overflow-hidden">
          {items.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className="block px-5 py-3 text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {it.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileLink({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="py-2 text-base font-medium text-foreground"
      activeProps={{ className: "text-primary" }}
    >
      {children}
    </Link>
  );
}
