import About from "@/app/components/about/About";
import Footer from "@/app/components/footer/Footer";
import Hero from "@/app/components/hero/Hero";
import Navbar from "@/app/components/navbar/Navbar";
import Works from "@/app/components/works/Works";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Works />
      <About />
      <Footer />
    </>
  );
}
