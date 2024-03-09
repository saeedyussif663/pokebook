import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { setThemeColor, useGlobalContext } from "./Context";

export default function Pokebook({ name, imageUrl, id, types }) {
  const [isHovered, setIsHovered] = useState(false);
  const { state, togglePookmoonModal, setSinglePook } = useGlobalContext();
  const { typesEmoji } = state;
  const { themeBg } = setThemeColor(state.theme);

  function handleViewPookmoon(id) {
    setSinglePook(id);
    togglePookmoonModal();
  }

  return (
    <div
      className={`container relative w-[230px] h-[180px] pb-3 bg-white rounded-xl flex flex-col items-center`}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-[#F1F1F1] h-[100px] w-[90%] mx-auto mt-2 rounded-md relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-[150px] h-[120px] absolute bottom-1 left-7"
        />
      </div>

      <div className="flex flex-col items-center mt-3">
        <h3 className="font-medium text-xl">{name}</h3>
        <div className="flex gap-3 mt-1">
          {types.map((type, index) => (
            <div key={index} className="bg-[#EEEEEE] py-1 px-3 rounded-full">
              {typesEmoji[type]} {type}
            </div>
          ))}
        </div>
      </div>

      {isHovered && (
        <div
          className={`absolute z-10 -bottom-10 cursor-pointer rounded-b-xl  bg-white p-1  w-full ${
            !isHovered ? "-translate-y-16 hidden" : "translate-y-0 flex"
          } mt-4 justify-center transition-transform duration-3000`}
          onClick={() => handleViewPookmoon(id)}
        >
          <div
            className={`flex justify-around items-center  mb-2 ${themeBg} w-[90%] rounded-full  text-white font-normal text-base`}
          >
            <p>View Pokemon</p>
            <FaEye />
          </div>
        </div>
      )}
    </div>
  );
}
