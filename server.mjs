import "dotenv/config";
import express from "express";
import nodemailer from "nodemailer";
import { z } from "zod";

const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "16kb" }));

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

if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
  throw new Error("Missing SMTP_USER or SMTP_PASSWORD.");
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.hostinger.com",
  port: Number(process.env.SMTP_PORT || 465),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

app.post("/api/contact", async (req, res) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      error: "Please check your form fields.",
    });
  }

  const { name, email, phone, service, message } = result.data;

  try {
    const info = await transporter.sendMail({
      from: {
        name: "Prime Source International",
        address: process.env.SMTP_USER,
      },
      to: "contact@primesourceint.com",
      replyTo: email,
      subject: `Website inquiry — ${service}`,
      text: [
        "New website inquiry",
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
      throw new Error("Email was not accepted by the mail server.");
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Contact email failed:", error);

    return res.status(500).json({
      success: false,
      error: "Unable to send your message. Please try again.",
    });
  }
});

const port = Number(process.env.PORT || 3001);

app.listen(port, () => {
  console.log(`Contact API listening on port ${port}`);
});