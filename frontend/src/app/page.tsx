import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TokenInfo from "@/components/TokenInfo";
import LivePrice from "@/components/LivePrice";
import Roadmap from "@/components/Roadmap";
import Team from "@/components/Team";
import FAQ from "@/components/FAQ";
import Comments from "@/components/Comments/CommentList";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <LivePrice />
      <TokenInfo />
      <Roadmap />
      <Team />
      <FAQ />
      <Comments />
      <Footer />
    </main>
  );
}
