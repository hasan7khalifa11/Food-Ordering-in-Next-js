import BestSellers from "@/components/home/BestSellers";
import Hero from "@/components/home/Hero";
import AboutPage from "./about/page";
import ContactPage from "./contact/page";

export default async function Home() {




  // const { Pizza } = await getDictionary(locale)

  return (
    <div className="">
      <Hero />
      <BestSellers />
      <AboutPage />
      <ContactPage />
    </div>
  );
}
