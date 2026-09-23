import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { ProductCard } from "@/components/site/ShopProduct";
import { SECTIONS } from "@/lib/shop-products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Islamic Products — Imam Mahdi Civilization" },
      {
        name: "description",
        content:
          "Curated Islamic products — books, prayer essentials, perfumes, decor and more. Buy on Amazon.",
      },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Shop Islamic Products — Imam Mahdi Civilization" },
      {
        property: "og:description",
        content:
          "Curated Islamic products — books, prayer essentials, perfumes, decor and more.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://imammahdicivilizition.com/shop" }],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="text-center mb-14">
          <span className="font-arabic text-3xl text-gold/60 block mb-3">المتجر</span>
          <span className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] block mb-4">
            Curated Collection
          </span>
          <h1 className="font-display italic text-4xl md:text-6xl leading-tight">
            Shop Islamic Products
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-muted-foreground">
            A curated selection of Islamic books, prayer essentials, perfumes, decor and more.
          </p>
        </div>

        <div className="space-y-16">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-border">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
                  {section.title}
                </h2>
                <span className="text-[10px] text-muted-foreground/60">
                  {section.products.length} item{section.products.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {section.products.map((product, i) => (
                  <ProductCard key={section.title + i} product={product} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xs text-muted-foreground italic">
            As an Amazon Associate I earn from qualifying purchases.
          </p>
        </div>
      </main>
    </div>
  );
}
