import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { UnifiedTicker } from "@/components/site/UnifiedTicker";

import { MobileTabBar } from "@/components/site/MobileTabBar";
import { FloatingAi } from "@/components/site/FloatingAi";
import { WelcomeTour } from "@/components/site/WelcomeTour";
import { I18nProvider } from "@/lib/i18n";
import { SignInModal } from "@/components/site/SignInModal";
import { ThemeProvider, useTheme } from "@/lib/theme";
import { adsenseReady, adsenseScriptSrc, ADSENSE_VERIFICATION } from "@/lib/adsense";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { initGoogleAnalytics, trackPageView } from "@/lib/analytics";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Imam Mahdi Civilization — Digital Islamic Platform" },
      { name: "description", content: "A global digital civilization uniting knowledge, media, AI, and community in service of truth. Join Imam Mahdi Civilization." },
      { name: "author", content: "Imam Mahdi Civilization" },
      { name: "google-site-verification", content: "swS7BQaG-RFOuL0Dj3b0h9sGMX6ZHTivcbF5u8gj7W4" },
      { property: "og:title", content: "Imam Mahdi Civilization — Digital Islamic Platform" },
      { property: "og:description", content: "A global digital civilization uniting knowledge, media, AI, and community in service of truth. Join Imam Mahdi Civilization." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@ImamofImamMahdi" },
      { name: "twitter:title", content: "Imam Mahdi Civilization — Digital Islamic Platform" },
      { name: "twitter:description", content: "A global digital civilization uniting knowledge, media, AI, and community in service of truth. Join Imam Mahdi Civilization." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/724a808a-8964-4d2f-94ab-a9302764e1a1/id-preview-3f09c7ec--060bee1d-b88b-4791-8b0c-2e71ff0b5e89.lovable.app-1781521558602.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/724a808a-8964-4d2f-94ab-a9302764e1a1/id-preview-3f09c7ec--060bee1d-b88b-4791-8b0c-2e71ff0b5e89.lovable.app-1781521558602.png" },
      ...(ADSENSE_VERIFICATION
        ? [{ name: "google-adsense-account", content: ADSENSE_VERIFICATION }]
        : []),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400&family=Noto+Nastaliq+Urdu:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,700&family=Vazirmatn:wght@300;400;500;600;700&display=swap" },
      { rel: "preconnect", href: "https://cdn.onesignal.com" },
      { rel: "preconnect", href: "https://translate.googleapis.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://translate.google.com" },
    ],
    scripts: [
      ...(adsenseReady()
        ? [
            {
              async: true,
              src: adsenseScriptSrc(),
              crossOrigin: "anonymous" as const,
              "data-adsense": "1",
            },
          ]
        : []),
      {
        src: "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js",
        async: true,
        defer: true,
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Imam Mahdi Civilization",
          alternateName: "Mahdi Civilization",
          url: "https://imammahdicivilizition.com",
          email: "imammahdicivilization@gmail.com",
          description:
            "The world's first Islamic digital civilization — uniting Quran, Hadith, education, AI and community.",
          sameAs: [
            "https://youtube.com/@imammahdicivilization",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
          inLanguage: "en",
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE_URL}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <meta name="google-site-verification" content="XGZ08tgLwZVaAdWgxtbvPyU8Egys3g97j_kLrzxbj4U" />
        <meta name="google-site-verification" content="XZaFstZOZY6xOdP6IMypUSrU1y0be8mzJcqjC9nNF0A" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    initGoogleAnalytics();
  }, []);

  useEffect(() => {
    const pathname = router.state.location.pathname;
    if (pathname) {
      trackPageView(pathname);
    }
  }, [router.state.location.pathname]);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => sub.subscription.unsubscribe();
  }, [router, queryClient]);

  useEffect(() => {
    const w = window as typeof window & {
      OneSignalDeferred?: Array<(os: { init: (o: { appId: string }) => Promise<void> }) => Promise<void>>;
    };
    w.OneSignalDeferred = w.OneSignalDeferred || [];
    w.OneSignalDeferred.push(async (OneSignal) => {
      await OneSignal.init({ appId: "7ce9cb53-5a77-4c6a-998e-50cee7aec519" });
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <I18nProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-[100] focus:bg-gold focus:text-primary-foreground focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-[0.2em]"
          >
            Skip to content
          </a>
          <UnifiedTicker />
          <main id="main" className="pb-24 md:pb-0">
            <Outlet />
          </main>
          <SignInModal />
          <FloatingAi />
          <WelcomeTour />
          <MobileTabBar />
          <ThemedToaster />
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function ThemedToaster() {
  const { theme } = useTheme();
  return <Toaster theme={theme} position="top-center" richColors />;
}
