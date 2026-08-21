import { Suspense } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { RTIForm } from '@/components/rti-form';

export default function RTI() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="container py-16 text-center text-sm font-bold text-ink/50">Loading RTI Assistant...</div>}>
        <RTIForm />
      </Suspense>
      <Footer />
    </>
  );
}
