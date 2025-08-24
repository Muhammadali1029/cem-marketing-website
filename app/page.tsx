// app/page.tsx
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import FeaturedProducts from '../components/sections/FeaturedProducts';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CtaSection from '../components/sections/CtaSection';
import Footer from '../components/layout/Footer';

export default function HomePage() {
  return (
    <main className="bg-white text-gray-800">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <FeaturedProducts />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}