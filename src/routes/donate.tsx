import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import { Heart, CreditCard, Building2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Omega Fire Ministry, Montreal" },
      { name: "description", content: "Partner with Omega Fire Ministry Montreal through giving and offerings." },
      { property: "og:url", content: "/donate" },
    ],
    links: [{ rel: "canonical", href: "/donate" }],
  }),
  component: DonatePage,
});

const amounts = [25, 50, 100, 250, 500, 1000];

function DonatePage() {
  return (
    <Layout>
      <PageHeader
        title="Give & Partner"
        subtitle="Your seed fuels the fire — wiping tears, ending afflictions, restoring destinies."
        crumbs={[{ label: "Donate" }]}
      />

      <section className="py-16 container mx-auto px-4 lg:px-8 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 p-8 bg-cream rounded-2xl border border-border">
          <Heart className="w-8 h-8 text-gold mb-3" />
          <h2 className="font-display text-3xl text-primary mb-2">Choose an Amount</h2>
          <p className="text-foreground/75 mb-6">Every gift, big or small, makes a kingdom impact.</p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {amounts.map((a) => (
              <button key={a} className="py-4 rounded-xl border border-border bg-background hover:border-gold hover:bg-gold/10 font-display text-xl text-primary transition-colors">
                ${a}
              </button>
            ))}
          </div>
          <input
            type="number"
            placeholder="Other amount"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-gold mb-5"
          />
          <button className="w-full inline-flex justify-center items-center gap-2 bg-gradient-gold text-gold-foreground font-semibold py-3.5 rounded-full shadow-gold hover:scale-[1.02] transition-transform">
            <CreditCard className="w-5 h-5" /> Donate Securely
          </button>
        </div>

        <div className="lg:col-span-2 space-y-5">
          <div className="p-7 bg-gradient-royal text-white rounded-2xl">
            <Sparkles className="w-7 h-7 text-gold mb-3" />
            <h3 className="font-display text-2xl mb-2">Why Give?</h3>
            <p className="text-white/85 text-sm leading-relaxed">
              Your partnership funds outreach, missions, deliverance services and the global
              mandate to wipe away tears and restore destinies.
            </p>
          </div>
          <div className="p-7 bg-cream rounded-2xl border border-border">
            <Building2 className="w-7 h-7 text-gold mb-3" />
            <h3 className="font-display text-xl text-primary mb-2">Bank Transfer</h3>
            <p className="text-sm text-foreground/75">
              For bank transfer details, please contact the church office.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
