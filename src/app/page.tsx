import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/hero/Hero';
import BusinessIntro from '@/components/sections/BusinessIntro';
import CoreServices from '@/components/sections/CoreServices';
import Technology from '@/components/sections/Technology';
import ProblemSelector from '@/components/sections/ProblemSelector';
import WhyMindstocs from '@/components/sections/WhyMindstocs';
import Process from '@/components/sections/Process';
import FAQ from '@/components/sections/FAQ';
import ContactCTA from '@/components/sections/ContactCTA';
import Location from '@/components/sections/Location';
import GetConnected from '@/components/sections/GetConnected';
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
        {/* 02 */}
        <BusinessIntro />
        {/* 03: Six Service Cards */}
        <CoreServices />
        {/* 04: Technology Stack directly below six cards */}
        <Technology />
        {/* 05 */}
        <ProblemSelector />
        {/* 06 */}
        <WhyMindstocs />
        {/* 07 */}
        <Process />
        {/* 08 */}
        <FAQ />
        {/* 09 */}
        <ContactCTA />
        {/* 10 */}
        <Location />
        {/* 11: Get Connected — Contact Form */}
        <GetConnected />
      </main>
      <Footer />
    </>
  );
}
