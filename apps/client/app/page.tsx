import { Container } from "@/components/container";
import { Header } from "@/components/header/head";
import { HeroImage } from "@/components/hero/hero_image";

export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className={''}>
     <Header />
     <Container className="w-max">
        <HeroImage />
     </Container>


    </div>
  );
}
