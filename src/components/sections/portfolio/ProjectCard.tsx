import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import type { ProjectItem } from "../../../data/projects";

type ProjectCardProps = {
  project: ProjectItem;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const handleClick = () => {
    if (project.link) {
      window.open(project.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: "easeOut" }}
      className="group mb-3 break-inside-avoid"
    >
      <button
        type="button"
        onClick={handleClick}
        className="relative block w-full overflow-hidden rounded-[1.4rem] shadow-[0_20px_70px_rgba(0,0,0,0.35)]"
        aria-label={`عرض مشروع ${project.title}`}
      >
        {/* ── image ── */}
        <div className="relative overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="h-auto w-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* base dark vignette */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,7,19,0)_40%,rgba(11,7,19,0.85)_100%)]" />

          {/* hover colour wash */}
          <div className="absolute inset-0 bg-[#7A1CAC]/0 transition-all duration-500 group-hover:bg-[#7A1CAC]/25" />

          {/* ── hover overlay ── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 transition-all duration-400 group-hover:opacity-100">
            {/* big launch icon */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/15 text-white backdrop-blur-md"
            >
              <FiArrowUpRight className="text-lg" />
            </motion.div>

            <span className="rounded-full border border-[rgba(245,179,0,0.5)] bg-[rgba(245,179,0,0.12)] px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-[#F5B300] backdrop-blur-md">
              عرض المشروع
            </span>
          </div>

          {/* category pill — top left */}
          <div className="absolute left-3 top-3">
            <span className="rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-[0.55rem] uppercase tracking-[0.28em] text-white/80 backdrop-blur-md transition duration-300 group-hover:border-[rgba(245,179,0,0.4)] group-hover:text-[#F5B300]">
              {project.category}
            </span>
          </div>

          {/* ── bottom info bar ── */}
          <div className="absolute inset-x-0 bottom-0 p-3 translate-y-1 transition-transform duration-400 group-hover:translate-y-0">
            <div className="flex items-end justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold leading-tight tracking-[-0.02em] text-white drop-shadow-lg">
                  {project.title}
                </h3>
                <p className="mt-0.5 text-[0.6rem] text-white/60">
                  {project.client} · {project.date}
                </p>
              </div>

              {/* arrow badge */}
              <div className="flex h-7 w-7 shrink-0 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition duration-400 group-hover:translate-y-0 group-hover:border-[rgba(245,179,0,0.5)] group-hover:bg-[rgba(245,179,0,0.15)] group-hover:text-[#F5B300]">
                <FiArrowUpRight className="text-xs" />
              </div>
            </div>
          </div>
        </div>
      </button>
    </motion.article>
  );
}
