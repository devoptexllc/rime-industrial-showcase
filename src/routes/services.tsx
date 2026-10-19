import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { Shell, PageHero } from "@/components/site/SiteLayout";
import { serviceGroups } from "@/data/services";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Services — Prime Source International" },
    { name: "description", content: "Mechanical, electrical and electronic components, industrial and aerospace materials, chemicals, industrial computing, IT specialist services, PCB solutions and environmental testing." },
    { property: "og:title", content: "Services — Prime Source International" },
    { property: "og:description", content: "Explore our industrial supply, technical sourcing, IT and electronics services." },
  ] }),
  component: Services,
});

function Services() {
  return (
    <Shell>
      <PageHero title="Our Services" kicker="Industrial Supply & Technical Solutions" image="/images/industry-workshop.jpg" />
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Our Capabilities</p>
          <h2 className="mt-4 font-display text-4xl text-primary md:text-5xl">From mechanical essentials to specialist technology</h2>
          <div className="gold-rule my-6" />
          <p className="leading-8 text-muted-foreground">Prime Source International supports industrial and technical procurement through sourcing, indenting and supplier coordination. Explore our complete service range below, starting with mechanical and electrical requirements.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {serviceGroups.map(({ title, text, items }, index) => (
            <article key={title} className="flex flex-col border border-border border-t-2 border-t-gold bg-card p-7 md:p-9">
              <span className="text-xs font-bold tracking-widest text-gold">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-3xl text-primary">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{text}</p>
              <ul className="mb-7 mt-6 space-y-3">
                {items.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-foreground"><Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-gold" /><span>{item}</span></li>)}
              </ul>
              <Link to="/contact" className="mt-auto inline-flex items-center gap-2 self-start text-xs font-bold uppercase tracking-widest text-primary hover:text-gold">Discuss Your Requirements <ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-4xl text-sm leading-7 text-muted-foreground">Supply and service arrangements depend on the specification, availability and agreed scope. Chemicals and aerospace materials are subject to applicable handling, transport and import/export requirements. Testing and PCB production are coordinated with suitable service partners.</p>
      </section>
      <section className="bg-navy text-navy-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 md:flex-row md:items-center">
          <div><h2 className="font-display text-4xl">Tell us what your project needs</h2><p className="mt-4 max-w-2xl leading-7 opacity-80">Share your specifications, quantities and delivery expectations so we can coordinate suitable options.</p></div>
          <Link to="/contact" className="shrink-0 bg-accent px-8 py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground hover:brightness-110">Request a Quote</Link>
        </div>
      </section>
    </Shell>
  );
}
