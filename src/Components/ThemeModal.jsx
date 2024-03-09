import { setThemeColor, useGlobalContext } from "./Context";

export default function ThemeModal() {
  const { state, toggleThemeModal, setTheme } = useGlobalContext();
  const { themeName } = setThemeColor(state.theme);

  function handleChange(theme) {
    setTheme(theme);
    toggleThemeModal();
  }

  return (
    <article>
      {" "}
      <div
        className="w-full h-screen bg-black z-20 flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 opacity-40"
        onClick={toggleThemeModal}
      ></div>
      <div className="bg-[url('../src/assets/bgImage.png')] bg-cover h-[200px]  fixed z-30 mx-auto left-[11%] md:left-[40%] top-[10rem] w-80 flex flex-col rounded-lg">
        <div className="font-semibold rounded-t-2xl text-xl bg-white text-center">
          <h1 className="my-[3px]">Choose Theme</h1>
        </div>
        <div className="bg-[#EBEBEB] rounded-b-2xl flex items-center justify-center w-full gap-4 h-full">
          <div
            className={`pink cursor-pointer ${
              themeName === "pink" ? "border-[1.5px] border-black" : ""
            }  rounded-full p-[3px]`}
          >
            <div
              className="bg-[#E85382]  w-[50px] h-[50px] rounded-full"
              onClick={() => handleChange("pink ")}
            ></div>
          </div>
          <div
            className={`blue cursor-pointer ${
              themeName === "blue" ? "border-[1.5px] border-black" : ""
            } rounded-full p-[3px] `}
          >
            <div
              className="bg-[#39BADF] w-[50px] h-[50px]  rounded-full"
              onClick={() => handleChange("blue")}
            ></div>
          </div>
          <div
            className={`yellow cursor-pointer ${
              themeName === "yellow" ? "border-[1.5px] border-black" : ""
            } rounded-full p-[3px]`}
          >
            <div
              className="bg-[#E1A725] w-[50px] h-[50px]  rounded-full"
              onClick={() => handleChange("yellow")}
            ></div>
          </div>
        </div>
      </div>
    </article>
  );
}
