import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PlayCircle, Search } from "lucide-react";

export const Route = createFileRoute("/media/sermons")({
  head: () => ({
    meta: [
      { title: "Sermons — Omega Fire Ministry, Montreal" },
      { name: "description", content: "Watch & listen to the latest video and audio sermons from Omega Fire Ministry Montreal." },
      { property: "og:title", content: "Sermons — Omega Fire Montreal" },
      { property: "og:url", content: "/media/sermons" },
    ],
    links: [{ rel: "canonical", href: "/media/sermons" }],
  }),
  component: SermonsPage,
});

const sermonsData = [
  {
    title: "Mid-Year Thanksgiving Service",
    by: "Pastor David Edegbe",
    date: "Sunday July 27th, 2025",
    videoId: "gnLsmWcbyhU",
    cat: "Thanksgiving",
  },
  {
    title: "Deliverance & Recovery Service Conference Day",
    by: "Pastor David Edegbe",
    date: "Friday March 7th, 2026",
    videoId: "WJDDbqO_iCw",
    cat: "Deliverance",
  },
  {
    title: "OFM Montreal, Canada - Sunday Service",
    by: "Pastor David Edegbe",
    date: "January 18, 2025",
    videoId: "GjouAHEQy_U",
    cat: "Sunday Service",
  },
  {
    title: "OFM Montreal, Canada - Sunday Service",
    by: "Pastor David Edegbe",
    date: "February 15, 2026",
    videoId: "_2QFQKZnxE4",
    cat: "Sunday Service",
  },
  {
    title: "SOLUTION SERVICE",
    by: "Pastor David Edegbe",
    date: "December 21, 2025",
    videoId: "S6wxET5BNss",
    cat: "Solution Service",
  },
  {
    title: "SOLUTION SERVICE",
    by: "Pastor David Edegbe",
    date: "Friday March 7th, 2026",
    videoId: "WAawq4ZkYr0",
    cat: "Solution Service",
  },
];

function youtubeThumbnail(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function toTimestamp(dateLabel: string) {
  const normalized = dateLabel
    .replace(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+/i, "")
    .replace(/(\d+)(st|nd|rd|th)/gi, "$1")
    .trim();

  const parsed = Date.parse(normalized);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function SermonsPage() {
  const [q, setQ] = useState("");
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const activeSermon = sermonsData.find((s) => s.videoId === activeVideoId);
  const cats = ["All", ...new Set(sermonsData.map((s) => s.cat))];
  const [cat, setCat] = useState("All");

  const sortedSermons = [...sermonsData].sort(
    (a, b) => toTimestamp(b.date) - toTimestamp(a.date),
  );

  const filtered = sortedSermons.filter(
    (s) =>
      (cat === "All" || s.cat === cat) &&
      (s.title.toLowerCase().includes(q.toLowerCase()) || s.by.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <Layout>
      <PageHeader
        title="Sermons"
        subtitle="Be edified through revelation of the Word — watch, listen, share."
        crumbs={[{ label: "Media" }, { label: "Sermons" }]}
      />

      <section className="py-16 container mx-auto px-4 lg:px-8">
        <Dialog open={activeVideoId !== null} onOpenChange={(open) => !open && setActiveVideoId(null)}>
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

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search sermons…"
              className="w-full pl-11 pr-4 py-3 rounded-full border border-border bg-cream focus:outline-none focus:border-gold"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  cat === c
                    ? "bg-gradient-royal text-primary-foreground"
                    : "border border-border text-foreground/70 hover:border-gold"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((s) => (
            <article key={`${s.videoId}-${s.date}`} className="group">
              <div className="relative h-64 overflow-hidden rounded-2xl mb-4">
                <img
                  src={youtubeThumbnail(s.videoId)}
                  alt={s.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors" />
                <span className="absolute top-3 left-3 bg-gold text-gold-foreground text-xs px-3 py-1 rounded-full font-semibold">
                  {s.cat}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveVideoId(s.videoId)}
                  className="absolute inset-0 grid place-items-center cursor-pointer"
                  aria-label={`Play ${s.title}`}
                >
                  <span className="grid place-items-center w-16 h-16 rounded-full bg-gold/95 text-gold-foreground shadow-gold group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-8 h-8" />
                  </span>
                </button>
              </div>
              <p className="font-serif-cap text-sm font-medium text-[oklch(0.42_0.12_75)] mb-1">{s.date}</p>
              <h3 className="font-display text-xl text-primary mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{s.by}</p>
              <div className="flex">
                <button
                  type="button"
                  onClick={() => setActiveVideoId(s.videoId)}
                  className="text-xs inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground cursor-pointer"
                >
                  <PlayCircle className="w-3.5 h-3.5" /> Watch
                </button>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-16">No sermons match your search.</p>
        )}
      </section>
    </Layout>
  );
}
