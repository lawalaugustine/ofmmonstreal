import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Heart, Calendar, Quote, ZoomIn } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const womenGalleryImages = [
  "/women/00001.jpg",
  "/women/0001.jpg",
  "/women/0001111.jpg",
  "/women/000123.jpg",
  "/women/001111.jpg",
  "/women/001114.jpg",
  "/women/00114.jpg",
  "/women/00116.jpg",
  "/women/00118.jpg",
  "/women/00119.jpg",
  "/women/0014.jpg",
  "/women/0022.jpg",
  "/women/0029.jpg",
  "/women/011.jpg",
  "/women/013.jpg",
  "/women/02.jpg",
  "/women/03.jpg",
];

export const Route = createFileRoute("/ministry/women")({
  head: () => ({
    meta: [
      { title: "Women Ministry — Omega Fire Ministries, Montreal" },
      { name: "description", content: "Women Ministry of Omega Fire Ministries Montreal — empowerment, prayer meetings, testimonies and events." },
      { property: "og:title", content: "Women Ministry — Omega Fire Ministries, Montreal" },
      { property: "og:url", content: "/ministry/women" },
    ],
    links: [{ rel: "canonical", href: "/ministry/women" }],
  }),
  component: WomenMinistry,
});

function WomenMinistry() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <Layout>
      <Dialog open={activeImage !== null} onOpenChange={(open) => !open && setActiveImage(null)}>
        <DialogContent className="max-w-5xl gap-0 overflow-hidden border-0 p-2 sm:max-w-5xl w-[calc(100vw-2rem)]">
          <DialogTitle className="sr-only">Women&apos;s Ministry photo</DialogTitle>
          {activeImage && (
            <img
              src={activeImage}
              alt="Women's Ministry gallery enlarged view"
              className="max-h-[85vh] w-full rounded-md object-contain"
            />
          )}
        </DialogContent>
      </Dialog>

      <PageHeader
        title="Women Ministry"
        subtitle="A sisterhood of grace, power and purpose."
        crumbs={[{ label: "Ministries" }, { label: "Women Ministry" }]}
      />

      <section className="py-20 container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <img
          src="/img1.jpg"
          alt="Omega Fire Ministries Montreal Women's Ministry"
          loading="lazy"
          className="rounded-2xl shadow-elegant h-[440px] w-full object-cover order-2 lg:order-1"
        />
        <div className="order-1 lg:order-2">
          <Heart className="w-8 h-8 text-gold mb-4" />
          <h2 className="font-display text-4xl text-primary mb-5">Welcome to Women&apos;s Ministry</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            The Women&apos;s Ministry of Omega Fire Ministries Montreal is a fellowship of women
            committed to growing in faith, prayer, wisdom, and purpose through the Word of God
            and the power of the Holy Spirit.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            We are passionate about building godly women who will positively influence their
            homes, families, communities, and generation while walking fully in their divine
            destinies.
          </p>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-4xl text-primary text-center mb-12">Programs & Meetings</h2>
          <div className="mx-auto max-w-3xl p-10 bg-background rounded-2xl border border-border shadow-sm text-center">
            <Calendar className="w-9 h-9 text-gold mx-auto mb-4" />
            <h3 className="font-display text-2xl text-primary mb-3">Omega Women Prayer Fellowship</h3>
            <p className="text-foreground/80 leading-relaxed">
              Omega Women prayer fellowship holds every last Saturday of the month, from 9:00am - 10:00am.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4 lg:px-8">
        <h2 className="font-display text-4xl text-primary text-center mb-12">Testimonies</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { q: "I came broken; I left whole. The fire of God restored my marriage.", who: "Sister Adaeze" },
            { q: "After years of waiting, God answered. My testimony is permanent!", who: "Sister Marie" },
          ].map((t) => (
            <div key={t.who} className="p-8 bg-cream rounded-2xl border-l-4 border-gold">
              <Quote className="w-8 h-8 text-gold mb-3" />
              <p className="text-foreground/80 italic mb-4 leading-relaxed">"{t.q}"</p>
              <p className="font-serif-cap text-sm text-primary">— {t.who}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {womenGalleryImages.map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveImage(src)}
              className="group relative overflow-hidden rounded-xl cursor-pointer text-left"
              aria-label="View full size photo"
            >
              <img
                src={src}
                alt="Women's Ministry gallery"
                loading="lazy"
                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-primary/0 transition-colors group-hover:bg-primary/35">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gold/95 text-gold-foreground opacity-0 shadow-gold transition-opacity group-hover:opacity-100">
                  <ZoomIn className="h-6 w-6" />
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>
    </Layout>
  );
}
