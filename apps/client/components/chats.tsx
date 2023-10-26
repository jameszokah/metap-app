import { Send } from "./icons/send"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { UploadImage } from "./icons/uploadImage"
import { UploadDocument } from "./icons/uploadDocument"
import { ChatSettings } from "./icons/chatSettings"
import { FaceEmoji } from "./icons/face"

const Chats = () => {
    return (
        <div className='w-full h-full lg:relative'>
            {/* <div className='flex justify-between items-end w-full absolute left-0 -bottom-0'>
               <div className='flex flex-col'>
                <Textarea placeholder='Type a message' className='bg-text-box outline-none border-none'  />
                </div>
            <div className="">
              <Button className='bg-text-box p-3' size={"icon"}>
                <Send className="" />
              </Button>
            </div>

            </div> */}

<div className="absolute !-bottom-[40rem] left-0">

<div className="flex w-[128px] items-start justify-between gap-5 ml-7 max-md:justify-center max-md:ml-2.5 max-md:mt-52">


        <Button className='p-1 bg-transparent' size={"icon"}>
            <UploadImage className="" />
        </Button>
        <Button className=' p-1 bg-transparent' size={"icon"}>
            <UploadDocument className="" />
        </Button>
        <Button className=' p-1 bg-transparent' size={"icon"}>
            <ChatSettings className="" />
        </Button>

        <Button className='ml-10 p-1 bg-transparent' size={"icon"}>
            <FaceEmoji className="" />
        </Button>
      </div>
      <div className="flex w-[293px] max-w-full items-center gap-3 ml-4 mt-1 max-md:ml-2.5">
        <div className="text-white text-opacity-50 text-center text-base italic font-medium tracking-normal self-stretch items-center bg-gray-800 w-[239px] max-w-full pt-2 pb-5 px-2 rounded-2xl max-md:pl-2.5">
          <Textarea placeholder='Type a message' className='bg-text-box text-base placeholder:text-base placeholder:italic placeholder:font-medium font-medium  outline-none focus-visible:ring-transparent focus-visible:ring-offset-1 min-h-[60px] border-none rounded-3xl focus:border-none'  />
        </div>
        <Button className='bg-text-box rounded-lg p-1' size={"icon"}>
                <Send className="" />
              </Button>
      </div>
</div>
        </div>
    )
}

export default Chats

