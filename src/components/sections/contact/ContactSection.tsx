import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiInstagram,
  FiMail,
  FiMessageCircle,
  FiSend,
  FiUser,
  FiLinkedin,
  FiShare2,
} from "react-icons/fi";

/* ─────────────────────────────────────────────
   Framer-Motion variants
───────────────────────────────────────────── */
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

const cardVariants = {
  hidden: { opacity: 0, x: 32 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: i * 0.12 },
  }),
};

/* ─────────────────────────────────────────────
   Static contact info cards
───────────────────────────────────────────── */
const contactCards = [
  {
    id: 1,
    icon: FiMail,
    label: "البريد الإلكتروني",
    value: "mohammeddesign9@gmail.com",
    href: "mailto:mohammeddesign9@gmail.com",
    color: "rgba(122,28,172,0.85)",
  },
  {
    id: 2,
    icon: FiMessageCircle,
    label: "واتساب",
    value: "+972597764770",
    href: "https://wa.me/972597764770",
    color: "rgba(37,211,102,0.85)",
  },
  {
    id: 3,
    icon: FiLinkedin,
    label: "لينكدإن",
    value: "Mohammed Dababish",
    href: "https://www.linkedin.com/in/mohammed-dababish-b80021329/",
    color: "rgba(0,119,181,0.85)",
  },
  {
    id: 4,
    icon: FiShare2,
    label: "فيسبوك",
    value: "MohammeDababish",
    href: "https://www.facebook.com/MohammeDababish",
    color: "rgba(59,89,152,0.85)",
  },
  {
    id: 5,
    icon: FiInstagram,
    label: "إنستغرام",
    value: "@moh_abohamza",
    href: "https://www.instagram.com/moh_abohamza/",
    color: "rgba(225,48,108,0.85)",
  },
];

/* ─────────────────────────────────────────────
   Input / Textarea helper component
───────────────────────────────────────────── */
type FieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isTextarea?: boolean;
  rows?: number;
  error?: string;
};

function Field({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  isTextarea = false,
  rows = 5,
  error,
}: FieldProps) {
  const base =
    "w-full rounded-2xl border bg-white/5 px-5 py-4 text-sm text-white placeholder:text-white/35 outline-none transition duration-300 focus:border-[rgba(245,179,0,0.55)] focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(245,179,0,0.12)] resize-none";

  return (
    <motion.div variants={itemVariants} className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-xs font-medium uppercase tracking-[0.28em] text-white/55"
      >
        {label}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${base} ${error ? "border-red-400/60" : "border-white/10"}`}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${base} ${error ? "border-red-400/60" : "border-white/10"}`}
        />
      )}
      {error ? (
        <span className="text-xs text-red-400/90">{error}</span>
      ) : null}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = "الاسم مطلوب";
    if (!form.email.trim()) next.email = "البريد الإلكتروني مطلوب";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "صيغة البريد الإلكتروني غير صحيحة";
    if (!form.subject.trim()) next.subject = "عنوان الرسالة مطلوب";
    if (!form.message.trim()) next.message = "الرسالة مطلوبة";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate network delay — replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 1600));
    setLoading(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#0B0713] px-3 py-16 text-white sm:px-4 lg:px-6 lg:py-20">
      {/* ── Animated background blobs ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.span
          className="absolute left-[6%] top-[8%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(122,28,172,0.34),rgba(122,28,172,0.06)_55%,transparent_72%)] blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.07, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute right-[4%] top-[20%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(75,13,115,0.3),rgba(75,13,115,0.06)_55%,transparent_72%)] blur-3xl"
          animate={{ x: [0, -22, 0], y: [0, 26, 0], scale: [1, 1.09, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute bottom-[10%] left-[40%] h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(245,179,0,0.16),rgba(245,179,0,0.04)_50%,transparent_72%)] blur-3xl"
          animate={{ x: [0, 16, 0], y: [0, -14, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="relative mx-auto max-w-5xl px-3 sm:px-4 lg:px-6">
        {/* ── Section header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="mb-12"
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] text-white/70"
          >
            <span className="h-2 w-2 rounded-full bg-[#F5B300] shadow-[0_0_18px_rgba(245,179,0,0.9)]" />
            تواصل معي
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.12] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl"
          >
            ابدأ مشروعك الآن
            <br />
            <span className="text-gradient">وتحدّث معي مباشرة.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-xl text-base leading-8 text-white/65 sm:text-lg"
          >
            سواء كان لديك فكرة أو مشروع جاهز، أنا هنا للاستماع والمساعدة في
            تحويله إلى هوية بصرية تستحق الانتباه.
          </motion.p>
        </motion.div>

        {/* ── Two-column grid ── */}
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          {/* ── LEFT: Contact form ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={sectionVariants}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8 lg:p-10"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(122,28,172,0.22),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(245,179,0,0.07),transparent_30%)]" />

            <AnimatePresence mode="wait">
              {submitted ? (
                /* ── Success state ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="relative flex flex-col items-center justify-center gap-6 py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                      delay: 0.1,
                    }}
                    className="flex h-20 w-20 items-center justify-center rounded-full border border-[rgba(245,179,0,0.35)] bg-[rgba(245,179,0,0.12)] text-[#F5B300] shadow-[0_0_40px_rgba(245,179,0,0.25)]"
                  >
                    <FiCheckCircle className="text-4xl" />
                  </motion.div>

                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      تم إرسال رسالتك!
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/65">
                      شكرًا على تواصلك، سأرد عليك في أقرب وقت ممكن.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/75 transition duration-300 hover:bg-white/10 hover:text-white"
                  >
                    إرسال رسالة أخرى
                  </button>
                </motion.div>
              ) : (
                /* ── Form ── */
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative flex flex-col gap-5"
                  noValidate
                >
                  <motion.div
                    variants={itemVariants}
                    className="mb-2 flex items-center gap-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#F5B300]">
                      <FiSend className="text-base" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">
                      أرسل رسالتك
                    </h2>
                  </motion.div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      id="name"
                      label="الاسم الكامل"
                      placeholder="محمد عبدالله"
                      value={form.name}
                      onChange={update("name")}
                      error={errors.name}
                    />
                    <Field
                      id="email"
                      label="البريد الإلكتروني"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={update("email")}
                      error={errors.email}
                    />
                  </div>

                  <Field
                    id="subject"
                    label="عنوان الرسالة"
                    placeholder="تصميم هوية بصرية لمشروعي"
                    value={form.subject}
                    onChange={update("subject")}
                    error={errors.subject}
                  />

                  <Field
                    id="message"
                    label="تفاصيل المشروع"
                    placeholder="أخبرني عن مشروعك، أهدافك، والنتيجة التي تريد الوصول إليها..."
                    value={form.message}
                    onChange={update("message")}
                    isTextarea
                    rows={6}
                    error={errors.message}
                  />

                  <motion.div variants={itemVariants}>
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#7A1CAC] via-[#4B0D73] to-[#7A1CAC] px-8 py-5 text-sm font-semibold uppercase tracking-[0.24em] text-white shadow-[0_18px_60px_rgba(122,28,172,0.4)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_26px_80px_rgba(122,28,172,0.55)] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)] -translate-x-full transition duration-700 group-hover:translate-x-full" />
                      {loading ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 0.9,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                          />
                          جاري الإرسال...
                        </>
                      ) : (
                        <>
                          إرسال الرسالة
                          <FiArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
                        </>
                      )}
                    </button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── RIGHT: Info column ── */}
          <div className="flex flex-col gap-5">
            {/* Contact cards */}
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.a
                  key={card.id}
                  href={card.href}
                  target="_blank"
                  rel="noreferrer"
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-[0_12px_50px_rgba(0,0,0,0.2)] backdrop-blur-2xl transition duration-300 hover:border-white/20"
                >
                  <div
                    className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at top left, ${card.color}22, transparent 55%)`,
                    }}
                  />
                  <div className="relative flex items-center gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl"
                      style={{ color: card.color.replace("0.85", "1") }}
                    >
                      <Icon />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs uppercase tracking-[0.26em] text-white/50">
                        {card.label}
                      </div>
                      <div className="mt-1 truncate text-sm font-medium text-white">
                        {card.value}
                      </div>
                    </div>
                    <FiArrowLeft className="mr-auto shrink-0 text-white/30 transition duration-300 group-hover:text-white/80 group-hover:-translate-x-1" />
                  </div>
                </motion.a>
              );
            })}

            {/* Availability badge */}
            <motion.div
              custom={contactCards.length}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={cardVariants}
              className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(122,28,172,0.18),rgba(245,179,0,0.06))] p-6 shadow-[0_12px_50px_rgba(0,0,0,0.2)] backdrop-blur-2xl"
            >
              <div className="flex items-center gap-3">
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                />
                <span className="text-sm font-medium text-emerald-400">
                  متاح للمشاريع الجديدة
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-white/65">
                وقت الاستجابة عادةً خلال{" "}
                <span className="font-semibold text-[#F5B300]">24 ساعة</span>.
                لا تتردد في التواصل، كل فكرة تستحق أن تُسمع.
              </p>
            </motion.div>

            {/* Decorative quote card */}
            <motion.div
              custom={contactCards.length + 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={cardVariants}
              className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl"
            >
              <div className="absolute -right-4 -top-4 text-[8rem] leading-none text-[#7A1CAC]/15 select-none">
                "
              </div>
              <div className="relative flex items-start gap-4">
                <motion.div
                  animate={{ rotate: [0, 6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl text-[#F5B300] shadow-[0_0_22px_rgba(245,179,0,0.18)]"
                >
                  <FiUser />
                </motion.div>
                <div>
                  <p className="text-sm leading-7 text-white/75">
                    التصميم الجيد لا يُرى فقط، بل يُشعر به. أنا هنا لأصنع لك
                    هوية تتحدث قبل أن تتحدث أنت.
                  </p>
                  <div className="mt-3 text-xs uppercase tracking-[0.28em] text-[#F5B300]/80">
                    — محمد، مصمم جرافيك
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
