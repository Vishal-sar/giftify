import { BestSellersSection } from '../components/best-sellers-section';
import { CategoriesSection } from '../components/categories-section';
import { HeroSection } from '../components/hero-section';

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <CategoriesSection />
      <BestSellersSection />
    </main>
  );
}