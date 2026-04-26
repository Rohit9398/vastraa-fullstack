import Hero from "../components/Hero";
import Features from "../components/Features";
import FeaturedProducts from "../components/FeaturedProducts";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedProducts />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
    </>
  );
}
