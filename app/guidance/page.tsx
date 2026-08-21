import { Suspense } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { GuidanceWorkspace } from '@/components/guidance-workspace';

export default function GuidancePage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="container py-12 text-center text-ink/60">Loading workspace...</div>}>
        <GuidanceWorkspace />
      </Suspense>
      <Footer />
    </>
  );
}
