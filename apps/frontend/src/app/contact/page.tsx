"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

type InquiryType = "commission" | "collaboration" | "print-purchase" | "general";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType: InquiryType;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
      const res = await fetch(`${STRAPI_URL}/api/contact-submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: formData }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "", inquiryType: "general" });
    } catch {
      setStatus("error");
    }
  };

  const inquiryTypes: { value: InquiryType; label: string }[] = [
    { value: "general", label: "General Inquiry" },
    { value: "commission", label: "Commission" },
    { value: "collaboration", label: "Collaboration" },
    { value: "print-purchase", label: "Print Purchase" },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 sm:pt-24">
        <FadeIn>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Contact</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Let&apos;s Connect
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mt-4 max-w-xl text-lg text-text-secondary">
            Have a project in mind, want to commission artwork, or just want to say hello?
            I&apos;d love to hear from you.
          </p>
        </FadeIn>
      </section>

      {/* Form Section */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-16 lg:grid-cols-5">
          {/* Form */}
          <FadeIn delay={0.2} className="lg:col-span-3">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-accent/20 bg-surface-raised py-20 text-center">
                <CheckCircle className="h-12 w-12 text-accent" />
                <h2 className="mt-6 text-2xl font-bold text-foreground">Message Sent!</h2>
                <p className="mt-2 text-text-secondary">
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-sm text-accent transition-colors hover:text-accent-light"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Inquiry Type */}
                <div>
                  <label className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                    What brings you here?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {inquiryTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, inquiryType: type.value })}
                        className={`rounded-full border px-4 py-2 text-sm transition-all ${
                          formData.inquiryType === type.value
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-border text-text-secondary hover:border-text-muted hover:text-foreground"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email Row */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-border bg-surface-raised px-4 py-3 text-sm text-foreground placeholder-text-muted transition-colors focus:border-accent focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-border bg-surface-raised px-4 py-3 text-sm text-foreground placeholder-text-muted transition-colors focus:border-accent focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface-raised px-4 py-3 text-sm text-foreground placeholder-text-muted transition-colors focus:border-accent focus:outline-none"
                    placeholder="What's this about?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full resize-none rounded-lg border border-border bg-surface-raised px-4 py-3 text-sm text-foreground placeholder-text-muted transition-colors focus:border-accent focus:outline-none"
                    placeholder="Tell me about your project or idea..."
                  />
                </div>

                {/* Error Message */}
                {status === "error" && (
                  <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    Something went wrong. Please try again or email directly.
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center gap-2 rounded-full border border-accent bg-transparent px-8 py-3 text-sm font-medium text-accent transition-all hover:bg-accent hover:text-background disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </FadeIn>

          {/* Sidebar Info */}
          <FadeIn delay={0.3} className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-surface-raised p-8">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                Other ways to connect
              </h3>

              <div className="mt-8 space-y-6">
                <div>
                  <p className="text-sm font-medium text-foreground">Instagram</p>
                  <a
                    href="https://instagram.com/yourstruly.krishi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent transition-colors hover:text-accent-light"
                  >
                    @yourstruly.krishi
                  </a>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-text-secondary">hello@yourstruly-krishi.com</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-foreground">Response Time</p>
                  <p className="text-sm text-text-secondary">
                    I typically respond within 24–48 hours.
                  </p>
                </div>
              </div>

              <div className="mt-10 border-t border-border pt-8">
                <p className="text-xs leading-relaxed text-text-muted">
                  For commission inquiries, please include details about the project scope,
                  timeline, and your budget range. This helps me provide an accurate estimate.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
