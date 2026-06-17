import Hero from "../components/Hero";
import PopularPicks from "../components/PopularPicks";
import CollectionPreview from "../components/CollectionPreview";
import CountdownTimer from "../components/CountdownTimer";
import WhyChooseUs from "../components/WhyChooseUs";
import About from "../components/About";

export default function Home() {
  return (
    <>
      <Hero />
      <PopularPicks />
      <CollectionPreview collection="premium" />
      <CollectionPreview collection="performance" reverse />
      <CountdownTimer />
      <WhyChooseUs />
      <About />
    </>
  );
}
