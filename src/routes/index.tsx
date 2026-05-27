import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  PlayCircle, Calendar, ArrowRight, Sparkles, Flame, Heart, Users,
} from "lucide-react";
import Layout from "@/components/site/Layout";
import FlashNews from "@/components/site/FlashNews";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Omega Fire Ministry, Montreal — Welcome Home" },
      { name: "description", content: "Welcome to Omega Fire Ministry, Montreal. Join us for worship, deliverance and prophetic encounters." },
      { property: "og:title", content: "Omega Fire Ministry, Montreal" },
      { property: "og:description", content: "A house God has ordained, to wipe away tears and affliction." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const slides = [
  { src: "/event1.jpg" },
  { src: "/event2.jpg" },
  { src: "/event3.jpg" },
  { src: "/event4.png", badge: "Past Event" },
];

function Index() {
  return (
    <Layout>
      <FlashNews />
      <Hero />
      <About />
      <Motto />
      <Events />
      <Sermons />
      <CallToAction />
    </Layout>
  );
}

function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Layer 1: slider backdrop (images + tint only) */}
      <div className="hero-slider-backdrop absolute inset-0 z-0 pointer-events-none">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms] ease-in-out ${
                i === idx ? "scale-100" : "scale-105"
              }`}
              style={{ backgroundImage: `url(${slide.src})` }}
            />
          </div>
        ))}
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-charcoal/30" />
      </div>

      {/* Layer 2: hero copy + controls (always above slider) */}
      <div className="hero-content-layer absolute inset-0 z-20 flex flex-col pt-20">
        {slides[idx]?.badge && (
          <span className="absolute top-28 right-4 lg:right-8 inline-flex items-center gap-1.5 bg-charcoal/80 backdrop-blur text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wide">
            {slides[idx].badge}
          </span>
        )}

        <div className="container mx-auto flex flex-1 items-center px-4 lg:px-8">
          <div className="hero-content-box max-w-xl rounded-xl border border-white/15 bg-charcoal/35 p-4 text-white shadow-elegant backdrop-blur-md animate-fade-in-up sm:max-w-2xl sm:p-5 md:p-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-[0.65rem] font-serif-cap text-gold mb-3 tracking-wider">
              <Flame className="w-3 h-3" /> Power House
            </span>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight mb-3">
              Welcome to <span className="text-gradient-gold">Omega Fire Ministry</span> Montreal
            </h1>
            <p className="text-sm sm:text-base text-white/85 mb-5 max-w-lg leading-relaxed">
              A house GOD has ordained, to wipe away tears and affliction.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <Link
                to="/media/sermons"
                className="inline-flex items-center gap-1.5 bg-gradient-gold text-gold-foreground text-sm font-semibold px-5 py-2 rounded-full shadow-gold hover:scale-[1.04] transition-transform"
              >
                <PlayCircle className="w-4 h-4" /> Watch Sermons
              </Link>
              <a
                href="https://www.youtube.com/@omegafireministriesmontrea4196"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 border border-white/40 text-white text-sm font-semibold px-5 py-2 rounded-full backdrop-blur hover:bg-white/10 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-gold" /> Join Us Live
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2 pb-8">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? "w-10 bg-gold" : "w-4 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative">
          <img
            src="/017.jpg"
            alt="Omega Fire Ministry Montreal sanctuary"
            loading="lazy"
            width={1200}
            height={1200}
            className="rounded-2xl shadow-elegant w-full h-[520px] object-cover"
          />
          <div className="absolute -bottom-6 -right-6 hidden md:flex items-center gap-3 bg-gradient-royal text-white px-6 py-4 rounded-2xl shadow-elegant">
            <Flame className="w-7 h-7 text-gold" />
            <div>
              <div className="font-display text-2xl">Since 2004</div>
              <div className="text-xs font-serif-cap text-gold">Restoring Destinies</div>
            </div>
          </div>
        </div>

        <div>
          <span className="font-serif-cap text-xs text-gold tracking-[0.2em]">About Us</span>
          <h2 className="font-display text-4xl md:text-5xl text-primary mt-3 mb-6">
            Welcome to Omega Fire Ministries
          </h2>
          <p className="text-foreground/80 mb-8 leading-relaxed">
            OFM Montreal, is a Multi-Cultural ministry which is home to a great people
            experiencing great power and great grace, who are witness of the resurrection of
            Jesus Christ.
          </p>
          <div className="border-l-4 border-gold pl-5 py-2 mb-8 bg-white rounded-r-lg">
            <h3 className="font-serif-cap text-gold text-sm mb-2">Our Vision</h3>
            <p className="text-foreground/80">
              To wipe out tears, end afflictions, and restore people back to their destinies
              through the revelation of the Word, the manifestation of Power, and the reality
              of the Holy Spirit.
            </p>
          </div>

          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Learn more about us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const worshipCards = [
  {
    icon: Calendar,
    title: "Life in the Spirit Fasting",
    text: "Our monthly life in the Spirit fasting program holds every 1st - 3rd of the month, from 8:00am - 4:00pm.",
  },
  {
    icon: Heart,
    title: "OFM Montreal Prayer Line",
    text: "OFM Montreal chapter Canada prayer line holds every Monday of the week, from 7:00pm - 8:00pm.",
  },
  {
    icon: Users,
    title: "Omega Women Prayer Fellowship",
    text: "Omega Women prayer fellowship holds every last Saturday of the month, from 9:00am - 10:00am.",
  },
];

function Motto() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <span className="font-serif-cap text-xs text-gold tracking-[0.2em]">Gather With Us</span>
        <h2 className="font-display text-4xl md:text-5xl text-primary mt-3 mb-14">
          Join Us in Worship
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {worshipCards.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="group p-8 bg-cream rounded-2xl border border-border hover:border-gold hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-elegant text-left"
            >
              <span className="grid place-items-center w-14 h-14 rounded-2xl bg-gradient-royal mb-6 group-hover:bg-gradient-gold transition-all">
                <Icon className="w-7 h-7 text-gold group-hover:text-gold-foreground" />
              </span>
              <h3 className="font-display text-2xl text-primary mb-3">{title}</h3>
              <p className="text-foreground/75 leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const events = [
  {
    title: "Monstreal Outpouring 2026",
    date: "June 16th - 17th, 2026 • 09:00 AM & 05:00 PM Daily",
    desc: "Join us for a powerful outpouring of the Spirit in Montreal.",
    img: "/event1.jpg",
    icon: Heart,
    showRegistration: true,
  },
  {
    title: "One Hour Prayer Marathon",
    date: "Every Monday - 07:00PM Prompt",
    desc: "Come prepared and ready to be blessed",
    img: "/event5.jpeg",
    icon: Flame,
  },
  {
    title: "Solution Service",
    date: "Friday, March 6th 2026",
    desc: "An all-night prophetic gathering with the manifestation of God's voice.",
    img: "/event4.png",
    badge: "Past Event",
    icon: Sparkles,
  },
];

function Events() {
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <section className="py-24 bg-cream">
      <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
        <DialogContent className="w-auto max-w-[min(calc(100vw-2rem),300px)] gap-0 border-0 p-4 sm:p-5">
          <DialogTitle className="sr-only">
            Register for Monstreal Outpouring 2026
          </DialogTitle>
          <div className="flex justify-center bg-white rounded-lg p-2">
            <img
              src="/scan.png"
              alt="Monstreal Outpouring 2026 registration scan code"
              className="mx-auto h-auto max-h-[min(65vh,360px)] w-auto max-w-[260px] object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <span className="font-serif-cap text-xs text-gold tracking-[0.2em]">What's Happening</span>
          <h2 className="font-display text-4xl md:text-5xl text-primary mt-3">Upcoming Events</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((e) => (
            <article
              key={e.title}
              className="group overflow-hidden rounded-2xl bg-background shadow-sm hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 border border-border"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={e.img}
                  alt={e.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <span
                  className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    e.badge === "Past Event"
                      ? "bg-charcoal/90 text-white"
                      : "bg-gold text-gold-foreground"
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" /> {e.badge ?? "Event"}
                </span>
              </div>
              <div className="p-7">
                <p className="font-serif-cap text-sm font-medium text-[oklch(0.42_0.12_75)] mb-2">
                  {e.date}
                </p>
                <h3 className="font-display text-2xl text-primary mb-3">{e.title}</h3>
                <p className="text-foreground/75 text-sm mb-5 leading-relaxed">{e.desc}</p>
                {"showRegistration" in e && e.showRegistration ? (
                  <button
                    type="button"
                    onClick={() => setRegisterOpen(true)}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all cursor-pointer"
                  >
                    Register Now <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <Link
                    to="/events"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const sermons = [
  {
    title: "Mid-Year Thanksgiving Service",
    by: "Pastor David Edegbe",
    date: "Sunday July 27th, 2025",
    videoId: "gnLsmWcbyhU",
  },
  {
    title: "Deliverance & Recovery Service Conference Day",
    by: "Pastor David Edegbe",
    date: "",
    videoId: "WJDDbqO_iCw",
  },
  {
    title: "OFM Montreal, Canada - Sunday Service",
    by: "Pastor David Edegbe",
    date: "December 21, 2025",
    videoId: "GjouAHEQy_U",
  },
];

function youtubeThumbnail(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function Sermons() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const activeSermon = sermons.find((s) => s.videoId === activeVideoId);

  return (
    <section className="py-24 bg-background" id="join-live">
      <Dialog
        open={activeVideoId !== null}
        onOpenChange={(open) => !open && setActiveVideoId(null)}
      >
        <DialogContent className="max-w-4xl gap-0 overflow-hidden border-0 p-0 sm:max-w-4xl w-[calc(100vw-2rem)]">
          <DialogTitle className="sr-only">
            {activeSermon?.title ?? "Sermon video"}
          </DialogTitle>
          {activeVideoId && (
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                title={activeSermon?.title ?? "Sermon video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-14">
          <div>
            <span className="font-serif-cap text-xs text-gold tracking-[0.2em]">Word & Power</span>
            <h2 className="font-display text-4xl md:text-5xl text-primary mt-3">Latest Sermons</h2>
          </div>
          <Link to="/media/sermons" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            View all sermons <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {sermons.map((s) => (
            <article key={s.videoId} className="group">
              <button
                type="button"
                onClick={() => setActiveVideoId(s.videoId)}
                className="relative mb-5 block h-64 w-full overflow-hidden rounded-2xl cursor-pointer text-left"
                aria-label={`Watch ${s.title}`}
              >
                <img
                  src={youtubeThumbnail(s.videoId)}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/40 transition-colors group-hover:bg-primary/20" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid place-items-center h-16 w-16 rounded-full bg-gold/95 text-gold-foreground shadow-gold transition-transform group-hover:scale-110">
                    <PlayCircle className="h-8 w-8" />
                  </span>
                </span>
              </button>
              {s.date ? (
                <p className="font-serif-cap text-sm font-medium text-[oklch(0.42_0.12_75)] mb-1">
                  {s.date}
                </p>
              ) : null}
              <h3 className="font-display text-xl text-primary mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> {s.by}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/img1.jpg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-charcoal/85" />
      <div className="relative container mx-auto px-4 lg:px-8 text-center text-white">
        <Sparkles className="w-10 h-10 text-gold mx-auto mb-6" />
        <h2 className="font-display text-4xl md:text-6xl mb-5 max-w-3xl mx-auto leading-tight">
          We'd love to hear from you
        </h2>
        <p className="text-white/85 max-w-2xl mx-auto mb-10 text-lg">
          Whether you're new to our parish, have questions about services, or need directions —
          we're here to help.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 bg-gradient-gold text-gold-foreground font-semibold px-7 py-3.5 rounded-full shadow-gold hover:scale-[1.04] transition-transform"
          >
            Our Resources <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-7 py-3.5 rounded-full backdrop-blur hover:bg-white/10 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
