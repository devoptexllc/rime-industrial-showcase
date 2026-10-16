import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { Shell, PageHero } from "@/components/site/SiteLayout";
import cctv from "@/assets/slide-cctv.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Prime Source International" },
      { name: "description", content: "Contact Prime Source International for quotes on CNC tools, surveillance cameras, machinery parts and computer accessories." },
      { property: "og:title", content: "Contact Prime Source International" },
      { property: "og:description", content: "Request a quote or ask our team about industrial equipment supply." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(30).optional(),
  service: z.string().min(1, "Choose a service"),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const field = "w-full border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-gold";

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
    e.currentTarget.reset();
  }

  const err = (k: string) => errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>;

  return (
    <Shell>
      <PageHero title="Contact Us" kicker="Get In Touch" image={cctv} />
      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <h2 className="font-display text-4xl text-primary">Let's talk about your requirements</h2>
          <div className="gold-rule my-6" />
          <p className="text-muted-foreground">Send us your inquiry and our team will reply with product details and a competitive quote.</p>
          <ul className="mt-10 space-y-6">
            {[
              [MapPin, "Address", "Your business address here"],
              [Phone, "Phone", "+1 (000) 000-0000"],
              [Mail, "Email", "info@primesourceintl.com"],
              [Clock, "Hours", "Mon – Sat, 9:00 AM – 6:00 PM"],
            ].map(([Icon, l, v]) => {
              const I = Icon as typeof MapPin;
              return (
                <li key={l as string} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary"><I className="h-5 w-5 text-gold" /></div>
                  <div><div className="text-xs font-bold uppercase tracking-widest text-gold">{l as string}</div><div className="mt-1 text-foreground">{v as string}</div></div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="border-t-2 border-gold bg-card p-8 shadow-sm md:p-12 lg:col-span-3">
          {sent ? (
            <div className="flex flex-col items-center py-16 text-center">
              <CheckCircle2 className="h-16 w-16 text-gold" />
              <h3 className="mt-6 font-display text-3xl text-primary">Thank you!</h3>
              <p className="mt-2 text-muted-foreground">Your message has been received. We'll be in touch shortly.</p>
              <button onClick={() => setSent(false)} className="mt-8 text-xs font-bold uppercase tracking-widest text-primary hover:text-gold">Send another message</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-5 md:grid-cols-2">
              <div><input name="name" placeholder="Full Name *" className={field} maxLength={100} />{err("name")}</div>
              <div><input name="email" type="email" placeholder="Email Address *" className={field} maxLength={255} />{err("email")}</div>
              <div><input name="phone" placeholder="Phone Number" className={field} maxLength={30} /></div>
              <div>
                <select name="service" defaultValue="" className={field}>
                  <option value="" disabled>Select a Service *</option>
                  <option>CNC Tools</option>
                  <option>Surveillance Cameras</option>
                  <option>Machinery Parts</option>
                  <option>Computer Accessories</option>
                  <option>Other</option>
                </select>{err("service")}
              </div>
              <div className="md:col-span-2"><textarea name="message" rows={6} placeholder="Your Message *" className={field} maxLength={1000} />{err("message")}</div>
              <div className="md:col-span-2">
                <button type="submit" className="bg-primary px-10 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:bg-accent hover:text-accent-foreground">Send Message</button>
              </div>
            </form>
          )}
        </div>
      </section>
    </Shell>
  );
}
