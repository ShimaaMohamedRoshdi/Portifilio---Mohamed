import { motion } from "framer-motion";
import {
  FiLink,
  FiArrowLeft,
  FiHeart,
  FiInstagram,
  FiMail,
  FiMessageCircle,
} from "react-icons/fi";
import { siteConfig } from "../../constants/site";
import { navigationItems } from "../../data/navigation";
import { LogoMark } from "./LogoMark";


/* ── types ──────────────────────────────────────── */
type FooterProps = {
  onNavigate: (href: string) => void;
  currentPath: string;
};

/* ── social links ───────────────────────────────── */
const socials = [
  {
    label: "Email",
    href: "mailto:mohammeddesign9@gmail.com",
    icon: FiMail,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/972597764770",
    icon: FiMessageCircle,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohammed-dababish-b80021329/",
    icon: FiLink,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/MohammeDababish",
    icon: FiLink,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/moh_abohamza/",
    icon: FiInstagram,
  },
] as const;

/* ── animation variants ─────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

/* ── component ──────────────────────────────────── */
export function Footer({ onNavigate, currentPath }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0B0713]">
      {/* subtle top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7A1CAC]/60 to-transparent" />

      {/* background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -bottom-20 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(122,28,172,0.18),transparent_70%)] blur-3xl" />
        <div className="absolute -bottom-10 right-[10%] h-48 w-80 rounded-full bg-[radial-gradient(circle,rgba(245,179,0,0.07),transparent_70%)] blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
        className="relative mx-auto max-w-5xl px-3 pb-8 pt-14 sm:px-4 lg:px-6"
      >
        {/* ── top row ──────────────────────────────── */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">

          {/* brand block */}
          <motion.div variants={itemVariants}>
            <button
              type="button"
              onClick={() => onNavigate("/")}
              className="group mb-5 inline-flex"
              aria-label="الرئيسية"
            >
              <LogoMark size="md" />
            </button>

            <p className="max-w-xs text-sm leading-7 text-white/55">
              مصمم جرافيك مستقل يصنع هويات بصرية فاخرة تعكس جوهر علامتك
              وتبني حضورًا لا يُنسى.
            </p>

            {/* social icons */}
            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/60 transition duration-300 hover:border-[rgba(245,179,0,0.35)] hover:bg-[rgba(245,179,0,0.08)] hover:text-[#F5B300]"
                >
                  <Icon className="text-base" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* navigation links */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-white/40">
              الصفحات
            </h3>
            <ul className="flex flex-col gap-3">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.href)}
                    className={`group flex items-center gap-2 text-sm transition duration-300 hover:text-white ${
                      currentPath === item.href
                        ? "text-[#F5B300]"
                        : "text-white/55"
                    }`}
                  >
                    <FiArrowLeft
                      className={`text-xs transition duration-300 group-hover:-translate-x-1 ${
                        currentPath === item.href
                          ? "text-[#F5B300]"
                          : "text-white/25"
                      }`}
                    />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA block */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.32em] text-white/40">
              ابدأ معي
            </h3>
            <p className="mb-5 text-sm leading-7 text-white/55">
              لديك مشروع أو فكرة؟ لا تتردد في التواصل — كل علامة تجارية تستحق
              هوية تليق بها.
            </p>
            <button
              type="button"
              onClick={() => onNavigate("/contact")}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7A1CAC] via-[#4B0D73] to-[#7A1CAC] px-5 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-[0_14px_40px_rgba(122,28,172,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(122,28,172,0.5)]"
            >
              ابدأ مشروعك
              <FiArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
            </button>
          </motion.div>
        </div>

        {/* ── divider ──────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        {/* ── bottom row ───────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
          <p className="flex items-center gap-1.5 text-xs text-white/35">
            © {year}
            <span className="text-white/55">{siteConfig.name}</span>
            — جميع الحقوق محفوظة
          </p>

          <p className="flex items-center gap-1.5 text-xs text-white/30">
            صُنع بـ
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#F5B300]"
            >
              <FiHeart className="text-sm" />
            </motion.span>
            في فلسطين
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
