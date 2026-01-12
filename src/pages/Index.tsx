import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { TreatmentCardsSection } from '@/components/home/TreatmentCardsSection';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { HealthJourneySection } from '@/components/home/HealthJourneySection';
import { DoctorsSection } from '@/components/home/DoctorsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { StatsSection } from '@/components/home/StatsSection';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <TreatmentCardsSection />
        <WhyChooseUsSection />
        <HealthJourneySection />
        <DoctorsSection />
        <TestimonialsSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;