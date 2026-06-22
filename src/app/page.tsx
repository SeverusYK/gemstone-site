import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { CoreParameters } from "@/components/sections/CoreParameters";
import { SkillHub } from "@/components/sections/SkillHub";
import { StatsBar } from "@/components/sections/StatsBar";
import { DataArchive } from "@/components/sections/DataArchive";
import { Initialization } from "@/components/sections/Initialization";
import { FAQSection } from "@/components/sections/FAQSection";
import { Execute } from "@/components/sections/Execute";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <CoreParameters />
        <SkillHub />
        <StatsBar />
        <DataArchive />
        <Initialization />
        <FAQSection />
        <Execute />
      </main>
      <Footer />
    </>
  );
}
