import VideoGridLayout from "../video_grid_layout";


const GridDisplay = ({open}: {open: boolean}) => {
  return (
    <section className="flex lg:grid lg:grid-flow-col w-[100vw] justify-center lg:w-full gap-4 text-blue-500">
                  <div
                    className={`bg-semi-dark  max-h-[65vh] lg:max-h-[75vh]  lg:w-full gap-4 lg:mt-1 overflow-auto scroll-smooth p-4 lg:p-4  rounded-md scrollbar-hide lg:scrollbar-default ${
                      open ? "ml-0" : "ml-6"
                    }`}
                  >
                    <VideoGridLayout />


                  </div>

                </section>
  );
}

export default GridDisplay;
