'use client'
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import Nav from "@/components/nav";
import Box from "@/components/box";
import Participants from "@/components/participants";
import Chats from "@/components/chats";
import VideoGridLayout from "@/components/video_grid_layout";
import ButtonDisplayLayout from "@/components/button_display_layout";
import { GroupOutlineIcon, Chevron, AddFillIcon } from "@/components/icons";
import Controls from "@/components/controls";
import { socket } from "@/lib/socket";
import { getLocalStream, streamSuccess } from "@/lib/mediasoup";
import FullDisplay from "@/components/app-tabs/fulldisplay";
import { Skeleton } from "@/components/ui/skeleton";
import { ActiveTab } from "@/types/activeTab";
import GridDisplay from "@/components/app-tabs/griddisplay";


const Home: NextPage = () => {
  const [open, setOpen] = useState(true);
  const [chat, setChat] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("full");


  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    function onConnect() {

      console.log("connected");


    }

    function onDisconnect() {
      // setIsConnected(false);
    }

   async function onConnectionsuccess({ socketId }: {socketId: string}) {

    // getLocalStream().then((stream) => {
    //   setStream(stream);
    //     console.log(socketId);
    //     console.log(stream);
    //     streamSuccess(stream);
    //     videoRef.current!.srcObject = stream;
    // });

      try {
        const stream = await getLocalStream();
        if(!stream) return;
        if(isBrowser) {
        setStream(stream);
        // console.log(socketId);
        streamSuccess(stream);
        // videoRef.current ? videoRef.current!.srcObject = stream : null;
        if(videoRef.current) {
          videoRef.current!.srcObject = stream;
          videoRef.current!.play();
        // console.log(stream);

        }

      }
        // socket.emit('produce', { socketId, stream });
      }

      catch (error) {
        // console.error(error);
      }
    }



    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    socket.on('connection-success', onConnectionsuccess)

    return () => {
      socket.off('connect', onConnect);
      socket.off('connection-success', onConnectionsuccess)
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  const changeTab = () => {
    if (activeTab === 'full') return <FullDisplay videoRef={videoRef} />
    if (activeTab === 'grid') return <GridDisplay open={open} />
    if (activeTab === 'semi-full') return <GridDisplay open={open} />
  }

  return (
    <main className={""}>
      <div className="relative">
        <Box className="left-[60%] top-[14.5%] rotate-45" />
        <Box className="left-[10%] top-[20.5%] rotate-12" />
        <Box className="left-[35%] top-[20.5%] rotate-45" />
        <Box className="left-[30%] -bottom-[5%] rotate-[75deg]" />
        <Box className="right-[21%] top-[50.5%] rotate-[35deg]" />
        <Box className="right-[20%] -bottom-[7.5%] rotate-45" />
        <Box className="right-[12%] bottom-[27.5%] rotate-45" />
        <Box className="right-[14%] bottom-[20.5%] rotate-45" />

        <Header
          roomTitle="Political Science Lectures"
          recodingTime="1:20:45"
          setOpen={() => setOpen(!open)}
          activeTab={activeTab}
          setActionTab={setActiveTab}
        />
        <div className="flex">
          <div
            className={`flex flex-col justify-between mt-14 transition-all duration-500 ease-in-out ${
              open ? "" : "w-0 transition-all duration-500 ease-in-out"
            }`}
          >
            <Nav setChat={setChat} />
          </div>

          <div className="lg:flex lg:flex-col lg:grow w-screen">
            <div className="hidden h-px bg-gray-700 w-[70.6%] md:block lg:block ml-3 my-3"></div>
            <div className={`flex ${open ? "ml-0" : "ml-6"}`}>
              <div className="hidden z-20 lg:flex rounded-full px-2 w-24 lg:justify-between lg:items-center border border-gray-400">
                <Image
                  src={GroupOutlineIcon}
                  alt="people"
                  className="w-5 h-5"
                />
                <p className="text-gray-400">{"56"}</p>
                <Image
                  src={Chevron}
                  alt="people"
                  className="w-3 h-3 cursor-pointer"
                />
              </div>
              <ButtonDisplayLayout className="hidden z-20 lg:flex justify-center items-center text-primary px-2 py-px ml-2 rounded-full hover:bg-primary/30">
                <Image src={AddFillIcon} alt="people" className="w-5 h-5" />
                <p className="pl-2">Invite a Participant</p>
              </ButtonDisplayLayout>
            </div>

            <section className="flex gap-4 lg:gap-x-8 lg:gap-y-8 relative z-50">
              <div className="flex flex-col grow lg:w-[73%] lg:absolute">

                {stream  ?

                changeTab()

                : <Skeleton className="w-full h-[31rem] bg-black flex justify-center items-center">Loading ...</Skeleton>}

                <section
                  className={`w-full flex justify-center items-center fixed lg:mt-1 lg:w-[80vw] h-16 left-0 -bottom-20 lg:left-0 lg:bottom-8 z-40 ${
                    open
                      ? ""
                      : "lg:-left-2 transition-all duration-500 ease-in-out"
                  }`}
                >
                  <Controls />
                </section>

              </div>
              <div className="lg:absolute lg:mr-5 lg:right-0 lg:-top-9 bg-semi-dark hidden lg:min-h-[88vh] py-auto lg:w-[24%] lg:block lg:col-end-5 rounded-md">
                <div className="flex flex-col lg:relative w-full h-full">
                  <div className="flex text-white justify-center lg:relative">
                    <ButtonDisplayLayout
                      onClick={() => setChat(!chat)}
                      className={`lg:absolute bg-dark-primary w-[50%] rounded-bl-none rounded-tl rounded-tr-none text-white transition-all duration-500 ease-in-out ${
                        chat
                          ? "right-0 rounded-tl-none rounded-bl-lg rounded-br-none"
                          : "left-0"
                      }`}
                    >
                      {chat ? "Chats" : "Participant"}
                    </ButtonDisplayLayout>
                    <p
                      className={`w-[50%] text-center p-2 lg:absolute transition-all duration-500 ease-in-out ${
                        chat ? "left-0" : "right-0"
                      }`}
                    >
                      {chat ? "Participant" : "Chats"}
                    </p>
                  </div>
                  <div className="flex w-full h-full transition-all duration-500 ease-in-out relative">
                    {chat ? <Participants /> : <Chats />}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;



