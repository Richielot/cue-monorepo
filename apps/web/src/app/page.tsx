import {
  CTA,
  Features,
  Footer,
  Hero,
  HowItWorks,
  Logos,
  Navbar,
  Pricing,
} from "@/components/landing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Logos />
        <Features />
        <HowItWorks />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
