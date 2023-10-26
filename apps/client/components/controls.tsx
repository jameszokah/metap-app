import { FC, useState } from "react";
import Image from "next/image";
import ButtonControl from "./button_control";import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  ShareOutlineIcon,
  AddToolsFillIcon,
  MicOnIcon,
  VideoIcon,
  ScreenShareFillIcon,
  CallFillIcon,
  EditBoardFillIcon,
  PollFillIcon,
  HandsUpFillIcon,
  HMenuFillIcon,
  SecureCheckFillIcon,
} from "./icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { Button } from "@/components/ui/button";
import CreatePoll from "./polls/createPoll";
import Poll from "./polls/poll";
import Excali from "./whiteboard/excali";

const Controls: FC = () => {
  // const [toggled, setToggled] = useState(false);
  const [micToggled, setMicToggled] = useState(false);
  const [videoToggled, setVideoToggled] = useState(false);
  const [screenToggled, setScreenToggled] = useState(false);
  const [callToggled, setCallToggled] = useState(false);
  const [editToggled, setEditToggled] = useState(false);
  const [pollToggled, setPollToggled] = useState(false);
  const [handsToggled, setHandsToggled] = useState(false);
  const [hMenuToggled, setHMenuToggled] = useState(false);
  const [secureToggled, setSecureToggled] = useState(false);


  // const onClick = () => {
  //   setToggled(!toggled);
  //   console.log("clicked");
  // };


  return (
    <>
      <div className="flex w-[80%] lg:w-full h-full justify-between items-center border border-gray-600 lg:border-none rounded-lg px-1 lg:px-0 ">
        <div className="hidden md:flex lg:flex justify-evenly items-center w-[50%]">
          <ButtonControl className={`p-2 hover:shadow-md focus:shadow-lg active:shadow-lg`} onClick={() => {
          }}>
            <Image src={ShareOutlineIcon} alt="logout" className="" />
          </ButtonControl>
          <ButtonControl className={`flex justify-between items-center text-center p-2 hover:shadow-md focus:shadow-lg active:shadow-lg`} onClick={() => {
          }} >
            <Image src={AddToolsFillIcon} alt="logout" className="" />
            <p className=" ml-3 text-gray-400 text-center">Tools</p>
          </ButtonControl>
        </div>

        <div className="flex justify-around lg:justify-evenly items-center w-full">
          <ButtonControl className={`bg-gray-300/20 rounded-lg p-2 focus:bg-gray-700 hover:bg-gray-700 hover:shadow-lg active:bg-gray-400/10 ${micToggled ? 'bg-primary hover:bg-primary focus:bg-primary' : ''}`} onClick={() => {
            setMicToggled(!micToggled);
          }} >
            <Image src={MicOnIcon} alt="logout" className="" />
          </ButtonControl>
          <ButtonControl className={`bg-gray-300/20 rounded-lg p-2 focus:bg-gray-700 hover:bg-gray-700 hover:shadow-lg active:bg-gray-400/10 ${videoToggled ? 'bg-primary hover:bg-primary focus:bg-primary' : ''}`} onClick={() => {
            setVideoToggled(!videoToggled);
          }}>
            <Image src={VideoIcon} alt="logout" className="" />
          </ButtonControl>
          <ButtonControl className={`bg-gray-300/20 rounded-lg p-2 hidden lg:block focus:bg-gray-700 hover:bg-gray-700 hover:shadow-lg active:bg-gray-400/10 ${screenToggled ? 'bg-primary hover:bg-primary focus:bg-primary' : ''} `} onClick={() => {
            setScreenToggled(!screenToggled);
          }}>
            <Image src={ScreenShareFillIcon} alt="logout" className="" />
          </ButtonControl>
          <ButtonControl className={`bg-rose-700 rounded-lg p-2 active:bg-gray-400/10 ${callToggled ? 'bg-semi-dark hover:bg-semi-dark focus:bg-semi-dark' : ''}`} onClick={() => {
            setCallToggled(!callToggled);
          }}>
            <Image src={CallFillIcon} alt="logout" className="" />
          </ButtonControl>
          <Excali>
          <ButtonControl className={`bg-gray-300/20 rounded-lg p-2 hidden lg:block focus:bg-gray-700 hover:bg-gray-700 hover:shadow-lg active:bg-gray-400/10  ${editToggled ? 'bg-primary hover:bg-primary focus:bg-primary' : ''} `} onClick={() => {
            setEditToggled(!editToggled);
          }}>
            <Image src={EditBoardFillIcon} alt="logout" className="" />
          </ButtonControl>
          </Excali>
          <Poll>
          <ButtonControl className={`bg-gray-300/20 rounded-lg p-2 hidden lg:block focus:bg-gray-700 hover:bg-gray-700 hover:shadow-lg active:bg-gray-400/10 ${pollToggled ? 'bg-primary hover:bg-primary focus:bg-primary' : ''} `} onClick={() => {
            setPollToggled(!pollToggled);
          }} >
            <Image src={PollFillIcon} alt="logout" className="" />
          </ButtonControl>
          </Poll>
          <ButtonControl className={`bg-gray-300/20 rounded-lg p-2 hidden lg:block focus:bg-gray-700 hover:bg-gray-700 hover:shadow-lg active:bg-gray-400/10 ${handsToggled ? 'bg-primary hover:bg-primary focus:bg-primary' : ''} `} onClick={() => {
            setHandsToggled(!handsToggled);
          }}>
            <Image src={HandsUpFillIcon} alt="logout" className="" />
          </ButtonControl>
        </div>

        <div className=" flex justify-evenly items-center w-[50%]">

          <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button size={"icon"} variant={"ghost"} className="hover:bg-semi-dark p-2 hove:shadow-md focus:shadow-lg active:shadow-lg">
            <Image src={HMenuFillIcon} alt="logout" className="" />
          </Button>

      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <CreatePoll>
          <DropdownMenuItem>
            create new Poll
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          </CreatePoll>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>


    <HoverCard>
      <HoverCardTrigger asChild>
      <Button size={"icon"} variant={"ghost"} className="hover:bg-semi-dark hidden lg:block p-2 hover:shadow-md focus:shadow-lg active:shadow-lg">
            <Image src={SecureCheckFillIcon} alt="logout" className="" />
          </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/jameszokah.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">  End to End encripted </h4>
            <p className="text-sm">
              Metap is a platform for creating and sharing virtual events.
            </p>
            <div className="flex items-center pt-2">
              {/* <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "} */}
              <span className="text-xs text-muted-foreground">
                Created 2 days ago
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>

        </div>
      </div>
    </>
  );
};

export default Controls;
