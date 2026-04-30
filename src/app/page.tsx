import { Navbar } from "@/components/sections/Navbar";
import { BootSequence } from "@/components/sections/BootSequence";
import { Hero } from "@/components/sections/Hero";
import { CoreParameters } from "@/components/sections/CoreParameters";
import { DataArchive } from "@/components/sections/DataArchive";
import { Initialization } from "@/components/sections/Initialization";
import { Execute } from "@/components/sections/Execute";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <BootSequence />
      <Navbar />
      <main>
        <Hero />
        <CoreParameters />
        <DataArchive />
        <Initialization />
        <Execute />
      </main>
      <Footer />
    </>
  );
}
