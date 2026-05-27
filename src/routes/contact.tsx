import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import { MapPin, Mail, Phone, Send, Clock, Facebook, Instagram, Search, Loader2 } from "lucide-react";
import {
  CHURCH_EMAIL,
  CHURCH_EMAIL_OFFICE,
  CHURCH_PHONE_DISPLAY,
  CHURCH_PHONE_TEL,
} from "@/lib/site";

const GOOGLE_SEARCH_TERMS = ["Omega Fire Ministries Montreal", "OFM Montreal"];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/ofmmontreal",
    Icon: Facebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/omegafireministriesmontreal/",
    Icon: Instagram,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@ofmmontreal",
    Icon: TikTokIcon,
  },
];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Omega Fire Ministry, Montreal" },
      { name: "description", content: "Get in touch with Omega Fire Ministry Montreal. Visit us, send a message, or reach out on social media." },
      { property: "og:title", content: "Contact — Omega Fire Montreal" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

type FormStatus = "idle" | "submitting" | "sent" | "error";

function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          subject: data.get("subject"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      const result = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !result.ok) {
        setErrorMessage(result.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setErrorMessage("Could not reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <Layout>
      <PageHeader
        title="Contact Us"
        subtitle="We'd love to hear from you — whether you're new or have a prayer request."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="py-16 container mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-3xl text-primary mb-6">Send Us a Message</h2>
          {status === "sent" ? (
            <div className="p-8 bg-cream rounded-2xl border-l-4 border-gold">
              <p className="font-display text-xl text-primary mb-2">Thank you!</p>
              <p className="text-foreground/75">
                We received your message and will reach out soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Full Name" name="name" type="text" required />
                <Field label="Email Address" name="email" type="email" required />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <Field label="Phone Number" name="phone" type="tel" />
                <Field label="Subject" name="subject" type="text" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-serif-cap text-gold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-cream focus:outline-none focus:border-gold"
                />
              </div>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden
              />
              {status === "error" && errorMessage ? (
                <p className="text-sm text-destructive" role="alert">
                  {errorMessage}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2 bg-gradient-gold text-gold-foreground font-semibold px-7 py-3 rounded-full shadow-gold hover:scale-[1.03] transition-transform disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-5">
          <h2 className="font-display text-3xl text-primary mb-2">Reach Us</h2>
          {[
            { icon: MapPin, t: "Address", d: "281 Quinlan Street, Lassale QC, H8R 3W4" },
            {
              icon: Mail,
              t: "Email",
              d: `${CHURCH_EMAIL} · ${CHURCH_EMAIL_OFFICE}`,
              href: `mailto:${CHURCH_EMAIL}`,
            },
            {
              icon: Phone,
              t: "Phone",
              d: CHURCH_PHONE_DISPLAY,
              href: `tel:${CHURCH_PHONE_TEL}`,
            },
            { icon: Clock, t: "Sunday Worship", d: "10:00 AM – 12:30 PM" },
          ].map(({ icon: Icon, t, d, href }) => (
            <div key={t} className="flex gap-4 p-5 rounded-2xl bg-cream border border-border">
              <span className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-royal shrink-0">
                <Icon className="w-5 h-5 text-gold" />
              </span>
              <div>
                <p className="font-serif-cap text-xs text-gold">{t}</p>
                {href ? (
                  <a href={href} className="text-foreground hover:text-primary transition-colors break-all">
                    {d}
                  </a>
                ) : (
                  <p className="text-foreground">{d}</p>
                )}
              </div>
            </div>
          ))}

          <div className="flex gap-4 p-5 rounded-2xl bg-cream border border-border">
            <span className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-royal shrink-0">
              <Search className="w-5 h-5 text-gold" />
            </span>
            <div>
              <p className="font-serif-cap text-xs text-gold mb-1">Find Us on Google</p>
              <p className="text-sm text-foreground/80 mb-2">
                Search for the church using either name:
              </p>
              <ul className="space-y-1.5">
                {GOOGLE_SEARCH_TERMS.map((term) => (
                  <li key={term}>
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(term)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {term}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-cream border border-border">
            <p className="font-serif-cap text-xs text-gold mb-2">Social Media</p>
            <p className="text-sm text-foreground/80 mb-4">
              Follow Omega Fire Ministry Montreal on:
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit our ${label} page`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-gold hover:text-gold-foreground transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-border h-72">
            <iframe
              title="Map"
              src="https://www.google.com/maps?q=281+Quinlan+Street+Lasalle+QC&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Field({
  label,
  name,
  type,
  required = false,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-serif-cap text-gold mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        type={type}
        className="w-full px-4 py-3 rounded-xl border border-border bg-cream focus:outline-none focus:border-gold"
      />
    </div>
  );
}
