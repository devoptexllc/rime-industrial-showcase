import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Shell, PageHero } from "@/components/site/SiteLayout";
import cctv from "@/assets/slide-cctv.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      {
        title: "Contact Us — Prime Source International",
      },
      {
        name: "description",
        content:
          "Contact Prime Source International for quotes on CNC tools, surveillance cameras, machinery parts and computer accessories.",
      },
      {
        property: "og:title",
        content: "Contact Prime Source International",
      },
      {
        property: "og:description",
        content:
          "Request a quote or ask our team about industrial equipment supply.",
      },
    ],
  }),
  component: Contact,
});

const services = [
  "CNC Tools",
  "Surveillance Cameras",
  "Machinery Parts",
  "Computer Accessories",
  "Other",
] as const;

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or fewer"),

  email: z
    .string()
    .trim()
    .email("Enter a valid email")
    .max(255, "Email must be 255 characters or fewer"),

  phone: z
    .string()
    .trim()
    .max(30, "Phone must be 30 characters or fewer")
    .optional(),

  service: z.string().refine(
    (value) => services.some((service) => service === value),
    "Choose a service"
  ),

  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(1000, "Message must be 1000 characters or fewer"),
});

const field =
  "w-full border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-gold";

const contactDetails = [
  {
    icon: MapPin,
    label: "Address",
    value: "Street No 688, House No 21, G-13/3, Islamabad",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+92 (0332) 5375210",
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@primesourceint.com",
    href: "mailto:contact@primesourceint.com",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Sat, 9:00 AM – 6:00 PM",
  },
];

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (sending) return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const result = schema.safeParse(data);

    setSubmitError("");

    if (!result.success) {
      const nextErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const key = String(issue.path[0]);

        if (!nextErrors[key]) {
          nextErrors[key] = issue.message;
        }
      });

      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      const body: unknown = await response.json();

      const succeeded =
        typeof body === "object" &&
        body !== null &&
        "success" in body &&
        body.success === true;

      if (!response.ok || !succeeded) {
        throw new Error("Message could not be sent");
      }

      form.reset();
      setSent(true);
    } catch {
      setSubmitError(
        "Your message could not be sent. Please try again or email contact@primesourceint.com."
      );
    } finally {
      setSending(false);
    }
  }

  function errorMessage(key: string) {
    const message = errors[key];

    if (!message) return null;

    return (
      <p
        id={`${key}-error`}
        className="mt-1 text-xs text-destructive"
      >
        {message}
      </p>
    );
  }

  return (
    <Shell>
      <PageHero
        title="Contact Us"
        kicker="Get In Touch"
        image={cctv}
      />

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <h2 className="font-display text-4xl text-primary">
            Let's talk about your requirements
          </h2>

          <div className="gold-rule my-6" />

          <p className="text-muted-foreground">
            Send us your inquiry and our team will reply with product
            details and a competitive quote.
          </p>

          <ul className="mt-10 space-y-6">
            {contactDetails.map(
              ({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary">
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 text-gold"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="text-xs font-bold uppercase tracking-widest text-gold">
                      {label}
                    </div>

                    <div className="mt-1 break-words text-foreground">
                      {href ? (
                        <a
                          href={href}
                          className="hover:text-gold"
                        >
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="border-t-2 border-gold bg-card p-8 shadow-sm md:p-12 lg:col-span-3">
          {sent ? (
            <div
              role="status"
              className="flex flex-col items-center py-16 text-center"
            >
              <CheckCircle2
                aria-hidden="true"
                className="h-16 w-16 text-gold"
              />

              <h3 className="mt-6 font-display text-3xl text-primary">
                Thank you!
              </h3>

              <p className="mt-2 text-muted-foreground">
                Your inquiry has been sent. We'll be in touch shortly.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setSubmitError("");
                  setErrors({});
                }}
                className="mt-8 text-xs font-bold uppercase tracking-widest text-primary hover:text-gold"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={submit}
              noValidate
              aria-busy={sending}
              className="grid gap-5 md:grid-cols-2"
            >
              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Full Name *"
                  className={field}
                  maxLength={100}
                  required
                  aria-invalid={Boolean(errors["name"])}
                  aria-describedby={
                    errors["name"] ? "name-error" : undefined
                  }
                />

                {errorMessage("name")}
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email Address *"
                  className={field}
                  maxLength={255}
                  required
                  aria-invalid={Boolean(errors["email"])}
                  aria-describedby={
                    errors["email"] ? "email-error" : undefined
                  }
                />

                {errorMessage("email")}
              </div>

              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Phone Number"
                  className={field}
                  maxLength={30}
                  aria-invalid={Boolean(errors["phone"])}
                  aria-describedby={
                    errors["phone"] ? "phone-error" : undefined
                  }
                />

                {errorMessage("phone")}
              </div>

              <div>
                <label htmlFor="service" className="sr-only">
                  Service
                </label>

                <select
                  id="service"
                  name="service"
                  defaultValue=""
                  className={field}
                  required
                  aria-invalid={Boolean(errors["service"])}
                  aria-describedby={
                    errors["service"] ? "service-error" : undefined
                  }
                >
                  <option value="" disabled>
                    Select a Service *
                  </option>

                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>

                {errorMessage("service")}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="message" className="sr-only">
                  Your Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Your Message *"
                  className={field}
                  maxLength={1000}
                  required
                  aria-invalid={Boolean(errors["message"])}
                  aria-describedby={
                    errors["message"] ? "message-error" : undefined
                  }
                />

                {errorMessage("message")}
              </div>

              <div className="md:col-span-2">
                {submitError && (
                  <p
                    role="alert"
                    className="mb-4 text-sm text-destructive"
                  >
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="bg-primary px-10 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </Shell>
  );
}

export default Contact;