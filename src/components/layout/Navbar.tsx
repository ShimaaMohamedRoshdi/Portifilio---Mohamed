import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowLeft, FiMenu, FiX } from "react-icons/fi";
import type { NavigationItem } from "../../data/navigation";
import { LogoMark } from "./LogoMark";

type NavbarProps = {
  items: NavigationItem[];
  onNavigate: (href: string) => void;
  currentPath: string;
};

const menuVariants = {
  closed: { opacity: 0, y: -10, scale: 0.98 },
  open: { opacity: 1, y: 0, scale: 1 },
};

export function Navbar({ items, onNavigate, currentPath }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 12);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavigate = (href: string) => {
    onNavigate(href);
    setMenuOpen(false);
  };

  return (
    <header
      className={
        scrolled
          ? "sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0713]/75 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
          : "sticky top-0 z-50 w-full border-b border-transparent bg-transparent"
      }
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3 sm:px-8 lg:px-10">

        {/* ── Logo ── */}
        <button
          type="button"
          onClick={() => handleNavigate("/")}
          className="group flex items-center"
          aria-label="العودة إلى الرئيسية"
        >
          <LogoMark size="sm" />
        </button>

        {/* ── Desktop nav ── */}
        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-2xl lg:flex">
          {items.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => handleNavigate(item.href)}
              className={`rounded-full px-4 py-3 text-sm font-medium transition duration-300 hover:bg-white/10 hover:text-white ${
                currentPath === item.href
                  ? "bg-white/10 text-white"
                  : "text-white/72"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavigate("/contact"); }}
            className="hidden items-center gap-2 rounded-full border border-[rgba(245,179,0,0.32)] bg-[rgba(245,179,0,0.1)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#F5B300] transition duration-300 hover:-translate-y-0.5 hover:bg-[rgba(245,179,0,0.16)] sm:inline-flex"
          >
            ابدأ مشروعك
            <FiArrowLeft />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/20 hover:bg-white/10 lg:hidden"
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="border-t border-white/10 bg-[#0B0713]/95 px-5 pb-6 pt-4 shadow-[0_20px_60px_rgba(0,0,0,0.38)] backdrop-blur-2xl lg:hidden sm:px-8"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-3">
              {items.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleNavigate(item.href)}
                  className="rounded-[1.35rem] border border-white/10 bg-white/5 px-5 py-4 text-right text-sm font-medium text-white/82 transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavigate("/contact"); }}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7A1CAC] via-[#4B0D73] to-[#7A1CAC] px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-white shadow-[0_18px_50px_rgba(122,28,172,0.35)]"
              >
                ابدأ مشروعك
                <FiArrowLeft />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
