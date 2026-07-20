export type AboutCardItem = {
  id: number;
  value: string;
  title: string;
  description: string;
  icon: "experience" | "clients" | "quality" | "support";
};

export type AboutContent = {
  eyebrow: string;
  title: string;
  lead: string;
  paragraphs: string[];
  cards: AboutCardItem[];
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
};
