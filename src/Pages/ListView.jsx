import { FaSearch } from "react-icons/fa";
import logo from "../assets/Pokebook.png";
import { Link } from "react-router-dom";
import Pokebook from "../Components/Pokebook";
import { useEffect } from "react";
import ThemeModal from "../Components/ThemeModal";
import { setThemeColor, useGlobalContext } from "../Components/Context";
import SinglePookModal from "../Components/SinglePookModal";

const optionsList = [8, 12, 16, 24];

export default function ListView() {
  const { state, fetchPokemon, toggleThemeModal, setSelectedValue } =
    useGlobalContext();

  // destructure values from state
  const {
    isLoading,
    pokebook,
    theme,
    selectedValue,
    isThemeModalShowing,
    isPookModalShowing,
  } = state;

  // set Theme colors
  const { themeText, themeBg } = setThemeColor(theme);
  // console.log(isLoading, pokebook, theme, themeBg, themeText);

  useEffect(() => {
    fetchPokemon();
  }, [selectedValue]);

  return (
    <section>
      {isThemeModalShowing && <ThemeModal />}
      {isPookModalShowing && <SinglePookModal />}
      {/* header */}
      <header className="flex justify-between items-center h-[70px] px-5 md:px-10 bg-white shadow-md">
        <Link to="/" className="logo flex items-center mt-4 gap-3">
          <img src={logo} alt="pokebook" className="h-full w-[110px]" />
          <p className="font-semibold text-xl">
            Poke<span className={`${themeText}`}>book</span>
          </p>
        </Link>

        <div className="search relative right-20 hidden md:block">
          <FaSearch className="absolute top-3 left-3 text-[#7B7B7B] cursor-pointer" />
          <input
            type="text"
            placeholder="Enter pokemon name"
            className="outline-none px-8 w-[350px] h-[40px] rounded-full border-2 shadow-md border-[#FCFCFC] text-[#7B7B7B] text-lg"
          />
        </div>

        <div
          className="theme cursor-pointer border border-[#868686] rounded-full p-[1px]"
          onClick={toggleThemeModal}
        >
          <div
            className={`${themeBg} w-[25px] h-[25px] md:w-[35px] md:h-[35px] rounded-full`}
          ></div>
        </div>
      </header>

      {/* pokeman view */}
      <main className="flex flex-1 flex-wrap gap-x-6 gap-y-12 justify-center mt-8 px-10 md:px-20">
        {isLoading ? (
          <h1>Loading pokemon...</h1>
        ) : (
          pokebook?.map((poke) => <Pokebook key={poke.id} {...poke} />)
        )}
      </main>

      {/* pagination && select */}
      <div className="fixed bottom-px z-10 w-full flex justify-between px-4 md:px-20 mb-10">
        <div className="flex gap-4">
          <div className="bg-[#E1E1E1] rounded-md py-1 px-4 cursor-pointer">
            Prev
          </div>
          <div className={`${themeBg} px-4 py-1 rounded-md text-white`}>1</div>
          <div className="bg-[#E1E1E1] rounded-md py-1 px-4 cursor-pointer">
            Next
          </div>
        </div>
        <div>
          <select
            id="number"
            name="number"
            className="outline-none border-none ml-[2px] my-px px-2"
            onChange={(e) => setSelectedValue(Number(e.target.value))}
            value={selectedValue}
          >
            {optionsList.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
