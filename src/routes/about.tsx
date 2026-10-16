import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Award } from "lucide-react";
import { Shell, PageHero } from "@/components/site/SiteLayout";
import parts from "@/assets/slide-parts.jpg";
import cnc from "@/assets/slide-cnc.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Prime Source International" },
      { name: "description", content: "Learn about Prime Source International, a trusted supplier of industrial equipment, CNC tools, CCTV and IT accessories." },
      { property: "og:title", content: "About Prime Source International" },
      { property: "og:description", content: "Trusted sourcing and lasting partnerships for industrial businesses." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Shell>
      <PageHero title="About Us" kicker="Who We Are" image={parts} />
      <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 md:grid-cols-2">
        <img src={cnc} alt="CNC machining" loading="lazy" className="aspect-[4/3] w-full object-cover" />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Our Story</p>
          <h2 className="mt-3 font-display text-5xl text-primary">Trusted Sourcing. Lasting Partnerships.</h2>
          <div className="gold-rule my-6" />
          <p className="leading-relaxed text-muted-foreground">Prime Source International is an industrial equipment supplier serving manufacturers, workshops, factories and businesses. We specialize in CNC tools, surveillance cameras, machinery parts and computer accessories — bringing quality products from reliable global brands under one roof.</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">Our team understands that downtime costs money. That's why we focus on genuine products, competitive pricing, and fast, dependable delivery — backed by knowledgeable support at every step.</p>
        </div>
      </section>
      <section className="bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-24 md:grid-cols-3">
          {[
            { icon: Target, t: "Our Mission", d: "To supply industries with reliable, high-quality equipment and parts that keep operations productive and secure." },
            { icon: Eye, t: "Our Vision", d: "To become the most trusted single-source partner for industrial and technology supplies across the region." },
            { icon: Award, t: "Our Values", d: "Integrity, quality, responsiveness and long-term relationships built on trust with every client." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="border-t-2 border-gold bg-card p-10">
              <Icon className="h-10 w-10 text-gold" strokeWidth={1.4} />
              <h3 className="mt-6 font-display text-3xl text-primary">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}
