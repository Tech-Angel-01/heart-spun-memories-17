import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { WelcomeGate } from "@/components/herpage/WelcomeGate";
import { MusicPlayer } from "@/components/herpage/MusicPlayer";
import { Hero } from "@/components/herpage/Hero";
import { LoveLetter } from "@/components/herpage/LoveLetter";
import { Appreciation } from "@/components/herpage/Appreciation";
import { MemorySection } from "@/components/herpage/MemorySection";
import { Gallery } from "@/components/herpage/Gallery";
import { LittleThings } from "@/components/herpage/LittleThings";
import { FinalLetter, Footer } from "@/components/herpage/FinalLetter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A HerPage for Jaygram | More than a gift, a memory" },
      {
        name: "description",
        content:
          "A handcrafted keepsake page for Jaygram, written by his sister. Letters, memories, photographs and a song, all in one place.",
      },
      { property: "og:title", content: "A HerPage for Jaygram | More than a gift, a memory" },
      {
        property: "og:description",
        content:
          "A handcrafted keepsake page for Jaygram, written by his sister. Letters, memories, photographs and a song, all in one place.",
      },
    ],
  }),
  component: HerPage,
});

function HerPage() {
  const [started, setStarted] = useState(false);

  return (
    <main className="relative">
      <WelcomeGate onOpen={() => setStarted(true)} />
      <MusicPlayer started={started} />
      <Hero />
      <LoveLetter />
      <Appreciation />
      <MemorySection />
      <Gallery />
      <LittleThings />
      <FinalLetter />
      <Footer />
    </main>
  );
}
