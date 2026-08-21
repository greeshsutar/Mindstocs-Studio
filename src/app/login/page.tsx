import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthFormSection from '@/components/sections/AuthFormSection';

export const metadata: Metadata = {
  title: 'Client Log In | Mindstocs Studio',
  description: 'Sign in to your Mindstocs Studio client dashboard to manage your projects, invoices, and deliverables.',
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <main id="main-content" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <AuthFormSection initialTab="login" />
      </main>
      <Footer />
    </>
  );
}
