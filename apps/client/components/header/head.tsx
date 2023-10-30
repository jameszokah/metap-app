"use client";

import Link from "next/link";
import { Ref, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { HamburgerIcon } from "@/components/icons/hamburger";
import { Logo } from "@/components/icons/logo";
import classNames from "classnames";
import { HomeNav } from "@/components/navigations/homeNav";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavLinks } from "@/components/navigations/NavLinks";

export const Header = ({ref}: {ref?: Ref<HTMLButtonElement>}) => {
  const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) html.classList.toggle("overflow-hidden", hamburgerMenuIsOpen);
  }, [hamburgerMenuIsOpen]);

  useEffect(() => {
    const closeHamburgerNavigation = () => setHamburgerMenuIsOpen(false);

    window.addEventListener("orientationchange", closeHamburgerNavigation);
    window.addEventListener("resize", closeHamburgerNavigation);

    return () => {
      window.removeEventListener("orientationchange", closeHamburgerNavigation);
      window.removeEventListener("resize", closeHamburgerNavigation);
    };
  }, [setHamburgerMenuIsOpen]);

  useEffect(() => {

    const closeHamburgerNavigation = () => {
      if(window.innerWidth > 768) setHamburgerIsOpen(false);
    };

    window.addEventListener("orientationchange", closeHamburgerNavigation);
    window.addEventListener("resize", closeHamburgerNavigation);

    return () => {
      window.removeEventListener("orientationchange", closeHamburgerNavigation);
      window.removeEventListener("resize", closeHamburgerNavigation);
    };
  }, [setHamburgerIsOpen]);

  return (
    <header className="fixed top-0 left-0 z-10 w-full border-b border-transparent-white backdrop-blur-[12px]">
      <Container className="flex justify-between items-center h-[var(--navigation-height)] w-full">
        <Link className="flex items-center text-md mr-10" href="/">
          <Logo className="mr-5 h-[3.1rem] w-[3.1rem]" /> Metap
        </Link>

        <div
          className={classNames(
            "transition-[visibility] md:visible md:delay-500 ",
            hamburgerMenuIsOpen ? "visible" : "delay-500 invisible"
          )}
        >
          <nav
            className={classNames(
              "fixed top-navigation-height left-0 h-[calc(100vh_-_var(--navigation-height))] w-full overflow-auto bg-background transition-opacity duration-500 md:relative md:top-0 md:block md:h-auto md:w-auto md:translate-x-0 md:overflow-hidden md:bg-transparent md:opacity-100 md:transition-none",
              hamburgerMenuIsOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-[-100vw] opacity-0"
            )}
          >
            <NavLinks />
            {/* <HomeNav /> */}
          </nav>
        </div>

<div className="flex justify-center items-center">
<div className="ml-auto flex h-full items-center">
          <Link className="mr-6 text-sm" href="/login">
            Log in
          </Link>
          <Button ref={ref} variant={"default"} className="dark:bg-primary dark:border-2 rounded-lg">Sign up</Button>
        </div>


        <Sheet open={hamburgerIsOpen} onOpenChange={setHamburgerIsOpen}>
      <SheetTrigger asChild>
      <Button
          className="ml-6 md:hidden"
          onClick={() => setHamburgerIsOpen(true)}
        >
          <span className="sr-only">Toggle menu</span>
          <HamburgerIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Metap</SheetTitle>
          <SheetDescription>
            The next new virtual Conferencing you will need.
          </SheetDescription>
        </SheetHeader>
        <NavLinks hamburgerIsOpen={hamburgerIsOpen} />
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
</div>
      </Container>
    </header>
  );
};
