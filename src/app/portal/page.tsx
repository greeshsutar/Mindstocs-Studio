import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthFormSection from '@/components/sections/AuthFormSection';

export const metadata: Metadata = {
  title: 'Client Portal & Inquiries',
  description: 'Sign in to your Mindstocs Studio client dashboard, create an account with email verification, or submit your project brief.',
};

export default function PortalPage() {
  return (
    <>
      <Header />
      <main id="main-content" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <AuthFormSection />
      </main>
      <Footer />
    </>
  );
}
