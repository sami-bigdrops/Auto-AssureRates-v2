import Navbar from "@/app/_components/Navbar";
import Hero from "@/app/_components/Hero";
import Partners from "@/app/_components/Partners";
import Work from "@/app/_components/Work";
import Choose from "@/app/_components/Choose";
import Testimonials from "@/app/_components/Testimonials";
import CTA from "@/app/_components/CTA";
import Footer from "@/app/_components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Partners />
      <Work />
      <Choose />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
