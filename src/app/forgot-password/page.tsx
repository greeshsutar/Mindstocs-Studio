import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthFormSection from '@/components/sections/AuthFormSection';

export const metadata: Metadata = {
  title: 'Forgot Password | Mindstocs Studio',
  description: 'Reset your Mindstocs Studio account password securely via email verification code.',
};

export default function ForgotPasswordPage() {
  return (
    <>
      <Header />
      <main id="main-content" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <AuthFormSection initialTab="forgot-password" />
      </main>
      <Footer />
    </>
  );
}
