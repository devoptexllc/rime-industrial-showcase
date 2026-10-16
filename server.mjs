import "dotenv/config";
import nodemailer from "nodemailer";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional(),
  service: z.enum([
    "CNC Tools",
    "Surveillance Cameras",
    "Machinery Parts",
    "Computer Accessories",
    "Other",
  ]),
  message: z.string().trim().min(1).max(1000),
});

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Let Nitro render the rest of your website.
    if (url.pathname !== "/api/contact") {
      return;
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { Allow: "POST" },
      });
    }

    let data;

    try {
      data = await request.json();
    } catch {
      return json(
        { success: false, error: "Invalid request." },
        400
      );
    }

    const result = schema.safeParse(data);

    if (!result.success) {
      return json(
        {
          success: false,
          error: "Please check your form fields.",
        },
        400
      );
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;

    if (!smtpUser || !smtpPassword) {
      console.error("Missing SMTP_USER or SMTP_PASSWORD.");

      return json(
        {
          success: false,
          error: "Email service is not configured.",
        },
        500
      );
    }

    const { name, email, phone, service, message } = result.data;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: {
          name: "Prime Source International",
          address: smtpUser,
        },
        to: "atifmalik526@gmail.com",
        replyTo: email,
        subject: `Website inquiry — ${service}`,
        text: [
          "New inquiry from your website",
          "",
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone || "Not provided"}`,
          `Service: ${service}`,
          "",
          "Message:",
          message,
        ].join("\n"),
      });

      if (!info.accepted?.length) {
        throw new Error("Email was not accepted.");
      }

      return json({ success: true });
    } catch (error) {
      console.error("Contact email failed:", error);

      return json(
        {
          success: false,
          error: "Unable to send your message. Please try again.",
        },
        500
      );
    }
  },
};