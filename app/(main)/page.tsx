import { HeroSection } from '../../src/features/home/HeroSection';
import { PartnerLogos } from '../../src/features/home/PartnerLogos';
import { PopularDestinations } from '../../src/features/home/PopularDestinations';
import { OffersSection } from '../../src/features/home/OffersSection';
import { TestimonialSection } from '../../src/features/home/TestimonialSection';

export default function Home() {
  return (
    <div className="flex flex-col gap-8 md:gap-16">
      <HeroSection />
      <PartnerLogos />
      <PopularDestinations />
      <OffersSection />
      <TestimonialSection />
    </div>
  );
}
