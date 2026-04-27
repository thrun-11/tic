import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TextReveal from "@/components/TextReveal";
import ModernLife from "@/components/ModernLife";
import BookCall from "@/components/BookCall";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <TextReveal />
      <ModernLife />
      <BookCall />
      <Footer />
    </main>
  );
}
