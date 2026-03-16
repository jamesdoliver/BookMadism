import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import LiveSet from "./components/LiveSet";
import Bio from "./components/Bio";
import Assets from "./components/Assets";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Highlights />
      <LiveSet />
      <Bio />
      <Assets />
      <Contact />
    </main>
  );
}
