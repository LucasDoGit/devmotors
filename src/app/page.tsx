import { HomeProps } from "@/utils/home.type";
import { Submenu } from "@/components/home/navbar";
import { getDataHome } from "@/utils/actions/get-data";
import { Hero } from "@/components/hero";
import { Phone } from "lucide-react";

export default async function Home() {
  const { object }: HomeProps = await getDataHome();

  return (
    <main>
      <Submenu />
      <Hero 
        heading={object.metadata.heading}
        bannerUrl={object.metadata.banner.url}
        buttonTitle={object.metadata.cta_button.title}
        buttonUrl={object.metadata.cta_button.url}
        icon={<Phone size={24} color="#FFF" />}
      />
    </main>
  );
}
