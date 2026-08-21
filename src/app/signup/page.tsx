import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthFormSection from '@/components/sections/AuthFormSection';

export const metadata: Metadata = {
  title: 'Create Account | Mindstocs Studio',
  description: 'Create a new account on Mindstocs Studio with email OTP verification to access the client portal.',
};

export default function SignupPage() {
  return (
    <>
      <Header />
      <main id="main-content" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <AuthFormSection initialTab="signup" />
      </main>
      <Footer />
    </>
  );
}
