import { motion } from "framer-motion";
import { FiClock, FiHeadphones, FiShield, FiSmile } from "react-icons/fi";
import type { AboutCardItem } from "../../../types/about";

const iconMap = {
  experience: FiClock,
  clients: FiSmile,
  quality: FiShield,
  support: FiHeadphones,
};

const accentMap = {
  experience: "rgba(122,28,172,0.7)",
  clients:    "rgba(245,179,0,0.7)",
  quality:    "rgba(52,211,153,0.7)",
  support:    "rgba(99,102,241,0.7)",
};

type AboutCardProps = {
  item: AboutCardItem;
  index: number;
};

export function AboutCard({ item, index }: AboutCardProps) {
  const Icon  = iconMap[item.icon];
  const color = accentMap[item.icon];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-[0_12px_50px_rgba(0,0,0,0.2)] backdrop-blur-2xl"
    >
      {/* hover color wash */}
      <div
        className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at top left, ${color}22, transparent 60%)`,
        }}
      />

      {/* animated border glow on hover */}
      <div
        className="absolute inset-0 rounded-[1.75rem] opacity-0 transition duration-500 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${color}55` }}
      />

      {/* top row: icon + badge */}
      <div className="relative flex items-start justify-between gap-3">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
          style={{ color, boxShadow: `0 0 22px ${color}40` }}
        >
          <Icon className="text-[1.15rem]" />
        </motion.div>

        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.62rem] font-medium tracking-[0.22em] text-white/40">
          {String(item.id).padStart(2, "0")}
        </span>
      </div>

      {/* value + title + desc */}
      <div className="relative mt-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
          className="text-4xl font-bold tracking-[-0.05em] text-white sm:text-5xl"
          style={{ textShadow: `0 0 40px ${color}60` }}
        >
          {item.value}
        </motion.div>

        <h3 className="mt-2 text-base font-semibold text-white">{item.title}</h3>
        <p className="mt-1.5 text-xs leading-6 text-white/55">{item.description}</p>
      </div>

      {/* bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-4 right-4 h-px rounded-full"
        style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.7 }}
      />
    </motion.article>
  );
}
