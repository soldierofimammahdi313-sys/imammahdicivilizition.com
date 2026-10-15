import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const FUNDS = [
  {
    id: "knowledge",
    icon: "✦",
    title: "Islamic Knowledge",
    description: "Support the research, writing, and publication of accessible Islamic educational resources.",
    note: "For educational platform costs and content production.",
  },
  {
    id: "platform",
    icon: "⌘",
    title: "Keep the Platform Online",
    description: "Help cover hosting, accessibility, security, and improvements to the digital learning experience.",
    note: "For website operations and development.",
  },
  {
    id: "community",
    icon: "♡",
    title: "Community Benefit",
    description: "Support a clearly described community project when its scope, recipient, and delivery plan are published.",
    note: "Only contribute after a specific project and recipient are confirmed.",
  },
];

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Sadaqah & Support | Imam Mahdi Civilization" },
      {
        name: "description",
        content:
          "Support Islamic knowledge, digital learning, and the long-term development of Imam Mahdi Civilization through transparent voluntary contributions.",
      },
    ],
  }),
  component: DonatePage,
});

function DonatePage() {
  const [selectedFund, setSelectedFund] = useState("knowledge");
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [amount, setAmount] = useState("1000");
  const [customAmount, setCustomAmount] = useState("");

  const chosenAmount = amount === "custom" ? customAmount : amount;
  const validAmount = chosenAmount.trim() !== "" && Number(chosenAmount) > 0;
  const fund = FUNDS.find((item) => item.id === selectedFund) ?? FUNDS[0];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="relative isolate overflow-hidden border-b border-gold/20 pt-36 pb-20 sm:pt-44 sm:pb-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(190,151,62,0.16),transparent_48%),radial-gradient(ellipse_at_bottom_left,rgba(13,90,61,0.24),transparent_55%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image: repeating-linear-gradient(45deg,transparent,transparent_22px,rgba(212,175,55,0.7)_23px,transparent_24px)]" />
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-gold sm:text-sm">
            A shared mission · A lasting benefit
          </p>
          <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Help knowledge <span className="text-gold">reach further.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Join a global community supporting Islamic learning, thoughtful research, and an accessible digital platform. Every contribution is voluntary; every purpose should be clear.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href="#support-form" className="inline-flex min-h-12 items-center justify-center rounded-md bg-gold px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110">
              Explore ways to support <span aria-hidden className="ml-2">↓</span>
            </a>
            <Link to="/about" className="inline-flex min-h-12 items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-medium transition hover:border-gold/60 hover:text-gold">
              Learn about our mission
            </Link>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            No pressure. Please give only what you can comfortably afford.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mb-9 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Choose a purpose</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Your support, clearly directed.</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Select the area you want to support. We will not describe a contribution as zakat-eligible, tax-deductible, or delivered to a beneficiary unless that status has been verified.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {FUNDS.map((item) => {
            const active = selectedFund === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => setSelectedFund(item.id)}
                aria-pressed={active}
                className={`group rounded-xl border p-6 text-left transition duration-200 hover:-translate-y-0.5 hover:border-gold/60 ${active ? "border-gold bg-gold/5 shadow-[0_0_0_1px_rgba(212,175,55,0.15)]" : "border-border bg-card/50"}`}
              >
                <span className="flex size-11 items-center justify-center rounded-lg border border-gold/30 text-2xl text-gold">{item.icon}</span>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                <p className="mt-5 border-t border-border pt-4 text-xs leading-5 text-muted-foreground">{item.note}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
                  {active ? "Selected" : "Choose this purpose"} <span aria-hidden>→</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section id="support-form" className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="rounded-2xl border border-border bg-card/50 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Plan your contribution</p>
          <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Choose what works for you.</h2>
          <div className="mt-7">
            <p className="mb-3 text-sm font-medium">Contribution frequency</p>
            <div className="grid grid-cols-2 gap-2 rounded-lg border border-border p-1">
              <button type="button" onClick={() => setFrequency("once")} aria-pressed={frequency === "once"} className={`rounded-md px-4 py-3 text-sm font-medium transition ${frequency === "once" ? "bg-gold text-black" : "text-muted-foreground hover:text-foreground"}`}>One-time</button>
              <button type="button" onClick={() => setFrequency("monthly")} aria-pressed={frequency === "monthly"} className={`rounded-md px-4 py-3 text-sm font-medium transition ${frequency === "monthly" ? "bg-gold text-black" : "text-muted-foreground hover:text-foreground"}`}>Monthly intention</button>
            </div>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">Monthly is an expression of interest only; no recurring payment will be created by this page.</p>
          </div>
          <div className="mt-6">
            <p className="mb-3 text-sm font-medium">Illustrative amount (PKR)</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {["500", "1000", "2500", "5000"].map((value) => (
                <button key={value} type="button" onClick={() => setAmount(value)} aria-pressed={amount === value} className={`rounded-lg border px-3 py-3 text-sm font-semibold transition ${amount === value ? "border-gold bg-gold/10 text-gold" : "border-border hover:border-gold/50"}`}>
                  Rs {Number(value).toLocaleString("en-PK")}
                </button>
              ))}
            </div>
            <label htmlFor="custom-amount" className="mb-2 mt-4 block text-sm font-medium">Or enter another amount (PKR)</label>
            <input id="custom-amount" inputMode="numeric" type="number" min="1" max="100000000" value={amount === "custom" ? customAmount : ""} onChange={(event) => { setAmount("custom"); setCustomAmount(event.target.value); }} placeholder="Enter amount" className="min-h-12 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none transition focus:border-gold" />
          </div>
          <div className="mt-7 rounded-lg border border-gold/25 bg-gold/5 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-gold">Your selection</p>
            <p className="mt-2 font-semibold">{fund.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{frequency === "monthly" ? "Monthly contribution interest" : "One-time contribution"} · {validAmount ? `PKR ${Number(chosenAmount).toLocaleString("en-PK")}` : "Enter a valid amount"}</p>
          </div>
          <Link to="/contact" className={`mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition ${validAmount ? "bg-gold text-black hover:brightness-110" : "pointer-events-none bg-muted text-muted-foreground"}`}>
            Ask about verified payment options <span aria-hidden className="ml-2">→</span>
          </Link>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">This page does not collect money or card details. Contact the team to confirm the recipient, available payment method, and receipt process before sending funds.</p>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-border p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Trust before transactions</p>
            <h2 className="mt-3 text-2xl font-semibold">Know where your money goes.</h2>
            <ul className="mt-6 space-y-4 text-sm leading-6 text-muted-foreground">
              <li className="flex gap-3"><span className="text-gold">✓</span><span>Confirm the legal recipient and payment account before transferring money.</span></li>
              <li className="flex gap-3"><span className="text-gold">✓</span><span>Ask for a receipt and a clear explanation of how the contribution will be used.</span></li>
              <li className="flex gap-3"><span className="text-gold">✓</span><span>Look for dated progress updates and financial reporting as projects are delivered.</span></li>
              <li className="flex gap-3"><span className="text-gold">✓</span><span>Do not send money if the recipient or purpose cannot be verified.</span></li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-gradient-to-br from-emerald-950/40 to-card p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">A shared knowledge mission</p>
            <blockquote className="mt-4 text-lg leading-8">
              “The best contribution is one given willingly, with a clear purpose and trust in how it will be used.”
            </blockquote>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">A mission statement, not a religious quotation.</p>
            <Link to="/about" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:underline">Explore our mission <span aria-hidden>→</span></Link>
          </div>
        </aside>
      </section>
      <SiteFooter />
    </main>
  );
}
