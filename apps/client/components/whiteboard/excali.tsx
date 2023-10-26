'use client'
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { ExcalidrawAPIRefValue, ExcalidrawProps } from "@excalidraw/excalidraw/types/types";
import { useState, useEffect, MemoExoticComponent, ForwardRefExoticComponent, RefAttributes } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Excalidraw } from "@excalidraw/excalidraw";

export default function Excali({ children }: { children: React.ReactNode}) {
  // const [Excalidraw, setExcalidraw] = useState<MemoExoticComponent<ForwardRefExoticComponent<ExcalidrawProps & RefAttributes<ExcalidrawAPIRefValue>>> | null>();


  // useEffect(() => {
  //   import("@excalidraw/excalidraw").then((comp) => setExcalidraw(comp?.default?.Excalidraw));
  // }, []);


  return (

      <Popover modal>
  <PopoverTrigger asChild>{children}</PopoverTrigger>
  <PopoverContent className="!w-[80vw] !h-[70vh] mt-4 bg-transparent">
    {<Excalidraw
      initialData={{
        appState: {viewBackgroundColor: "#00000000" },
        scrollToContent: true
      }}
    />}
  </PopoverContent>
    </Popover>

    );
}


