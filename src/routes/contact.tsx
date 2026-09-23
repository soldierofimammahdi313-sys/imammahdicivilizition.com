import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SocialIcons } from "@/components/site/SocialIcons";
import { CONTACT } from "@/lib/social-links";
import { SITE_EMAIL, abs } from "@/lib/site";
import { MapPin, Clock, Mail, UserCheck } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Imam Mahdi Civilization" },
      { name: "description", content: "Contact the Imam Mahdi Civilization team by email or mail for questions, scholarly corrections, partnerships or content feedback." },
      { property: "og:title", content: "Contact Us — Imam Mahdi Civilization" },
      { property: "og:description", content: "Reach the team — scholarly inquiries, corrections and editorial feedback." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: abs("/contact") },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: abs("/contact") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Imam Mahdi Civilization",
          url: abs("/contact"),
          mainEntity: {
            "@type": "Organization",
            name: "Imam Mahdi Civilization",
            email: SITE_EMAIL,
            founder: {
              "@type": "Person",
              name: "Syed Ahmad Raza Shamsi",
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: "Chunian",
              addressRegion: "Punjab",
              addressCountry: "PK",
            },
          },
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const n = name.trim().slice(0, 100);
    const m = message.trim().slice(0, 1000);
    if (!n || !m) {
      toast.error("Please add your name and a message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }
    const subject = encodeURIComponent(`Website enquiry from ${n}`);
    const body = encodeURIComponent(`${m}\n\n— ${n} (${email.trim()})`);
    window.location.href = `mailto:${SITE_EMAIL}?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…");
  }

  return (
    <div className="bg-background text-foreground min-h-dvh">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <main className="max-w-4xl mx-auto px-6 pt-10 pb-24">
        <span className="text-[10px] font-bold text-gold uppercase tracking-[0.4em]">Get in touch</span>
        <h1 className="mt-4 font-display italic text-4xl md:text-5xl">Contact Us</h1>
        <p className="mt-6 text-muted-foreground leading-relaxed max-w-2xl">
          Questions about our research, corrections to Quranic or Hadith content, partnership proposals or general feedback — we review every inquiry thoroughly.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <div className="border border-border bg-card/40 p-6 rounded-none space-y-3">
            <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-semibold">
              <Mail className="size-4" />
              <span>Official Email</span>
            </div>
            <a href={`mailto:${SITE_EMAIL}`} className="block text-sm break-all font-mono hover:text-gold transition-colors">
              {SITE_EMAIL}
            </a>
            <p className="text-xs text-muted-foreground">For direct correspondence and official queries.</p>
          </div>

          <div className="border border-border bg-card/40 p-6 rounded-none space-y-3">
            <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-semibold">
              <UserCheck className="size-4" />
              <span>Founder & Lead</span>
            </div>
            <p className="text-sm font-medium">{CONTACT.admin || "Syed Ahmad Raza Shamsi"}</p>
            <p className="text-xs text-muted-foreground">Independent researcher & platform steward.</p>
          </div>

          <div className="border border-border bg-card/40 p-6 rounded-none space-y-3">
            <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-semibold">
              <MapPin className="size-4" />
              <span>Editorial Base</span>
            </div>
            <p className="text-sm">Chunian, District Kasur, Punjab, Pakistan</p>
            <p className="text-xs text-muted-foreground">Operating base and central management.</p>
          </div>

          <div className="border border-border bg-card/40 p-6 rounded-none space-y-3">
            <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-semibold">
              <Clock className="size-4" />
              <span>Response Turnaround</span>
            </div>
            <p className="text-sm">24 to 48 Business Hours</p>
            <p className="text-xs text-muted-foreground">We aim to review scholarly notes promptly.</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold">Social Channels</h2>
          <SocialIcons className="mt-4" iconClass="size-5" />
        </div>

        <form onSubmit={submit} className="mt-14 max-w-xl space-y-5 border-t border-border pt-10">
          <h2 className="font-display italic text-2xl">Send a Message</h2>
          <div>
            <label htmlFor="c-name" className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground block mb-1">Your Name</label>
            <input
              id="c-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              required
              className="w-full bg-card border border-border px-4 py-2 text-sm focus:border-gold outline-none"
              placeholder="e.g. Ali Reza"
            />
          </div>
          <div>
            <label htmlFor="c-email" className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground block mb-1">Your Email</label>
            <input
              id="c-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={100}
              required
              className="w-full bg-card border border-border px-4 py-2 text-sm focus:border-gold outline-none"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label htmlFor="c-msg" className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground block mb-1">Message</label>
            <textarea
              id="c-msg"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={1000}
              required
              rows={5}
              className="w-full bg-card border border-border px-4 py-2 text-sm focus:border-gold outline-none resize-none"
              placeholder="Write your message here..."
            />
          </div>
          <button
            type="submit"
            className="border border-gold bg-gold/10 hover:bg-gold/20 text-gold px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors"
          >
            Send Message
          </button>
        </form>
      </main>
      <SiteFooter />
    </div>
  );
}
