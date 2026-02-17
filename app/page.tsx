import About from "./components/about/About";
import Footer from "./components/footer/Footer";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Works from "./components/works/Works";

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
