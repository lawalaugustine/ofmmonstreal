import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ZoomIn } from "lucide-react";

export const Route = createFileRoute("/media/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Omega Fire Ministries, Montreal" },
      {
        name: "description",
        content: "Photo gallery of OFM Montreal members, pastors, worship, and church events.",
      },
      { property: "og:title", content: "Gallery — Omega Fire Montreal" },
      { property: "og:url", content: "/media/gallery" },
    ],
    links: [{ rel: "canonical", href: "/media/gallery" }],
  }),
  component: GalleryPage,
});

const memberImages = [
  "/members/00001.jpg",
  "/members/0001.jpg",
  "/members/00011.jpg",
  "/members/0001111.jpg",
  "/members/00012.jpg",
  "/members/000123.jpg",
  "/members/00014.jpg",
  "/members/0002.jpg",
  "/members/0005.jpg",
  "/members/0006.jpg",
  "/members/0008.jpg",
  "/members/0009.jpg",
  "/members/001111.jpg",
  "/members/001112.jpg",
  "/members/001113.jpg",
  "/members/001114.jpg",
  "/members/001116.jpg",
  "/members/00114.jpg",
  "/members/00115.jpg",
  "/members/00116.jpg",
  "/members/00117.jpg",
  "/members/00118.jpg",
  "/members/00119.jpg",
  "/members/0014.jpg",
  "/members/0015.jpg",
  "/members/0016.jpg",
  "/members/0018.jpg",
  "/members/0019.jpg",
  "/members/0022.jpg",
  "/members/0024.jpg",
  "/members/0026.jpg",
  "/members/0027.jpg",
  "/members/0029.jpg",
  "/members/01.jpg",
  "/members/011.jpg",
  "/members/012.jpg",
  "/members/013.jpg",
  "/members/014.jpg",
  "/members/015.jpg",
  "/members/016.jpg",
  "/members/02.jpg",
  "/members/03.jpg",
  "/members/04.jpg",
  "/members/05.jpg",
];

const pastorImages = [
  "/pastor/0000.jpg",
  "/pastor/0011.jpg",
  "/pastor/00111.jpg",
  "/pastor/001112.jpg",
  "/pastor/00112.jpg",
  "/pastor/00113.jpg",
  "/pastor/0012.jpg",
  "/pastor/0013.jpg",
  "/pastor/002.jpg",
  "/pastor/0020.jpg",
  "/pastor/0021.jpg",
  "/pastor/0023.jpg",
  "/pastor/0027.jpg",
  "/pastor/003.jpg",
  "/pastor/004.jpg",
  "/pastor/005.jpg",
  "/pastor/006.jpg",
  "/pastor/007.jpg",
  "/pastor/008.jpg",
  "/pastor/009.jpg",
  "/pastor/01.jpg",
  "/pastor/010.jpg",
  "/pastor/016.jpg",
  "/pastor/017.jpg",
  "/pastor/02.jpg",
  "/pastor/03.jpg",
  "/pastor/06.jpg",
  "/pastor/07.jpg",
  "/pastor/08.jpg",
  "/pastor/09.jpg",
  "/pastor/1.jpg",
  "/pastor/7.jpg",
  "/pastor/Pastor and Papa 2.jpg",
  "/pastor/Pastor and Papa.jpg",
  "/pastor/pastor_david.png",
  "/pastor/pastor_david_test.png",
];

function GalleryGrid({
  images,
  altPrefix,
  onSelect,
}: {
  images: string[];
  altPrefix: string;
  onSelect: (src: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((src) => (
        <button
          key={src}
          type="button"
          onClick={() => onSelect(src)}
          className="group relative aspect-[4/5] overflow-hidden rounded-xl cursor-pointer text-left"
          aria-label={`View ${altPrefix} photo`}
        >
          <img
            src={encodeURI(src)}
            alt={`${altPrefix} gallery`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-primary/0 transition-colors group-hover:bg-primary/35">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gold/95 text-gold-foreground opacity-0 shadow-gold transition-opacity group-hover:opacity-100">
              <ZoomIn className="h-6 w-6" />
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

function GalleryPage() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <Layout>
      <PageHeader
        title="Gallery"
        subtitle="Moments of worship, fellowship, and the move of God among us."
        crumbs={[{ label: "Media" }, { label: "Gallery" }]}
      />

      <section className="py-16 container mx-auto px-4 lg:px-8">
        <Dialog open={activeImage !== null} onOpenChange={(open) => !open && setActiveImage(null)}>
          <DialogContent className="max-w-5xl gap-0 overflow-hidden border-0 p-2 sm:max-w-5xl w-[calc(100vw-2rem)]">
            <DialogTitle className="sr-only">Gallery photo</DialogTitle>
            {activeImage && (
              <img
                src={encodeURI(activeImage)}
                alt="Gallery enlarged view"
                className="max-h-[85vh] w-full rounded-md object-contain"
              />
            )}
          </DialogContent>
        </Dialog>

        <Tabs defaultValue="members" className="w-full">
          <TabsList className="mb-10 flex h-auto w-full max-w-md mx-auto gap-1 rounded-full bg-cream p-1 border border-border">
            <TabsTrigger
              value="members"
              className="flex-1 rounded-full px-4 py-2.5 data-[state=active]:bg-gradient-royal data-[state=active]:text-primary-foreground"
            >
              Members
            </TabsTrigger>
            <TabsTrigger
              value="pastor"
              className="flex-1 rounded-full px-4 py-2.5 data-[state=active]:bg-gradient-royal data-[state=active]:text-primary-foreground"
            >
              Pastor &amp; Wife
            </TabsTrigger>
          </TabsList>

          <TabsContent value="members">
            <GalleryGrid
              images={memberImages}
              altPrefix="Members"
              onSelect={setActiveImage}
            />
          </TabsContent>

          <TabsContent value="pastor">
            <GalleryGrid
              images={pastorImages}
              altPrefix="Pastor and wife"
              onSelect={setActiveImage}
            />
          </TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
}
