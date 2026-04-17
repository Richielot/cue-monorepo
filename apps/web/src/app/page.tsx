import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Logos } from "@/components/landing/logos";

// Dynamically import below-the-fold sections with fallbacks
const Features = dynamic(() =>
  import("@/components/landing/features").then((mod) => ({ default: mod.Features })),
  {
    loading: () => <div className="h-96 bg-gradient-to-b from-transparent to-gray-50" />,
  }
);

const HowItWorks = dynamic(() =>
  import("@/components/landing/how-it-works").then((mod) => ({ default: mod.HowItWorks })),
  {
    loading: () => <div className="h-96 bg-gray-50" />,
  }
);

const Pricing = dynamic(() =>
  import("@/components/landing/pricing").then((mod) => ({ default: mod.Pricing })),
  {
    loading: () => <div className="h-96 bg-gradient-to-b from-transparent to-gray-50" />,
  }
);

const WaitlistSection = dynamic(() =>
  import("@/components/landing/waitlist-section").then((mod) => ({
    default: mod.WaitlistSection,
  })),
  {
    loading: () => <div className="h-[600px] bg-gray-900" />,
  }
);

const Footer = dynamic(() =>
  import("@/components/landing/footer").then((mod) => ({ default: mod.Footer })),
  {
    loading: () => <div className="h-32 bg-gray-900" />,
  }
);

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Logos />
        <Suspense fallback={<div className="h-96 bg-white" />}>
          <Features />
        </Suspense>
        <Suspense fallback={<div className="h-96 bg-gray-50" />}>
          <HowItWorks />
        </Suspense>
        <Suspense fallback={<div className="h-96 bg-white" />}>
          <Pricing />
        </Suspense>
        <Suspense fallback={<div className="h-[600px] bg-gray-900" />}>
          <WaitlistSection />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-32 bg-gray-900" />}>
        <Footer />
      </Suspense>
    </>
  );
}
