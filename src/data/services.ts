export type ServiceItem = {
  id: number;
  title: string;
  description: string;
  icon: "logo" | "identity" | "social" | "campaign" | "print" | "guidelines";
};

export const services = [
  {
    id: 1,
    title: "تصميم الشعارات",
    description:
      "شعارات متوازنة، واضحة، وقابلة للتطبيق على مختلف المساحات والوسائط.",
    icon: "logo",
  },
  {
    id: 2,
    title: "الهوية البصرية",
    description: "نظام بصري متكامل يوحّد حضور العلامة في كل نقطة تواصل.",
    icon: "identity",
  },
  {
    id: 3,
    title: "تصميم منشورات السوشيال ميديا",
    description: "تصاميم جذابة ومنظمة ترفع التفاعل وتحافظ على اتساق الهوية.",
    icon: "social",
  },
  {
    id: 4,
    title: "الحملات الإعلانية",
    description: "أفكار بصرية مؤثرة تدعم أهداف الحملات وتوضح الرسالة بسرعة.",
    icon: "campaign",
  },
  {
    id: 5,
    title: "المطبوعات",
    description:
      "مواد مطبوعة مرتبة ومهنية تناسب العرض والتوزيع والطباعة الدقيقة.",
    icon: "print",
  },
  {
    id: 6,
    title: "Brand Guidelines",
    description:
      "دليل استخدام يحافظ على ثبات الهوية وسهولة تطبيقها داخليًا وخارجيًا.",
    icon: "guidelines",
  },
] as const satisfies ServiceItem[];
