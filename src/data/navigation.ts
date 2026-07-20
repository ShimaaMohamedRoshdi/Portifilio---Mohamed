export type NavigationItem = {
  label: string;
  href: string;
};

export const navigationItems: NavigationItem[] = [
  { label: "الرئيسية", href: "/" },
  { label: "من أنا", href: "/about" },
  { label: "الخدمات", href: "/services" },
  { label: "معرض الأعمال", href: "/portfolio" },
  { label: "تواصل معي", href: "/contact" },
];
