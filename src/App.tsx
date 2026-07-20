import { useEffect, useMemo, useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { AboutSection } from "./components/sections/about/AboutSection";
import { navigationItems } from "./data/navigation";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { ServicesPage } from "./pages/ServicesPage";

type Pathname = "/" | "/about" | "/services" | "/portfolio" | "/contact";

function usePathname() {
  const [pathname, setPathname] = useState<Pathname>(
    (window.location.pathname as Pathname) || "/",
  );

  useEffect(() => {
    const onPopState = () => setPathname((window.location.pathname as Pathname) || "/");
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return [pathname, setPathname] as const;
}

export default function App() {
  const [pathname, setPathname] = usePathname();

  const navigate = useMemo(
    () => (href: string) => {
      if (window.location.pathname !== href) {
        window.history.pushState({}, "", href);
      }

      setPathname(href as Pathname);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setPathname],
  );

  const page = (() => {
    switch (pathname) {
      case "/about":
        return <AboutSection />;
      case "/services":
        return <ServicesPage />;
      case "/portfolio":
        return <PortfolioPage />;
      case "/contact":
        return <ContactPage />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  })();

  return (
    <div className="min-h-screen bg-[#0B0713] text-white">
      <Navbar items={navigationItems} currentPath={pathname} onNavigate={navigate} />
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(122,28,172,0.22),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(245,179,0,0.06),transparent_18%)]" />
        {page}
      </main>
      <Footer onNavigate={navigate} currentPath={pathname} />
    </div>
  );
}
