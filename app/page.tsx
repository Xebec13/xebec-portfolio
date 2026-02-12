import About from "./components/about/About";
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
      <div className="space-y-10 p-10 md:p-15 lg:p-20">
        <Works />
        <About />
      </div>
    </>
  );
}
