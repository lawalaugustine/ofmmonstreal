import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import { Calendar, Clock, MapPin } from "lucide-react";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Omega Fire Ministries, Montreal" },
      {
        name: "description",
        content:
          "Upcoming events and regular programs at Omega Fire Ministries Montreal — services, prayer, and conferences.",
      },
      { property: "og:title", content: "Events — Omega Fire Ministries, Montreal" },
      { property: "og:url", content: "/events" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
  component: EventsPage,
});

const events = [
  {
    title: "Monstreal Outpouring 2026",
    dateLabel: "Jun 16–17",
    year: "2026",
    schedule: "June 16th - 17th, 2026",
    time: "09:00 AM & 05:00 PM Daily",
    desc: "Join us for a powerful outpouring of the Spirit in Montreal.",
    img: "/event1.jpg",
    loc: "OFM Montreal",
    badge: "Upcoming",
    showRegistration: true,
  },
  {
    title: "One Hour Prayer Marathon",
    dateLabel: "Weekly",
    year: "2026",
    schedule: "Every Monday",
    time: "07:00 PM Prompt",
    desc: "Come prepared and ready to be blessed.",
    img: "/event5.jpeg",
    loc: "Online Church Whatsapp",
    badge: "Program",
  },
  {
    title: "Life in the Spirit Fasting",
    dateLabel: "Monthly",
    year: "2026",
    schedule: "Every 1st - 3rd of the month",
    time: "8:00 AM - 4:00 PM",
    desc: "Our monthly life in the Spirit fasting program.",
    img: "/0002.jpg",
    loc: "OFM Montreal",
    badge: "Program",
  },
  {
    title: "OFM Montreal Prayer Line",
    dateLabel: "Weekly",
    year: "2026",
    schedule: "Every Monday of the week",
    time: "7:00 PM - 8:00 PM",
    desc: "OFM Montreal chapter Canada prayer line.",
    img: "/event3.jpg",
    loc: "Prayer Line",
    badge: "Program",
  },
  {
    title: "Donations",
    dateLabel: "Give",
    year: "2026",
    schedule: "Available Anytime",
    time: "24/7",
    desc: "Support the work of ministry through Interact Transfer to omegafireministries06@gmail.com.",
    img: "/donation.jpg",
    loc: "Online Giving",
    badge: "Program",
    href: "/donate",
    ctaLabel: "Give Now",
  },
  {
    title: "Omega Women Prayer Fellowship",
    dateLabel: "Monthly",
    year: "2026",
    schedule: "Every last Saturday of the month",
    time: "9:00 AM - 10:00 AM",
    desc: "A gathering for women to pray and grow together in the Spirit.",
    img: "/img1.jpg",
    loc: "OFM Montreal",
    badge: "Program",
  },
  {
    title: "Men of Zion Meeting",
    dateLabel: "Monthly",
    year: "2026",
    schedule: "Every last Saturday of the month",
    time: "8:30 PM - 9:30 PM",
    desc: "Men of Zion meeting — brotherhood, prayer, and the Word.",
    img: "/men/0009.jpg",
    loc: "OFM Montreal",
    badge: "Program",
  },
  {
    title: "Solution Service",
    dateLabel: "Mar 6",
    year: "2026",
    schedule: "Friday, March 6th 2026",
    time: "All Night",
    desc: "An all-night prophetic gathering with the manifestation of God's voice.",
    img: "/pastor/002.jpg",
    loc: "OFM Montreal",
    badge: "Past Event",
  },
];
const OUTPOURING_REGISTRATION_URL = "https://montreal-outpouring.netlify.app/";

function EventsPage() {
  return (
    <Layout>
      <PageHeader
        title="Events & Programs"
        subtitle="Mark your calendar — every gathering is a divine appointment."
        crumbs={[{ label: "Events" }]}
      />

      <section className="py-16 container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((e) => (
            <article
              key={e.title}
              className="bg-cream rounded-2xl overflow-hidden border border-border hover:shadow-elegant transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={e.img}
                  alt={e.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                <div className="absolute top-4 left-4 bg-background rounded-xl px-4 py-2 text-center shadow-elegant">
                  <p className="font-serif-cap text-[10px] text-gold">{e.year}</p>
                  <p className="font-display text-lg text-primary leading-none">{e.dateLabel}</p>
                </div>
                <span
                  className={`absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    e.badge === "Past Event"
                      ? "bg-charcoal/90 text-white"
                      : e.badge === "Upcoming"
                        ? "bg-gold text-gold-foreground"
                        : "bg-primary/90 text-primary-foreground"
                  }`}
                >
                  {e.badge}
                </span>
              </div>
              <div className="p-6">
                <p className="font-serif-cap text-sm font-medium text-[oklch(0.42_0.12_75)] mb-2">
                  {e.schedule}
                </p>
                <h3 className="font-display text-2xl text-primary mb-3">{e.title}</h3>
                <p className="text-sm text-foreground/75 mb-4 leading-relaxed">{e.desc}</p>
                <ul className="space-y-1.5 text-sm text-muted-foreground mb-5">
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold shrink-0" /> {e.time}
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold shrink-0" /> {e.loc}
                  </li>
                </ul>
                {"showRegistration" in e && e.showRegistration ? (
                  <a
                    href={OUTPOURING_REGISTRATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-gold text-gold-foreground font-semibold py-2.5 rounded-full inline-flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" /> Register Now
                  </a>
                ) : "href" in e && e.href ? (
                  <a
                    href={e.href}
                    className="w-full bg-gradient-gold text-gold-foreground font-semibold py-2.5 rounded-full inline-flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" /> {"ctaLabel" in e ? e.ctaLabel : "Learn More"}
                  </a>
                ) : (
                  <div className="w-full py-2.5 rounded-full border border-border text-center text-sm font-medium text-foreground/70">
                    {e.badge === "Past Event" ? "Event Completed" : "Join Us"}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
