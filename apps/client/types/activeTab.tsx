import { StaticImport } from "next/dist/shared/lib/get-img-props";
import React from "react";


export type ActiveTab = 'full' | 'grid' | 'semi-full';
export type Tab = {
  id: number;
  name: string;
  icon: React.JSX.Element | React.ReactNode;
  tab: ActiveTab;
};
