import { HeroSection } from "../components/sections/hero/HeroSection";

type HomePageProps = {
  onNavigate: (href: string) => void;
};

export function HomePage({ onNavigate }: HomePageProps) {
  return <HeroSection onNavigate={onNavigate} />;
}
