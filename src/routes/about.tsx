import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import { BookOpen, Flame, Sparkles, Heart, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Omega Fire Ministry, Montreal" },
      {
        name: "description",
        content:
          "Learn about OFM Montreal — our mission, vision, leadership, and core values.",
      },
      { property: "og:title", content: "About — Omega Fire Ministry, Montreal" },
      {
        property: "og:description",
        content: "OFM Montreal — multi-cultural ministry, mission, vision, and leadership.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      <PageHeader
        title="About Our Ministry"
        subtitle="OFM Montreal — home to a people experiencing great power and great grace."
        crumbs={[{ label: "About" }]}
      />

      <section className="py-20 container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <img
            src="/0011.jpg"
            alt="Omega Fire Ministry Montreal"
            loading="lazy"
            className="rounded-2xl shadow-elegant w-full h-[520px] object-cover"
          />
          <div className="absolute -bottom-6 -right-6 hidden md:flex items-center gap-3 bg-gradient-royal text-white px-6 py-4 rounded-2xl shadow-elegant">
            <Flame className="w-7 h-7 text-gold" />
            <div>
              <div className="font-display text-2xl">Power House</div>
              <div className="text-xs font-serif-cap text-gold">Restoring Destinies</div>
            </div>
          </div>
        </div>
        <div>
          <span className="font-serif-cap text-xs text-gold tracking-[0.2em]">About Us</span>
          <h2 className="font-display text-4xl text-primary mt-3 mb-6">
            Welcome to Omega Fire Ministries
          </h2>
          <p className="text-foreground/80 mb-8 leading-relaxed">
            OFM Montreal, is a Multi-Cultural ministry which is home to a great people
            experiencing great power and great grace, who are witness of the resurrection of
            Jesus Christ.
          </p>
          <div className="border-l-4 border-gold pl-5 py-2 bg-white rounded-r-lg">
            <h3 className="font-serif-cap text-gold text-sm mb-2">Our Vision</h3>
            <p className="text-foreground/80 leading-relaxed">
              To wipe out tears, end afflictions, and restore people back to their destinies
              through the revelation of the Word, the manifestation of Power, and the reality
              of the Holy Spirit.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-8">
          {[
            {
              icon: Flame,
              title: "Our Mission",
              text: "To wipe away tears, end afflictions, and restore people to their destinies through the Word, Power, and the Spirit of God.",
            },
            {
              icon: Sparkles,
              title: "Our Motto",
              text: "Revelation • Manifestation • Reality — the foundation of everything we believe and practice.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="p-10 bg-background rounded-2xl border border-border shadow-sm"
            >
              <span className="grid place-items-center w-14 h-14 rounded-2xl bg-gradient-royal mb-6">
                <Icon className="w-7 h-7 text-gold" />
              </span>
              <h3 className="font-display text-3xl text-primary mb-3">{title}</h3>
              <p className="text-foreground/75 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <span className="font-serif-cap text-xs text-gold tracking-[0.2em]">Leadership</span>
          <h2 className="font-display text-4xl text-primary mt-3">Spiritual Oversight</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Apostle Johnson Suleman",
              role: "General Overseer",
              image: "/apostle.webp",
            },
            {
              name: "Pastor David Edegbe",
              role: "Resident Pastor",
              image: "/009.jpg",
            },
            { name: "Ministry Council", role: "Elders & Deacons" },
          ].map((p) => (
            <div
              key={p.name}
              className="p-8 bg-cream rounded-2xl text-center border border-border"
            >
              {"image" in p && p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="mx-auto mb-5 h-40 w-40 rounded-full object-cover object-top shadow-elegant ring-4 ring-gold/30"
                />
              ) : (
                <span className="grid place-items-center w-20 h-20 rounded-full bg-gradient-royal mx-auto mb-5">
                  <Users className="w-9 h-9 text-gold" />
                </span>
              )}
              <h3 className="font-display text-xl text-primary mb-1">{p.name}</h3>
              <p className="text-sm font-serif-cap text-gold">{p.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-serif-cap text-xs text-gold tracking-[0.2em]">Core Values</span>
            <h2 className="font-display text-4xl text-primary mt-3">Revelation • Manifestation • Reality</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: "Revelation",
                text: "Unveiling the deep mysteries of God's Word into our daily walk.",
              },
              {
                icon: Flame,
                title: "Manifestation",
                text: "The visible demonstration of God's power, signs and wonders.",
              },
              {
                icon: Heart,
                title: "Reality",
                text: "The undeniable presence and reality of the Holy Spirit at work.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="p-8 bg-background rounded-xl border border-border text-center"
              >
                <Icon className="w-8 h-8 text-gold mx-auto mb-4" />
                <p className="font-display text-xl text-primary mb-2">{title}</p>
                <p className="text-sm text-foreground/75 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
