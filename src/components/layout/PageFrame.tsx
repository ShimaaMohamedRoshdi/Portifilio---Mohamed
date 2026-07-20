import { motion } from "framer-motion";
import type { ReactNode } from "react";

type PageFrameProps = {
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
  children?: ReactNode;
};

export function PageFrame({
  eyebrow,
  title,
  description,
  accent,
  children,
}: PageFrameProps) {
  return (
    <div className="relative mx-auto flex min-h-[calc(100vh-92px)] max-w-7xl items-center px-5 py-16 sm:px-8 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl sm:p-8 lg:p-12"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(122,28,172,0.22),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(245,179,0,0.08),transparent_30%)]" />
        <div className="relative max-w-3xl">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/70">
            {eyebrow}
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
            {description}
          </p>
          <div className="mt-8 inline-flex rounded-full border border-[rgba(245,179,0,0.26)] bg-[rgba(245,179,0,0.08)] px-5 py-3 text-sm font-semibold text-[#F5B300]">
            {accent}
          </div>
          {children ? <div className="mt-10">{children}</div> : null}
        </div>
      </motion.div>
    </div>
  );
}
