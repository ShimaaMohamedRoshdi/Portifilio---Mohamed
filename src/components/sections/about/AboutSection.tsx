import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  FiArrowLeft,
  FiAward,
  FiCheckCircle,
  FiCode,
  FiStar,
} from "react-icons/fi";
import { AboutCard } from "./AboutCard";
import { aboutContent } from "../../../data/about";
import { siteConfig } from "../../../constants/site";

/* ── variants ─────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const slideLeft = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.75 } },
};

/* ── skills list ──────────────────────────────────── */
const skills = [
  "Illustrator", "Photoshop", "Figma",
  "InDesign", "After Effects", "Brand Identity",
];

/* ── component ────────────────────────────────────── */
export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const blobY1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#0B0713] px-3 py-12 text-white sm:px-4 lg:px-6 lg:py-16"
    >
      {/* ── parallax blobs ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.span
          style={{ y: blobY1 }}
          className="absolute left-[6%] top-[8%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(122,28,172,0.32),rgba(122,28,172,0.05)_55%,transparent_72%)] blur-3xl"
        />
        <motion.span
          style={{ y: blobY2 }}
          className="absolute right-[2%] top-[15%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(75,13,115,0.28),rgba(75,13,115,0.05)_55%,transparent_72%)] blur-3xl"
        />
        <motion.span
          animate={{ x: [0, 18, 0], y: [0, -14, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[38%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(245,179,0,0.16),transparent_65%)] blur-3xl"
        />
        {/* soft grid */}
        <div className="absolute inset-0 soft-grid opacity-30" />
      </motion.div>

      <div className="relative mx-auto max-w-5xl">

        {/* ── section eyebrow ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="mb-8"
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.32em] text-white/65"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#F5B300] shadow-[0_0_14px_rgba(245,179,0,0.9)]" />
            {aboutContent.eyebrow}
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="mt-4 max-w-3xl text-2xl font-semibold leading-[1.12] tracking-[-0.04em] text-white sm:text-3xl lg:text-4xl"
          >
            {aboutContent.title}
          </motion.h2>
        </motion.div>

        {/* ── main two-column grid ── */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">

          {/* ══ LEFT COLUMN ══ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="flex flex-col gap-4"
          >
            {/* bio card */}
            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-6"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(122,28,172,0.2),transparent_50%)]" />

              {/* avatar + name row */}
              <div className="relative mb-4 flex items-center gap-3">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#7A1CAC] via-[#F5B300] to-[#4B0D73] opacity-70 blur-sm" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-[#120D1D] text-2xl font-bold text-white">
                    م
                  </div>
                  {/* online dot */}
                  <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#0B0713] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">
                    {siteConfig.name}
                  </div>
                  <div className="text-sm text-[#F5B300]">
                    {siteConfig.profession}
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="mr-auto flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg text-[#F5B300]"
                >
                  ✦
                </motion.div>
              </div>

              {/* lead */}
              <p className="relative text-sm font-medium leading-6 text-white/90 sm:text-base">
                {aboutContent.lead}
              </p>

              {/* paragraphs */}
              <div className="relative mt-3 space-y-2 text-xs leading-6 text-white/65 sm:text-sm">
                {aboutContent.paragraphs.map((p) => (
                  <p key={p} className="flex gap-3">
                    <FiCheckCircle className="mt-1 shrink-0 text-[#F5B300]" />
                    {p}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* skills bar */}
            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-2xl"
            >
              <div className="mb-3 flex items-center gap-2">
                <FiCode className="text-[#F5B300]" />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  الأدوات والتقنيات
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    whileHover={{ y: -3, scale: 1.05 }}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/75 transition duration-200 hover:border-[rgba(245,179,0,0.35)] hover:text-[#F5B300]"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* CTA row */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            </motion.div>
          </motion.div>

          {/* ══ RIGHT COLUMN ══ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={containerVariants}
            className="flex flex-col gap-5"
          >
            {/* stat cards grid */}
            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-4 shadow-[0_20px_80px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(245,179,0,0.07),transparent_50%)]" />
              <div className="relative grid gap-4 sm:grid-cols-2">
                {aboutContent.cards.map((item, index) => (
                  <AboutCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </motion.div>

            {/* experience timeline card */}
            <motion.div
              variants={slideLeft}
              className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-2xl"
            >
              <div className="mb-3 flex items-center gap-2">
                <FiAward className="text-[#F5B300]" />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  مسيرة العمل
                </span>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { year: "2024 — الآن", role: "مصمم جرافيك مستقل", note: "هويات بصرية وحملات إعلانية" },
                  { year: "2018 — 2024", role: "فريلانس على منصة مستقل", note: "مشاريع متنوعة ومئات العملاء" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.55 }}
                    className="flex items-start gap-4"
                  >
                    {/* timeline dot + line */}
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full border-2 border-[#F5B300] bg-[#F5B300]/30 shadow-[0_0_8px_rgba(245,179,0,0.6)]" />
                      {i < 1 && <div className="mt-1 h-full w-px bg-white/10" style={{ minHeight: "2.5rem" }} />}
                    </div>
                    <div className="pb-2">
                      <div className="text-[0.65rem] uppercase tracking-[0.26em] text-[#F5B300]/80">
                        {item.year}
                      </div>
                      <div className="mt-0.5 text-sm font-semibold text-white">
                        {item.role}
                      </div>
                      <div className="mt-0.5 text-xs text-white/50">
                        {item.note}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* brand quote card */}
            <motion.div
              variants={slideLeft}
              className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(122,28,172,0.15),rgba(245,179,0,0.05))] p-4 backdrop-blur-2xl"
            >
              <div className="absolute -right-3 -top-3 text-[5rem] leading-none text-[#7A1CAC]/12 select-none">
                "
              </div>
              <div className="relative flex items-start gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-xs leading-6 text-white/75">
                    التصميم الجيد لا يُرى فقط، بل يُشعر به — هوية قوية تبدأ
                    من فهم عميق للعلامة وجمهورها.
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                      >
                        <FiStar className="fill-[#F5B300] text-[#F5B300] text-xs" />
                      </motion.span>
                    ))}
                    <span className="text-xs text-white/40">— {siteConfig.name}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
