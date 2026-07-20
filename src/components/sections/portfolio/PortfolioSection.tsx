import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  projects,
  type ProjectCategory,
} from "../../../data/projects";
import { ProjectCard } from "./ProjectCard";

/* ── filter tabs ──────────────────────────────────── */
const filters: Array<ProjectCategory | "الكل"> = [
  "الكل",
  "هوية بصرية",
  "شعارات",
  "الحملات الإعلانية",
  "سوشيال ميديا",
];

/* ── variants ─────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

/* ── component ────────────────────────────────────── */
export function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "الكل">("الكل");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const filteredProjects = useMemo(
    () =>
      activeFilter === "الكل"
        ? projects
        : projects.filter((p) => p.category === activeFilter),
    [activeFilter],
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#0B0713] px-3 py-12 text-white sm:px-4 lg:px-6 lg:py-16"
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
          className="absolute left-[4%] top-[4%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(122,28,172,0.26),rgba(122,28,172,0.04)_55%,transparent_72%)] blur-3xl"
        />
        <motion.span
          animate={{ x: [0, 20, 0], y: [0, -18, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[3%] top-[30%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(245,179,0,0.1),transparent_65%)] blur-3xl"
        />
        <div className="absolute inset-0 soft-grid opacity-25" />
      </motion.div>

      <div className="relative mx-auto max-w-5xl">

        {/* ── header ── */}
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
            معرض الأعمال
          </motion.span>

          <motion.h2
            variants={itemVariants}
            className="mt-4 text-2xl font-semibold leading-[1.1] tracking-[-0.04em] text-white sm:text-3xl lg:text-4xl"
          >
            أحدث أعمالي
            <br />
            <span className="text-gradient">المميزة والمختارة.</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-3 max-w-xl text-xs leading-6 text-white/55 sm:text-sm"
          >
            انقر على أي مشروع لعرضه كاملاً — كل عمل يحكي قصة علامة تستحق الانتباه.
          </motion.p>
        </motion.div>

        {/* ── filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className={`relative rounded-full border px-4 py-2 text-xs font-medium transition duration-300 ${
                activeFilter === filter
                  ? "border-[rgba(245,179,0,0.4)] bg-[rgba(245,179,0,0.1)] text-[#F5B300] shadow-[0_0_20px_rgba(245,179,0,0.15)]"
                  : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/8 hover:text-white"
              }`}
            >
              {activeFilter === filter && (
                <motion.span
                  layoutId="activeFilter"
                  className="absolute inset-0 rounded-full border border-[rgba(245,179,0,0.3)] bg-[rgba(245,179,0,0.08)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{filter}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* ── project grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="columns-1 gap-3 sm:columns-2 xl:columns-3"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── empty state ── */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center gap-4 py-16 text-center"
          >
            <div className="text-4xl">🎨</div>
            <p className="text-sm text-white/50">لا توجد مشاريع في هذه الفئة حالياً.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
