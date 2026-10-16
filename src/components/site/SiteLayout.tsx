import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="hidden bg-navy text-navy-foreground md:block">
        <div className="mx-auto flex max-w-7xl justify-between px-6 py-2 text-xs tracking-wide">
          <span>Trusted Sourcing. Lasting Partnerships.</span>
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><Phone className="h-3 w-3 text-gold" /> +92 (0332) 537-5210</span>
            <span className="flex items-center gap-2"><Mail className="h-3 w-3 text-gold" /> atifmalik526@gmail.com</span>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link to="/"><img src={logo.url} alt="Prime Source International" className="h-14 w-auto" /></Link>
        <nav className="hidden items-center gap-10 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }}
              className="text-sm font-semibold uppercase tracking-widest text-foreground transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}>{n.label}</Link>
          ))}
          <Link to="/contact" className="bg-primary px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground">Get a Quote</Link>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav className="flex flex-col border-t border-border px-6 py-4 md:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-3 font-semibold uppercase tracking-widest">{n.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-display text-3xl">Prime Source International</h3>
          <div className="gold-rule my-4" />
          <p className="max-w-md text-sm opacity-75">Your trusted industrial equipment supplier for CNC tools, surveillance cameras, machinery parts and computer accessories — delivered with reliability and care.</p>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-80">
            {nav.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-gold">{n.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">Contact</h4>
          <ul className="space-y-3 text-sm opacity-80">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-gold" /> Your business address here</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-gold" /> +1 (000) 000-0000</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-gold" /> info@primesourceintl.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10 py-6 text-center text-xs opacity-60">
        © {new Date().getFullYear()} Prime Source International. All rights reserved.
      </div>
    </footer>
  );
}

export function PageHero({ title, kicker, image }: { title: string; kicker: string; image: string }) {
  return (
    <section className="relative h-80 overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6 text-navy-foreground">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{kicker}</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">{title}</h1>
      </div>
    </section>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return <div className="flex min-h-screen flex-col"><Header /><main className="flex-1">{children}</main><Footer /></div>;
}
