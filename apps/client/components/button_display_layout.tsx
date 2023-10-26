import { cn } from "@/lib/utils";
import React, { FC } from "react";

const ButtonDisplayLayout = ({
  children,
  className,
  onClick,
  ...props
}: {
  children: JSX.Element[] | JSX.Element | React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className={cn(`p-2 rounded-xl`,className)}
      type="button"
      data-mdb-ripple="true"
      data-mdb-ripple-color="light"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonDisplayLayout;
