import About from "./components/about/About";
import Footer from "./components/footer/Footer";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Works from "./components/works/Works";

export default function Home() {
  return (
    <>
      <Navbar />
      <div>
        <Hero />
      </div>
      <div className="space-y-10 px-10 md:px-15 lg:px-20">
        <Works />
        <About />
      </div>
      <Footer />
    </>
  );
}
