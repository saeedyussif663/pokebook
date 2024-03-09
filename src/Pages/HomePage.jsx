import { Link, useNavigate } from "react-router-dom";
import pokebook from "../assets/Pokebook.png";
import { FaSearch } from "react-icons/fa";
import { setThemeColor, useGlobalContext } from "../Components/Context";

export default function HomePage() {
  const navigate = useNavigate();
  const { state } = useGlobalContext();

  const { themeText, themeBg, themeBorder } = setThemeColor(state.theme);

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/listview");
  }

  return (
    <section className="h-screen w-screen flex flex-col pt-20 md:pt-14 items-center">
      <div className="flex flex-col items-center justify-center">
        <img src={pokebook} alt="Pokebook" className="w-[382px] h-[248px]" />
        <h1 className="mt-2 font-semibold text-5xl text-[#000000]">
          Poké
          <span className={`${themeText}`}>book</span>
        </h1>
        <p className="mt-2 max-w-[23rem] px-4 text-center">
          Largest Pokémon index with information about every Pokemon you can
          think of.{" "}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center mt-8">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <div
              className={`absolute p-1 right-5 top-2 text-white ${themeBg} rounded-full`}
            >
              <FaSearch
                className="cursor-pointer"
                size={18}
                onClick={() => navigate("/listview")}
              />
            </div>

            <input
              type="text"
              placeholder="Enter pokemon name"
              className={`outline-none w-full  md:w-[400px] px-4 h-[44px] border-4 ${themeBorder} rounded-full placeholder:text-[#7B7B7B] text-lg`}
            />
          </div>
        </form>
        <Link to="/listview" className="mt-4 underline text-sm tracking-wider">
          view all
        </Link>
      </div>
    </section>
  );
}
