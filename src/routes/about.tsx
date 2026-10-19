import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe, Settings, Handshake } from "lucide-react";
import { Shell, PageHero } from "@/components/site/SiteLayout";

const workshop = "/images/industry-workshop.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Prime Source International" },
      { name: "description", content: "Prime Source International is a Pakistan-based sourcing, indenting and international trading company supporting industrial, engineering and IT procurement." },
      { property: "og:title", content: "About Prime Source International" },
      { property: "og:description", content: "Engineering-informed sourcing and international supplier coordination for industrial and technical requirements." },
    ],
  }),
  component: About,
});

const strengths = [
  { icon: Globe, title: "International Sourcing", text: "Supplier identification, quotation coordination and order follow-up with international manufacturers, distributors and specialist suppliers." },
  { icon: Settings, title: "Technical Understanding", text: "A multidisciplinary team with electrical, mechanical and aerospace-related expertise helps interpret specifications and coordinate technical clarification." },
  { icon: Handshake, title: "Lasting Partnerships", text: "Clear communication, realistic commitments and requirement-specific support guide our relationships with customers and suppliers." },
];

function About() {
  return (
    <Shell>
      <PageHero title="About Us" kicker="Who We Are" image={workshop} />
      <section aria-labelledby="about-heading" className="relative isolate overflow-hidden bg-background">
        <img src={workshop} alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-background/90" />
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-20 md:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">About Us</p>
            <h2 id="about-heading" className="mt-4 font-display text-4xl text-primary md:text-5xl">Trusted Sourcing. Lasting Partnerships.</h2>
            <p className="mt-4 text-sm font-semibold text-primary">International Sourcing · Indenting · Industrial Supplies</p>
            <div className="gold-rule mx-auto my-7" />
          </div>
          <div className="mx-auto max-w-3xl space-y-5 text-left text-sm leading-7 text-foreground md:text-base md:leading-8">
            <p>Prime Source International (PSI) is a Pakistan-based sourcing, indenting and international trading company connecting industrial and technical customers with global manufacturers and suppliers. Based in Islamabad, we support procurement for specialised components, industrial materials, machinery, equipment and technical consumables.</p>
            <p>Our supply scope includes electronic parts, electrical and mechanical components, engineering materials, industrial adhesives and specialised equipment. We also source computer accessories, networking hardware and industrial IT equipment to suit business, workshop and project requirements.</p>
            <p>PSI is a newly established company supported by a team with professional experience in Pakistan’s aerospace sector and military organisations. Our multidisciplinary technical background helps us understand specifications, clarify product options and coordinate with manufacturers and customers.</p>
            <p>From supplier identification and quotation coordination to available product documentation and delivery follow-up, we aim to simplify procurement through professional communication, transparency and long-term cooperation.</p>
          </div>
          <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3 md:gap-8">
            {strengths.map(({ icon: Icon, title, text }, index) => (
              <div key={title} className={`border-t-2 border-gold p-8 text-center shadow-sm md:p-10 ${index === 1 ? "bg-primary text-primary-foreground md:-translate-y-5" : "bg-card text-primary"}`}>
                <div className="mx-auto flex h-14 w-14 items-center justify-center bg-gold/15"><Icon className="h-7 w-7 text-gold" strokeWidth={1.5} aria-hidden="true" /></div>
                <h3 className="mt-6 font-display text-2xl">{title}</h3>
                <p className={`mt-4 text-sm leading-7 ${index === 1 ? "text-primary-foreground/85" : "text-muted-foreground"}`}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Our Approach</p>
              <h2 className="mt-4 font-display text-4xl text-primary">Procurement built around your requirements</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">We review specifications, drawings, quantities and delivery expectations before identifying suitable supply options. Each enquiry is considered against product availability, documentation needs and agreed commercial terms.</p>
              <Link to="/contact" className="mt-8 inline-block bg-primary px-7 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:bg-accent hover:text-accent-foreground">Discuss Your Requirements</Link>
            </div>
            <ol className="space-y-5">
              {[
                ["Review", "Understand the specification, application and required quantity."],
                ["Source", "Identify manufacturers and suppliers with relevant product options."],
                ["Coordinate", "Clarify quotations, lead times and available technical documentation."],
                ["Follow Up", "Maintain communication on order progress, dispatch and delivery."],
              ].map(([title, text], index) => (
                <li key={title} className="flex gap-4 border-b border-border pb-5">
                  <span className="font-display text-2xl text-gold">0{index + 1}</span>
                  <div><h3 className="font-semibold text-primary">{title}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </Shell>
  );
}
