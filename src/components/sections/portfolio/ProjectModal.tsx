import { AnimatePresence, motion } from "framer-motion";
import { FiCalendar, FiExternalLink, FiTag, FiTool, FiUser, FiX } from "react-icons/fi";
import type { ProjectItem } from "../../../data/projects";

type ProjectModalProps = {
  project: ProjectItem | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        /* ── backdrop ── */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07040F]/85 px-4 py-6 backdrop-blur-2xl"
          onClick={onClose}
        >
          {/* ── modal card ── */}
          <motion.div
            initial={{ y: 32, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 32, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#0F0A1E] shadow-[0_40px_120px_rgba(0,0,0,0.65)]"
          >
            {/* top gradient accent */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7A1CAC]/70 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(122,28,172,0.18),transparent_45%)]" />

            {/* close button */}
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="absolute left-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
              aria-label="إغلاق"
            >
              <FiX />
            </motion.button>

            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">

              {/* ── image side ── */}
              <div className="relative overflow-hidden">
                <motion.img
                  initial={{ scale: 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  src={project.image}
                  alt={project.title}
                  className="h-full min-h-[280px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(122,28,172,0.25),transparent_50%),linear-gradient(180deg,transparent_55%,rgba(11,7,19,0.6))]" />

                {/* category pill over image */}
                <div className="absolute bottom-4 right-4">
                  <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.26em] text-white/80 backdrop-blur-md">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* ── info side ── */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.45 }}
                className="relative flex flex-col gap-5 p-6 sm:p-8"
              >
                {/* title */}
                <div>
                  <h3 className="text-2xl font-semibold leading-snug tracking-[-0.03em] text-white sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">
                    {project.details}
                  </p>
                </div>

                {/* divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* meta grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/5 p-4">
                    <FiUser className="mt-0.5 shrink-0 text-[#F5B300]" />
                    <div>
                      <div className="text-[0.6rem] uppercase tracking-[0.24em] text-white/45">
                        العميل
                      </div>
                      <div className="mt-1 text-sm font-medium text-white">
                        {project.client}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/5 p-4">
                    <FiCalendar className="mt-0.5 shrink-0 text-[#F5B300]" />
                    <div>
                      <div className="text-[0.6rem] uppercase tracking-[0.24em] text-white/45">
                        التاريخ
                      </div>
                      <div className="mt-1 text-sm font-medium text-white">
                        {project.date}
                      </div>
                    </div>
                  </div>
                </div>

                {/* category */}
                <div className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/5 p-4">
                  <FiTag className="mt-0.5 shrink-0 text-[#F5B300]" />
                  <div>
                    <div className="text-[0.6rem] uppercase tracking-[0.24em] text-white/45">
                      التصنيف
                    </div>
                    <div className="mt-1 text-sm font-medium text-white">
                      {project.category}
                    </div>
                  </div>
                </div>

                {/* software */}
                <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <FiTool className="text-[#F5B300]" />
                    <div className="text-[0.6rem] uppercase tracking-[0.24em] text-white/45">
                      البرامج المستخدمة
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.software.map((sw, i) => (
                      <motion.span
                        key={sw}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.25 + i * 0.07 }}
                        className="rounded-full border border-[rgba(245,179,0,0.2)] bg-[rgba(245,179,0,0.06)] px-3 py-1.5 text-xs font-medium text-[#F5B300]/90"
                      >
                        {sw}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* external link button */}
                {project.link && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#7A1CAC] via-[#4B0D73] to-[#7A1CAC] px-5 py-4 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(122,28,172,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_55px_rgba(122,28,172,0.5)]"
                  >
                    <FiExternalLink className="text-base transition-transform duration-300 group-hover:scale-110" />
                    عرض المشروع كاملاً
                  </motion.a>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
