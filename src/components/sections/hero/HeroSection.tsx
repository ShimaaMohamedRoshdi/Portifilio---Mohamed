import { motion } from "framer-motion";
import { FiArrowLeft, FiPlay } from "react-icons/fi";
import { siteConfig } from "../../../constants/site";
import { useState, useEffect } from "react";
import { ParticleNetwork } from "./ParticleNetwork";

/* ── props ───────────────────────────────────────── */
type HeroSectionProps = {
  onNavigate: (href: string) => void;
};

/* ── animation variants ──────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.94, x: -24 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.9, delay: 0.3 },
  },
};

/* ── stats ───────────────────────────────────────── */
const stats = [
  { value: "+7", label: "سنوات خبرة" },
  { value: "+500", label: "عميل سعيد" },
  { value: "+700", label: "مشروع منجز" },
] as const;

/* ── component ───────────────────────────────────── */
export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      setMousePosition({ x, y });

      // Calculate parallax offset (reduced intensity for subtle effect)
      const parallaxX = (x - window.innerWidth / 2) * 0.02;
      const parallaxY = (y - window.innerHeight / 2) * 0.02;

      setParallaxOffset({ x: parallaxX, y: parallaxY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <section className="relative isolate min-h-[calc(100vh-80px)] overflow-hidden bg-[#0B0713] px-3 py-14 text-white sm:px-4 lg:px-6 lg:py-20">

      {/* ── particle network background ── */}
      <ParticleNetwork />

      {/* ── background blobs ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* mouse-tracking orb 1 */}
        <motion.div
          className="absolute h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(122,28,172,0.25),transparent_70%)] blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 96,
            y: mousePosition.y - 96,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 100 }}
        />

        {/* mouse-tracking orb 2 */}
        <motion.div
          className="absolute h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(245,179,0,0.15),transparent_70%)] blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 128 + 80,
            y: mousePosition.y - 128 - 60,
          }}
          transition={{ type: "spring", damping: 35, stiffness: 90 }}
        />

        <motion.span
          className="absolute right-[2%] top-[6%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(122,28,172,0.28),rgba(122,28,172,0.05)_55%,transparent_72%)] blur-3xl"
          animate={{ x: [0, 28, 0], y: [0, -22, 0], scale: [1, 1.07, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute left-[5%] top-[30%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(75,13,115,0.28),rgba(75,13,115,0.05)_55%,transparent_72%)] blur-3xl"
          animate={{ x: [0, -18, 0], y: [0, 20, 0], scale: [1, 1.09, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute bottom-[8%] left-[38%] h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(245,179,0,0.14),rgba(245,179,0,0.03)_50%,transparent_72%)] blur-3xl"
          animate={{ x: [0, 16, 0], y: [0, -12, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* soft grid overlay */}
        <div className="absolute inset-0 soft-grid opacity-40" />
      </motion.div>

      <div className="relative mx-auto max-w-5xl z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">

          {/* ── LEFT: text ── */}
          <motion.div
            className="order-2 lg:order-1"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
            {/* eyebrow badge */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.32em] text-white/65">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#F5B300] shadow-[0_0_14px_rgba(245,179,0,0.9)]" />
                {siteConfig.brand} · {siteConfig.profession}
              </span>
            </motion.div>

            {/* headline */}
            <motion.h1
              variants={itemVariants}
              className="mt-7 text-[2.6rem] font-semibold leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.4rem] xl:text-[3.8rem]"
            >
              أصنع هويات بصرية
              <br />
              <span className="text-gradient">ترفع قيمة علامتك</span>
              <br />
              وتبني حضورًا لا يُنسى.
            </motion.h1>

            {/* sub-text */}
            <motion.p
              variants={itemVariants}
              className="mt-7 max-w-lg text-base leading-8 text-white/60 sm:text-lg"
            >
              مرحباً، أنا{" "}
              <span className="font-semibold text-white">{siteConfig.name}</span>{" "}
              — مصمم جرافيك مستقل أساعد الأعمال على التميز من خلال هويات
              بصرية مدروسة وحملات إبداعية مؤثرة.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={itemVariants} className="mt-9 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => onNavigate("/portfolio")}
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#7A1CAC] via-[#4B0D73] to-[#7A1CAC] px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-[0_18px_60px_rgba(122,28,172,0.4)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(122,28,172,0.55)]"
              >
                تصفح أعمالي
                <FiArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate("/contact")}
                className="group inline-flex items-center gap-3 rounded-full border border-[rgba(245,179,0,0.3)] bg-[rgba(245,179,0,0.07)] px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#F5B300] transition duration-300 hover:-translate-y-1 hover:bg-[rgba(245,179,0,0.14)]"
              >
                <FiPlay className="text-xs" />
                ابدأ مشروعك
              </button>
            </motion.div>

            {/* stats row */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-wrap gap-6"
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="text-xs uppercase tracking-[0.28em] text-white/45">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: person image ── */}
          <motion.div
            className="order-1 flex justify-center lg:order-2 lg:justify-end"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={imageVariants}
            >
            <div className="relative">
              {/* outer glow ring */}
              <div className="absolute -inset-4 rounded-[2.8rem] bg-[radial-gradient(circle,rgba(122,28,172,0.35),transparent_65%)] blur-2xl" />

              {/* image card */}
              <div className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                {/*
                  ─────────────────────────────────────────────────
                  Place your photo inside  public/images/
                  then set the filename below, e.g.:
                    src="/images/mohamed.jpg"
                  ─────────────────────────────────────────────────
                */}
                <img
                  src="/images/Photo2.jpg"
                  alt={`${siteConfig.name} — ${siteConfig.profession}`}
                  className="h-[420px] w-[320px] object-cover object-top sm:h-[500px] sm:w-[380px]"
                />

                {/* bottom overlay gradient */}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(11,7,19,0.75))]" />

                {/* floating name badge */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="absolute bottom-5 left-4 right-4 rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-[0.28em] text-white/50">
                        {siteConfig.brand}
                      </div>
                      <div className="mt-1 text-base font-semibold text-white">
                        {siteConfig.name} · {siteConfig.profession}
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 8, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg text-[#F5B300] shadow-[0_0_18px_rgba(245,179,0,0.2)]"
                    >
                      ✦
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* floating availability pill */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute -left-6 top-8 flex items-center gap-2 rounded-full border border-white/10 bg-[#0B0713]/80 px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              >
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                />
                <span className="text-xs font-medium text-emerald-400">
                  متاح للمشاريع
                </span>
              </motion.div>

              {/* floating projects badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                className="absolute -right-6 top-1/3 flex flex-col items-center gap-1 rounded-2xl border border-white/10 bg-[#0B0713]/80 px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              >
                <span className="text-2xl font-semibold text-white">+500</span>
                <span className="text-[0.65rem] uppercase tracking-[0.24em] text-white/45">
                  مشروع
                </span>
              </motion.div>
            </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
