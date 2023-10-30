'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { SetStateAction, useState } from "react"

export default function JoinSpace({ children}: { children: React.ReactNode}) {
  const [spaceCode, setSpaceCode] = useState<string>("");
  const router = useRouter();
  return (
    <Dialog
    >
      <DialogTrigger asChild >
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join Space</DialogTitle>
          <DialogDescription>
            Please enter the space code or link to join the space.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-4 items-center justify-between py-4 w-full h-full">
          <div className="gap-4 col-span-2 flex flex-col items-center justify- w-full">
            <div className="">
            <Label htmlFor="code" className="text-right pb-5 text-base">
              Code or Link
            </Label>
            <Input id="code" className="col-span-3" onChange={(e) => setSpaceCode(e.target.value)} />
            </div>
            <Button className="dark:bg-primary" onClick={
              () => {
                if(spaceCode.length === 0) return;
                router.push(`/space/${spaceCode}`);

              }
            }>Join</Button>
          </div>

          <div className="text-center">or</div>
          {/* or sign up button to join */}

          <div className="rounded-lg ">
            <Button size={"lg"} variant={"outline"} className="w-24">Sign Up</Button>
          </div>

        </div>
        <DialogFooter>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
