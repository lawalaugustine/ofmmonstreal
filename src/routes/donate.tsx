import { createFileRoute, Link } from "@tanstack/react-router";
import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import { Heart, Sparkles, Send, Mail } from "lucide-react";
import { CHURCH_EMAIL } from "@/lib/site";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Omega Fire Ministries, Montreal" },
      { name: "description", content: "Partner with Omega Fire Ministries Montreal through giving and offerings." },
      { property: "og:url", content: "/donate" },
    ],
    links: [{ rel: "canonical", href: "/donate" }],
  }),
  component: DonatePage,
});

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
          <h2 className="font-display text-3xl text-primary mb-2">Give Today</h2>
          <p className="text-foreground/75 mb-6 leading-relaxed">
            Thank you for partnering with Omega Fire Ministries Montreal. At this time, gifts can
            be sent by Interact Transfer.
          </p>

          <div className="rounded-2xl border-2 border-gold/40 bg-background p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="grid place-items-center h-12 w-12 shrink-0 rounded-xl bg-gradient-royal">
                <Send className="h-6 w-6 text-gold" />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-xl text-primary mb-1">Interact Transfer</h3>
                <p className="text-sm text-foreground/75 mb-4">
                  Send your offering, tithe, or seed to:
                </p>
                <a
                  href={`mailto:${CHURCH_EMAIL}`}
                  className="inline-flex items-center gap-2 break-all font-medium text-primary hover:text-gold transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gold" />
                  {CHURCH_EMAIL}
                </a>
              </div>
            </div>
          </div>

          <ol className="mt-6 space-y-2 text-sm text-foreground/80 list-decimal list-inside">
            <li>Open your banking app and choose Interact Transfer.</li>
            <li>Send to the email address above.</li>
            <li>
              In the message, you may note the purpose (e.g. tithe, offering, vow, or project).
            </li>
          </ol>

          <p className="mt-6 text-sm text-muted-foreground border-t border-border pt-5">
            Additional giving options will be introduced later. For questions, visit our{" "}
            <Link to="/contact" className="text-primary font-medium hover:text-gold transition-colors">
              contact page
            </Link>
            .
          </p>
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
            <h3 className="font-display text-xl text-primary mb-2">Scripture</h3>
            <p className="text-sm text-foreground/75 italic leading-relaxed">
              &ldquo;Give, and it will be given to you. A good measure, pressed down, shaken
              together and running over, will be poured into your lap.&rdquo;
            </p>
            <p className="text-xs text-gold mt-2 font-serif-cap">— Luke 6:38</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
