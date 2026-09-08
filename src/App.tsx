import { useCallback, useEffect, useState } from "react";
import { CommandPalette } from "./components/ui/CommandPalette";
import { Confetti } from "./components/ui/Confetti";
import { CustomCursor } from "./components/layout/CustomCursor";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { ScrollProgress } from "./components/layout/ScrollProgress";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { Education } from "./components/sections/Education";
import { Experience } from "./components/sections/Experience";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [confettiBurst, setConfettiBurst] = useState(0);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);
  const fireConfetti = useCallback(() => setConfettiBurst((n) => n + 1), []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isCombo = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isCombo) {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <ThemeProvider>
      <CustomCursor />
      <ScrollProgress />
      <Confetti burstId={confettiBurst} />
      <CommandPalette open={paletteOpen} onClose={closePalette} onEasterEgg={fireConfetti} />

      <Navbar onOpenPalette={openPalette} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />
    </ThemeProvider>
  );
}
