import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/hero/Hero';
import TechMarquee from '@/components/sections/TechMarquee';
import BusinessIntro from '@/components/sections/BusinessIntro';
import CoreServices from '@/components/sections/CoreServices';
import ProblemSelector from '@/components/sections/ProblemSelector';
import SelectedWork from '@/components/sections/SelectedWork';
import WhyMindstocs from '@/components/sections/WhyMindstocs';
import Process from '@/components/sections/Process';
import Technology from '@/components/sections/Technology';
import FAQ from '@/components/sections/FAQ';
import ContactCTA from '@/components/sections/ContactCTA';
import Location from '@/components/sections/Location';
import JSONLD from '@/components/layout/JSONLD';

export default function Home() {
  return (
    <>
      <JSONLD type="Organization" data={{}} />
      <JSONLD type="LocalBusiness" data={{}} />
      <Header />
      <main id="main-content">
        {/* 01 */}
        <Hero />
        {/* Tech Marquee */}
        <TechMarquee />
        {/* 02 */}
        <BusinessIntro />
        {/* 03 */}
        <CoreServices />
        {/* 04 */}
        <ProblemSelector />
        {/* 06 */}
        <SelectedWork />
        {/* 08 */}
        <WhyMindstocs />
        {/* 09 */}
        <Process />
        {/* 10 */}
        <Technology />
        {/* 13 */}
        <FAQ />
        {/* 14 */}
        <ContactCTA />
        {/* 15 */}
        <Location />
      </main>
      <Footer />
    </>
  );
}
