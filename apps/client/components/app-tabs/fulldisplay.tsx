import { Ref } from "react";


const FullDisplay = ({videoRef}: {videoRef: Ref<HTMLVideoElement>}) => {

  return (
    <section className="flex justify-center !w-full lg:!h-[31rem] items-center relative">
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="object-cover rounded-md !h-fit-content !w-fit"
      style={{ 
        width: 'inherit !important',
        height: 'inherit !important',
        // height: '38rem !important',
        position: 'absolute',
        top: '1%'}}
    />
    </section>
  );
}

export default FullDisplay;

