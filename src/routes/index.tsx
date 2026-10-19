import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Cog, Cctv, Wrench, Monitor, Truck, ShieldCheck, Headphones, Globe } from "lucide-react";
import { Shell } from "@/components/site/SiteLayout";
import cnc from "@/assets/slide-cnc.jpg";
import cctv from "@/assets/slide-cctv.jpg";
import parts from "@/assets/slide-parts.jpg";
import it from "@/assets/slide-it.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prime Source International — Industrial Equipment Supplier" },
      { name: "description", content: "Supplier of CNC tools, surveillance cameras, machinery parts and computer accessories. Trusted sourcing, lasting partnerships." },
      { property: "og:title", content: "Prime Source International — Industrial Equipment Supplier" },
      { property: "og:description", content: "CNC tools, CCTV cameras, machinery parts and computer accessories from one trusted source." },
    ],
  }),
  component: Index,
});

const slides = [
  { img: it, kicker: "Computer Accessories", title: "Technology That Powers Business", text: "Networking gear, servers, peripherals and IT hardware for offices and industrial sites." },
  { img: cnc, kicker: "CNC Tools & Machining", title: "Precision Tools for Peak Performance", text: "End mills, inserts, holders and complete CNC tooling solutions sourced from world-class manufacturers." },
  { img: cctv, kicker: "Surveillance Cameras", title: "Security That Never Sleeps", text: "IP, dome, bullet and PTZ camera systems with NVRs and accessories to protect your facilities." },
  { img: parts, kicker: "Machinery Parts", title: "Keep Your Production Moving", text: "Gears, bearings, shafts, motors and spare parts for industrial machinery — supplied fast." },
  
];

const services = [
  { icon: Globe, title: "Global Sourcing", text: "We source hard-to-find industrial items from trusted international manufacturers at competitive prices." },
  { icon: Truck, title: "Logistics & Delivery", text: "Reliable shipping and timely delivery so your operations face minimum downtime." },
  { icon: Cog, title: "CNC Tools Supply", text: "Cutting tools, end mills, drills, inserts, tool holders, collets and CNC machine accessories for every machining need." },
  { icon: Cctv, title: "Surveillance Cameras", text: "Complete CCTV and IP camera solutions — cameras, DVR/NVR systems, cabling and installation support." },
  { icon: Wrench, title: "Machinery Parts", text: "Genuine and compatible spare parts: bearings, gears, belts, pumps, motors, hydraulic and pneumatic components." },
  { icon: Monitor, title: "Computer Accessories", text: "Keyboards, mice, monitors, storage, networking switches, routers, cables and server hardware." },
  
  { icon: ShieldCheck, title: "Quality Assurance", text: "Every product is checked for authenticity and quality before it reaches your facility." },
  { icon: Headphones, title: "Technical Support", text: "Expert guidance in selecting the right equipment, plus responsive after-sales support." },
];

function Slider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [i]);
  const go = (d: number) => setI((v) => (v + d + slides.length) % slides.length);
  return (
    <section className="relative h-[85vh] min-h-[520px] overflow-hidden bg-navy">
      {slides.map((s, idx) => (
        <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "pointer-events-none opacity-0"}`}>
          <img src={s.img} alt={s.title} width={1920} height={1088} className={`h-full w-full object-cover ${idx === i ? "animate-kenburns" : ""}`} />
          <div className="hero-overlay absolute inset-0" />
          {idx === i && (
            <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-center px-6 text-navy-foreground">
              <p className="animate-rise text-xs font-bold uppercase tracking-[0.3em] text-gold">{s.kicker}</p>
              <h1 className="animate-rise mt-4 max-w-2xl font-display text-5xl leading-tight md:text-7xl" style={{ animationDelay: ".15s" }}>{s.title}</h1>
              <p className="animate-rise mt-6 max-w-xl text-lg opacity-85" style={{ animationDelay: ".3s" }}>{s.text}</p>
              <div className="animate-rise mt-10 flex gap-4" style={{ animationDelay: ".45s" }}>
                <Link to="/contact" className="bg-accent px-7 py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground transition hover:brightness-110">Request a Quote</Link>
                <Link to="/about" className="border border-navy-foreground/40 px-7 py-4 text-xs font-bold uppercase tracking-widest transition hover:border-gold hover:text-gold">About Us</Link>
              </div>
            </div>
          )}
        </div>
      ))}
      <button onClick={() => go(-1)} aria-label="Previous" className="absolute left-4 top-1/2 -translate-y-1/2 border border-navy-foreground/30 p-3 text-navy-foreground transition hover:border-gold hover:text-gold"><ChevronLeft /></button>
      <button onClick={() => go(1)} aria-label="Next" className="absolute right-4 top-1/2 -translate-y-1/2 border border-navy-foreground/30 p-3 text-navy-foreground transition hover:border-gold hover:text-gold"><ChevronRight /></button>
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
        {slides.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)} aria-label={`Slide ${idx + 1}`} className={`h-1 transition-all ${idx === i ? "w-12 bg-gold" : "w-6 bg-navy-foreground/40"}`} />
        ))}
      </div>
    </section>
  );
}

function Index() {
  return (
    <Shell>
      <Slider />
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
          {[["4", "Core Product Lines"], ["1000+", "Products Available"], ["24/7", "Customer Support"], ["100%", "Quality Checked"]].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="font-display text-5xl text-primary">{n}</div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Our Services</p>
          <h2 className="mt-3 font-display text-5xl text-primary">Everything your industry needs, from one trusted source</h2>
          <div className="gold-rule mt-6" />
        </div>
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, text }) => (
            <div key={title} className="group bg-background p-8 transition-colors hover:bg-primary">
              <Icon className="h-10 w-10 text-gold" strokeWidth={1.4} />
              <h3 className="mt-6 font-display text-2xl text-primary group-hover:text-primary-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground group-hover:text-primary-foreground/75">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-navy text-navy-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-20 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl">Need equipment sourced fast?</h2>
            <p className="mt-3 opacity-75">Tell us what you need — we'll get back with a competitive quote.</p>
          </div>
          <Link to="/contact" className="bg-accent px-8 py-4 text-xs font-bold uppercase tracking-widest text-accent-foreground hover:brightness-110">Contact Us</Link>
        </div>
      </section>
    </Shell>
  );
}
