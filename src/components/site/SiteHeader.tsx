import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { SocialIcons } from "./SocialIcons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useI18n } from "@/lib/i18n";
import { SearchPalette, useSearchPalette } from "./SearchPalette";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationBell } from "./NotificationBell";
import { SadaqahTrigger } from "./SadaqahModal";
import mahdiLogo from "@/assets/mahdi-logo.png";

const NAV_LINKS = [
  { to: "/articles", label: "Articles" },
  { to: "/quran", label: "Quran" },
  { to: "/hadith", label: "Hadith" },
  { to: "/tafsir-al-mizan", label: "Tafsir" },
  { to: "/library", label: "Library" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const MOBILE_LINKS = [
  { to: "/articles", label: "Articles" },
  { to: "/quran", label: "Quran" },
  { to: "/hadith", label: "Hadith" },
  { to: "/tafsir-al-mizan", label: "Tafsir" },
  { to: "/library", label: "Library" },
  { to: "/academy-ai", label: "Mahdi AI Academy" },
  { to: "/duas", label: "Duas" },
  { to: "/daily", label: "Daily Devotion" },
  { to: "/discussions", label: "Discussions" },
  { to: "/realms", label: "Eight Realms" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/donate", label: "Donate" },
  { to: "/shop", label: "Shop" },
];

export function SiteHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useI18n();
  const { open: searchOpen, setOpen: setSearchOpen } = useSearchPalette();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/75 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <img
            loading="eager"
            fetchPriority="high"
            decoding="async"
            src={mahdiLogo}
            alt="Imam Mahdi Civilization logo"
            width={1024}
            height={1024}
            className="size-11 object-contain drop-shadow-[0_0_12px_color-mix(in_oklab,var(--gold)_35%,transparent)] transition-transform group-hover:scale-105"
          />
          <span className="font-bold text-sm tracking-[0.2em] uppercase hidden sm:inline">
            Imam Mahdi Civilization
          </span>
        </Link>

        {/* Desktop Primary Content Navigation */}
        <div className="hidden lg:flex gap-5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-gold transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link to="/dashboard" className="hover:text-gold transition-colors py-1">
              {t("nav.dashboard")}
            </Link>
          )}
          <Link to="/donate" className="hover:text-gold text-gold/90 transition-colors py-1">
            {t("nav.donate")}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search the civilization"
            className="group flex items-center gap-2 rounded-md border border-border px-3 h-9 text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-gold/60 hover:text-gold"
          >
            <span aria-hidden className="text-sm leading-none">⌕</span>
            <span className="hidden xl:inline">Search</span>
            <kbd className="hidden xl:inline font-mono-display text-[9px] text-muted-foreground/60 border border-border rounded px-1 py-0.5">
              ⌘K
            </kbd>
          </button>
          <SocialIcons className="hidden xl:flex" iconClass="size-3.5" />
          <LanguageSwitcher />
          <ThemeToggle />
          <NotificationBell user={user} />
          {user ? (
            <button
              onClick={() => supabase.auth.signOut()}
              className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors"
            >
              {t("nav.signout")}
            </button>
          ) : (
            <Link
              to="/auth"
              className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors hidden sm:inline"
            >
              {t("nav.signin")}
            </Link>
          )}
          <SadaqahTrigger />
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 text-muted-foreground hover:text-gold"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="lg:hidden border-b border-border bg-background/95 backdrop-blur-md px-6 py-6 space-y-3">
          {MOBILE_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="block text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-gold py-1"
            >
              {link.label}
            </Link>
          ))}
          {!user && (
            <Link
              to="/auth"
              onClick={() => setMenuOpen(false)}
              className="block text-sm uppercase tracking-[0.2em] text-gold py-1"
            >
              {t("nav.signin")}
            </Link>
          )}
        </div>
      )}

      <SearchPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </nav>
  );
}
