import Hero from "./components/Hero";
import Bio from "./components/Bio";
import Highlights from "./components/Highlights";
import Assets from "./components/Assets";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Bio />
      <Highlights />
      <Assets />
      <Contact />
    </main>
  );
}
