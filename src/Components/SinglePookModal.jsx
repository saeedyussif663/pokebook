import { IoMdArrowBack } from "react-icons/io";
import { useGlobalContext } from "./Context";
import ColorThief from "colorthief";
import { useEffect, useState } from "react";
import About from "./About";
import Stats from "./Stats";
import Similar from "./Similar";

function getDominantColor(imageUrl, callback) {
  const img = document.createElement("IMG");
  const colorThief = new ColorThief();
  img.setAttribute("src", imageUrl);
  img.crossOrigin = "Anonymous";
  if (img.complete) {
    callback(colorThief.getColor(img));
  } else {
    img.addEventListener("load", function () {
      callback(colorThief.getColor(img));
    });
  }
}

export default function SinglePookModal() {
  const [tab, setTab] = useState("About");
  const { state, togglePookmoonModal } = useGlobalContext();
  const { typesEmoji } = state;
  const { name, imageUrl, types } = state.singlePook;
  const [rgb, setRgb] = useState([]);

  useEffect(() => {
    getDominantColor(imageUrl, setRgb);
  }, []);

  let tabs = ["About", "Stats", "Similar"];

  return (
    <>
      <div
        className="w-full h-screen bg-black z-20 flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 opacity-40"
        onClick={togglePookmoonModal}
      ></div>
      <div
        className={`bg-white h-full w-[90%] md:w-[40%] fixed right-px z-50 ${
          state.isPookModalShowing ? "translate-x-0" : "translate-x-[200%]"
        }`}
      >
        {rgb.length === 0 ? (
          <h1 className="text-center pt-10 mb-20">loading...</h1>
        ) : (
          <div
            className=" rounded-xl  h-[170px] w-[95%] mt-4 mx-auto relative"
            style={{
              background: `linear-gradient(to top, rgb(${rgb?.map(
                (v) => v - 50
              )}), rgb(${rgb?.map((v) => v + 50)})`,
            }}
          >
            <div
              className="absolute cursor-pointer bg-white rounded-lg p-2 top-3 left-2"
              onClick={togglePookmoonModal}
            >
              <IoMdArrowBack />
            </div>
            <img
              src={imageUrl}
              alt={name}
              className="absolute w-[60%] left-[20%] h-[200px]  md:w-[40%] md:h-[200px] md:left-[30%]"
            />
          </div>
        )}

        <div className="name&types mx-auto gap-4 flex flex-col items-center mt-9 md:mt-5">
          <h1 className="font-semibold capitalize text-3xl">{name}</h1>
          <div className="flex gap-4">
            {types.map((type) => (
              <div
                key={type}
                className="bg-[#EEEEEE] text-md py-px px-5 rounded-full"
              >
                {typesEmoji[type]} {type}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-b from-[#ffffff] to-[#EEEEEE]  border-b-[2px] border-[#D9D9D9] w-[80%] h-6 mt-3 mx-auto shadows"></div>

        <div>
          {tab === "About" && <About />}
          {tab === "Stats" && <Stats />}
          {tab === "Similar" && <Similar />}

          <div className="fixed bottom-2 w-screen">
            {/* <div className="from-[#ffffff] to-[#EEEEEE] bg-gradient-to-b w-[80%] h-[20px] ml-4 shadows"></div> */}

            <div className="mt-6 rounded-full px-4 py-2 items-center flex justify-between border w-[80%] md:w-[25%] ml-[6%] md:ml-[8%] bottom-1 bg-[#E9E9E9]">
              {tabs.map((item, index) => (
                <div
                  key={index}
                  className={`cursor-pointer ${
                    tab === item ? "bg-white" : ""
                  } font-medium text-lg px-3 py-1 rounded-full`}
                  onClick={() => setTab(item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
