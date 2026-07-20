import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { services } from "../../../data/services";
import { ServiceCard } from "./ServiceCard";

/* ── why-choose-us bullets ─────────────────────── */
const highlights = [
  "تسليم في الوقت المحدد دائمًا",
  "تعديلات غير محدودة حتى رضاك التام",
  "أسلوب عمل احترافي وتواصل مستمر",
  "خبرة +7 سنوات مع علامات متنوعة",
];

/* ── variants ──────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

/* ── component ─────────────────────────────────── */
export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#0B0713] px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-28"
    >
      {/* ── background ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.span
          style={{ y: blobY }}
          className="absolute right-[4%] top-[5%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(122,28,172,0.28),rgba(122,28,172,0.04)_55%,transparent_72%)] blur-3xl"
        />
        <motion.span
          animate={{ x: [0, -20, 0], y: [0, 22, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[2%] top-[40%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(75,13,115,0.24),transparent_65%)] blur-3xl"
        />
        <motion.span
          animate={{ x: [0, 14, 0], y: [0, -12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[8%] right-[30%] h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(245,179,0,0.13),transparent_65%)] blur-3xl"
        />
        <div className="absolute inset-0 soft-grid opacity-25" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl">

        {/* ── header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="mb-16 grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end"
        >
          <div>
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.32em] text-white/65"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#F5B300] shadow-[0_0_14px_rgba(245,179,0,0.9)]" />
              الخدمات
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="mt-6 text-4xl font-semibold leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.2rem]"
            >
              خدمات احترافية
              <br />
              <span className="text-gradient">تساعد علامتك على التميز.</span>
            </motion.h2>
          </div>

          {/* why-choose bullets */}
          <motion.ul variants={itemVariants} className="flex flex-col gap-3">
            {highlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.09, duration: 0.5 }}
                className="flex items-center gap-3 text-sm text-white/65"
              >
                <FiCheckCircle className="shrink-0 text-[#F5B300]" />
                {h}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ── service cards grid ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>

        {/* ── bottom CTA banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mt-14 overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(122,28,172,0.22),rgba(245,179,0,0.06))] p-8 backdrop-blur-2xl sm:p-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(122,28,172,0.18),transparent_55%),radial-gradient(circle_at_right,rgba(245,179,0,0.07),transparent_45%)]" />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-semibold text-white sm:text-2xl">
                مستعد لبدء مشروعك؟
              </h3>
              <p className="mt-2 text-sm leading-7 text-white/60">
                تواصل معي الآن وأخبرني عن فكرتك — سنحوّلها معًا إلى هوية
                بصرية تستحق الانتباه.
              </p>
            </div>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, "", "/contact");
                window.dispatchEvent(new PopStateEvent("popstate"));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-gradient-to-r from-[#7A1CAC] via-[#4B0D73] to-[#7A1CAC] px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-[0_18px_60px_rgba(122,28,172,0.4)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(122,28,172,0.55)]"
            >
              ابدأ مشروعك
              <FiArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
