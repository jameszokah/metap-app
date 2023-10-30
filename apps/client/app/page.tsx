import Loader3D from "@/components/3d/3dloader";
import { Container } from "@/components/container";
import { Header } from "@/components/header/head";
import { HeroImage } from "@/components/hero/hero_image";
import HeroPage from "@/components/hero/hero";
import { useSignupPathRef } from "@/hooks/useSignupPathRef";



export default async function Index() {
  // const signupBtnRef = useSignupPathRef();
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className={'relative'}>
     <Header
    //  ref={signupBtnRef}
     />
    <Container className="mt-24">
      <HeroPage />

    </Container>
     <Container className="h-64 absolute top-[33%] right-[40%] hidden md:block ">
        <Loader3D theme='dark' />
     </Container>
     <Container className="absolute -top-6 hidden md:block md:right-[2.5%] lg:right-[2.5%] xl:right-[2.5%] 2xl:right-[2.5%]">
      <div className="h-[106vh] w-3 rounded-lg bg-primary"></div>
     </Container>
     <Container className="">
        <HeroImage />
     </Container>


    </div>
  );
}
