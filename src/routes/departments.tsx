import { createFileRoute, Link } from "@tanstack/react-router";
import Layout from "@/components/site/Layout";
import PageHeader from "@/components/site/PageHeader";

const departments = [
  {
    id: "men-department",
    title: "Men Department",
    image: "/men/0009.jpg",
    description: "Building disciplined kingdom men through prayer, leadership, and fellowship.",
    href: "/ministry/men",
  },
  {
    id: "women-department",
    title: "Women Department",
    image: "/img1.jpg",
    description: "Raising women of grace, power, and purpose in Christ.",
    href: "/ministry/women",
  },
  {
    id: "youth-department",
    title: "Youth Department",
    image: "/members/001113.jpg",
    description: "Equipping young people to know God and influence their generation.",
  },
  {
    id: "children-department",
    title: "Children Department",
    image: null,
    description: "Nurturing children in the fear of God through age-appropriate teaching.",
  },
  {
    id: "choir-department",
    title: "Choir Department",
    image: null,
    description: "Leading worship and praise with excellence and spiritual depth.",
  },
  {
    id: "intercessor-department",
    title: "Intercessor Department",
    image: null,
    description: "Standing in the gap through strategic prayer for church and community.",
  },
  {
    id: "media-department",
    title: "Media Department",
    image: null,
    description: "Supporting ministry impact through sound, visuals, and digital outreach.",
  },
  {
    id: "evangelism-department",
    title: "Evangelism Department",
    image: null,
    description: "Reaching souls with the Gospel through local and community outreach.",
  },
  {
    id: "sanctuary-department",
    title: "Sanctuary Department",
    image: null,
    description: "Maintaining a clean, orderly, and welcoming house of worship.",
  },
  {
    id: "ushering-protocol-department",
    title: "Ushering & Protocol Department",
    image: null,
    description: "Welcoming and coordinating people with honor, order, and excellence.",
  },
] as const;

export const Route = createFileRoute("/departments")({
  head: () => ({
    meta: [
      { title: "Departments — Omega Fire Ministry, Montreal" },
      {
        name: "description",
        content:
          "Explore all ministry departments at Omega Fire Ministries Montreal.",
      },
      { property: "og:title", content: "Departments — Omega Fire Montreal" },
      { property: "og:url", content: "/departments" },
    ],
    links: [{ rel: "canonical", href: "/departments" }],
  }),
  component: DepartmentsPage,
});

function DepartmentsPage() {
  return (
    <Layout>
      <PageHeader
        title="Departments"
        subtitle="Find your place to serve and grow through any of our departments."
        crumbs={[{ label: "Departments" }]}
      />

      <section className="py-16 container mx-auto px-4 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => (
            <article
              key={dept.id}
              id={dept.id}
              className="group overflow-hidden rounded-2xl bg-background shadow-sm hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 border border-border scroll-mt-28"
            >
              <div className="relative h-56 overflow-hidden">
                {dept.image ? (
                  <img
                    src={dept.image}
                    alt={dept.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-royal" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/75 to-transparent" />
              </div>

              <div className="p-6">
                <h2 className="font-display text-2xl text-primary mb-3">{dept.title}</h2>
                <p className="text-sm text-foreground/75 leading-relaxed">{dept.description}</p>
                {dept.href ? (
                  <Link
                    to={dept.href}
                    className="inline-flex items-center mt-4 text-sm font-semibold text-primary hover:text-gold transition-colors"
                  >
                    Open Department
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
