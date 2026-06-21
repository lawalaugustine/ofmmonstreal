import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Users, Calendar, Image as ImageIcon, Target, ZoomIn } from "lucide-react";

const menGalleryImages = [
  "/men/0009.jpg",
  "/men/01.jpg",
  "/men/012.jpg",
  "/men/014.jpg",
  "/men/015.jpg",
  "/men/00011.jpg",
  "/men/00012.jpg",
  "/men/00014.jpg",
  "/men/0016.jpg",
  "/men/0018.jpg",
];

export const Route = createFileRoute("/ministry/men")({
  head: () => ({
    meta: [
      { title: "Men Ministry — Omega Fire Ministries, Montreal" },
      { name: "description", content: "The Men Ministry of Omega Fire Ministries Montreal: raising kingdom men through fellowship, discipleship and activities." },
      { property: "og:title", content: "Men Ministry — Omega Fire Ministries, Montreal" },
      { property: "og:url", content: "/ministry/men" },
    ],
    links: [{ rel: "canonical", href: "/ministry/men" }],
  }),
  component: MenMinistry,
});

function MenMinistry() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <Layout>
      <Dialog open={activeImage !== null} onOpenChange={(open) => !open && setActiveImage(null)}>
        <DialogContent className="max-w-5xl gap-0 overflow-hidden border-0 p-2 sm:max-w-5xl w-[calc(100vw-2rem)]">
          <DialogTitle className="sr-only">Men&apos;s Ministry photo</DialogTitle>
          {activeImage && (
            <img
              src={activeImage}
              alt="Men's Ministry gallery enlarged view"
              className="max-h-[85vh] w-full rounded-md object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
      <PageHeader
        title="Men Ministry"
        subtitle="Raising Kingdom men — strong in faith, bold in purpose, faithful at home."
        crumbs={[{ label: "Ministries" }, { label: "Men Ministry" }]}
      />

      <section className="py-20 container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Target className="w-8 h-8 text-gold mb-4" />
          <h2 className="font-display text-4xl text-primary mb-5">Welcome to Men&apos;s Ministry</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            The Men&apos;s Ministry of Omega Fire Ministries Montreal is dedicated to raising
            strong, disciplined, and spiritually grounded men who lead with integrity, wisdom,
            and godly character.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            We are committed to building men who stand as pillars in their families,
            communities, workplaces, and the body of Christ—through prayer, leadership,
            fellowship, and the teaching of God&apos;s Word.
          </p>
        </div>
        <img
          src="/men/0009.jpg"
          alt="Omega Fire Ministries Montreal Men&apos;s Ministry"
          loading="lazy"
          className="rounded-2xl shadow-elegant h-[440px] w-full object-cover"
        />
      </section>

      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-4xl text-primary text-center mb-12">Meetings & Program</h2>
          <div className="mx-auto max-w-3xl p-10 bg-background rounded-2xl border border-border shadow-sm text-center">
            <Calendar className="w-9 h-9 text-gold mx-auto mb-4" />
            <h3 className="font-display text-2xl text-primary mb-3">Men of Zion</h3>
            <p className="text-foreground/80 leading-relaxed">
              Men of Zion meeting is held every last Saturday of the month from 8:30pm - 9:30pm.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-4xl text-primary text-center mb-12">Our Activities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Users, t: "Monthly Fellowship", d: "Brotherhood meals, Word & worship." },
              { icon: Calendar, t: "Discipleship Classes", d: "Weekly Bible study for men." },
              { icon: ImageIcon, t: "Outreach & Service", d: "Community impact and church work days." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="p-7 bg-background rounded-2xl border border-border">
                <Icon className="w-8 h-8 text-gold mb-3" />
                <h3 className="font-display text-xl text-primary mb-2">{t}</h3>
                <p className="text-foreground/75 text-sm">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4 lg:px-8">
        <h2 className="font-display text-4xl text-primary text-center mb-10">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {menGalleryImages.map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveImage(src)}
              className="group relative overflow-hidden rounded-xl cursor-pointer text-left"
              aria-label="View full size photo"
            >
              <img
                src={src}
                alt="Men's Ministry gallery"
                loading="lazy"
                className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-primary/0 transition-colors group-hover:bg-primary/35">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-gold/95 text-gold-foreground opacity-0 shadow-gold transition-opacity group-hover:opacity-100">
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
