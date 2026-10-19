import { useEffect, useRef } from "react";
import "./WhyPsiTimeline.css";

const steps = [
  { title: "Engineering-informed sourcing", text: "Technical literacy to help align product options with stated requirements." },
  { title: "International supplier coordination", text: "A point of contact for communication with overseas manufacturers and vendors." },
  { title: "Broad procurement scope", text: "Support across components, materials, chemicals, adhesives and specialised equipment." },
  { title: "Relationship-led service", text: "Clear communication, realistic commitments and an emphasis on long-term cooperation." },
  { title: "Requirement-specific support", text: "Each enquiry is considered against its specifications, availability, compliance needs and commercial terms." },
];

export function WhyPsiTimeline() {
  const timeline = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const element = timeline.current;
    if (!element) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

    const rows = Array.from(element.querySelectorAll<HTMLElement>(".psi-timeline-step"));
    element.classList.add("psi-timeline-animated");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("psi-step-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    rows.forEach((row) => observer.observe(row));

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.68 - rect.top) / rect.height));
      element.style.setProperty("--psi-progress", String(progress));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      element.classList.remove("psi-timeline-animated");
    };
  }, []);

  return (
    <section aria-labelledby="why-psi-heading" className="overflow-hidden border-t border-border bg-secondary">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="mb-14 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Why Choose Us</p>
          <h2 id="why-psi-heading" className="mt-3 font-display text-4xl text-primary md:text-5xl">Why Work With PSI</h2>
          <div className="gold-rule mt-6" />
        </div>
        <ol ref={timeline} className="psi-timeline">
          {steps.map(({ title, text }, index) => (
            <li key={title} className="psi-timeline-step">
              <span className="psi-timeline-marker" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div className="psi-timeline-card border-t-2 border-gold bg-card p-6 shadow-sm md:p-9">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold">Step {index + 1}</p>
                <h3 className="font-display text-2xl text-primary md:text-3xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
