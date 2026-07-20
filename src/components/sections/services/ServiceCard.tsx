import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiBarChart2,
  FiFileText,
  FiImage,
  FiLayers,
  FiPenTool,
  FiTarget,
} from "react-icons/fi";
import type { ServiceItem } from "../../../data/services";

/* ── icon map ──────────────────────────────────── */
const iconMap = {
  logo:       FiPenTool,
  identity:   FiLayers,
  social:     FiImage,
  campaign:   FiTarget,
  print:      FiFileText,
  guidelines: FiBarChart2,
} as const;

/* ── per-service accent colors ─────────────────── */
const accentMap: Record<ServiceItem["icon"], string> = {
  logo:       "#7A1CAC",
  identity:   "#F5B300",
  social:     "#06B6D4",
  campaign:   "#F43F5E",
  print:      "#8B5CF6",
  guidelines: "#10B981",
};

/* ── card variant ──────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.09, ease: "easeOut" },
  }),
};

type ServiceCardProps = {
  service: ServiceItem;
  index: number;
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon   = iconMap[service.icon];
  const accent = accentMap[service.icon];

  return (
    <motion.article
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={cardVariants}
      whileHover={{ y: -10, transition: { duration: 0.25 } }}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0F0A1E] shadow-[0_16px_60px_rgba(0,0,0,0.28)]"
    >
      {/* animated gradient border on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${accent}55` }}
      />

      {/* top colour wash */}
      <div
        className="absolute inset-x-0 top-0 h-32 opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at top, ${accent}22, transparent 75%)`,
        }}
      />

      {/* number watermark */}
      <div
        className="pointer-events-none absolute right-5 top-4 text-[4.5rem] font-black leading-none opacity-[0.04] transition duration-500 group-hover:opacity-[0.07]"
        style={{ color: accent }}
      >
        {String(service.id).padStart(2, "0")}
      </div>

      {/* card body */}
      <div className="relative flex flex-1 flex-col p-6 sm:p-7">

        {/* icon */}
        <div className="mb-6 flex items-start justify-between">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 3 + index * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl transition duration-300 group-hover:border-white/20"
            style={{
              color: accent,
              boxShadow: `0 0 28px ${accent}35`,
            }}
          >
            <Icon />
          </motion.div>

          {/* arrow — reveals on hover */}
          <motion.div
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 opacity-0 transition duration-300 group-hover:opacity-100"
            whileHover={{ scale: 1.1 }}
          >
            <FiArrowLeft className="text-sm transition-transform duration-300 group-hover:-translate-x-0.5" />
          </motion.div>
        </div>

        {/* title */}
        <h3 className="text-lg font-semibold leading-snug tracking-[-0.02em] text-white">
          {service.title}
        </h3>

        {/* description */}
        <p className="mt-3 flex-1 text-sm leading-7 text-white/60">
          {service.description}
        </p>

        {/* bottom accent bar */}
        <motion.div
          className="mt-6 h-0.5 rounded-full"
          style={{
            background: `linear-gradient(to left, transparent, ${accent}80, transparent)`,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 + index * 0.08, duration: 0.7 }}
        />
      </div>
    </motion.article>
  );
}
