import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import React, { ReactPortal, FC } from "react";

interface ButtonControlProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element[] | JSX.Element | React.ReactNode;
  className?: string;
  asChild?: boolean;
}
const ButtonControl= React.forwardRef<HTMLButtonElement, ButtonControlProps>(({
  children,
  className,
  asChild = false,
  ...props
}, ref) => {

  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      type="button"
      data-mdb-ripple="true"
      data-mdb-ripple-color="light"
      // onClick={onClick}
      {...props}
      ref={ref}
      className={cn(`font-medium text-xs text-center leading-tight uppercase rounded  focus:outline-none focus:ring-0 transition duration-150 ease-in-out`, className)}
    >
      {children}
    </Comp>
  );
});

export default ButtonControl;
