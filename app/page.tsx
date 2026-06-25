import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import WhyUs from "@/components/landing/WhyUs";
import Process from "@/components/landing/Process";
import Projects from "@/components/landing/Projects";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import EnquiryForm from "@/components/landing/EnquiryForm";
import FinalCta from "@/components/landing/FinalCta";
import Footer from "@/components/landing/Footer";
import { THEME } from "@/lib/site";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main style={{ background: THEME.bg, color: THEME.text }}>
        <Hero />
        <WhyUs />
        <Process />
        <Projects />
        <Pricing />
        <Testimonials />
        <EnquiryForm />
        <FinalCta />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
