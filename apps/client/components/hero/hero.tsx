import { Button as Button3D } from "r3dy";
import { ChevronUpIcon } from "lucide-react";
import { Highlight } from "../highlight";
import { Button } from "../ui/button";
import { Hero, HeroSubtitle, HeroTitle } from "./hero_text";
import { HeroImage } from "./hero_image";
import JoinSpace from "../space/joinSpace";


export default function HeroPage() {

  return (
    <Hero>
    <Button
      className="translate-y-[-1rem] animate-fade-in opacity-0 border border-semi-dark rounded-full"
      // href="/"
      variant="ghost"
      size="sm"
    >
      <span>Metap 2022 Release – Built for scale</span>{" "}
      <Highlight>→</Highlight>
    </Button>
    <HeroTitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
      Metap is a better way
      <br className="hidden md:block" /> to build products
    </HeroTitle>
    <HeroSubtitle className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
      Meet the new standard for modern software development.
      <br className="hidden md:block" /> Streamline issues, sprints, and product
      roadmaps.
    </HeroSubtitle>
    <JoinSpace>
    <Button
      className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms] dark:bg-primary"
      // href="/"
      variant="default"
      size="lg"
    >
      <span>Get Started </span>
      <Highlight>
        <ChevronUpIcon />
      </Highlight>
    </Button>
    </JoinSpace>

  </Hero>
  )
}
