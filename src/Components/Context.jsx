import { createContext, useContext, useReducer } from "react";
import { reducer } from "../lib/reducer";
import { typesEmoji } from "../lib/typesEmoji";

const initialState = {
  theme: "pink",
  pokebook: [],
  singlePook: {},
  selectedValue: 8,
  isLoading: false,
  isThemeModalShowing: false,
  isPookModalShowing: false,
  typesEmoji: typesEmoji,
};

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function setSelectedValue(value) {
    dispatch({ type: "SETVALUE", payload: value });
  }

  function setSinglePook(id) {
    dispatch({ type: "SETSINGLEPOOK", payload: id });
  }

  function togglePookmoonModal() {
    dispatch({ type: "TOGGLEPOOKMOONMODAL" });
  }

  function setTheme(theme) {
    dispatch({ type: "SETTHEME", payload: theme });
  }

  function toggleThemeModal() {
    dispatch({ type: "TOGGLETHEMEMODAL" });
  }

  async function arrangePokemon(pokemon) {
    const pokemonDetails = await fetch(pokemon.url);
    const singlePook = await pokemonDetails.json();
    // turning the abilities to an array to make it easy to use
    const abilityArray = [];
    singlePook.abilities.forEach((item) =>
      abilityArray.push(item.ability.name)
    );
    // turning the abilities to an array to make it easy to use
    const typesArray = [];
    singlePook.types.forEach((type) => typesArray.push(type.type.name));
    // turning the abilities to an array to make it easy to use
    const statsArray = [];
    singlePook.stats.forEach((stat) =>
      statsArray.push({ stats_num: stat.base_stat, stats_name: stat.stat.name })
    );

    dispatch({
      type: "PUSHPOOKMON",
      payload: {
        id: singlePook.id,
        name: singlePook.name,
        imageUrl: singlePook.sprites.other.dream_world.front_default,
        abilities: abilityArray,
        weight: singlePook.weight,
        height: singlePook.height,
        types: typesArray,
        stats: statsArray,
      },
    });
  }

  async function fetchPokemon() {
    dispatch({ type: "SETISLOADING", payload: true });

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${state.selectedValue}`
    );
    const data = await response.json();
    dispatch({ type: "EMPTYPOOKMONARRAY" });
    data.results.forEach((pokemon) => {
      arrangePokemon(pokemon);
    });

    dispatch({ type: "SETISLOADING", payload: false });
  }

  return (
    <ThemeContext.Provider
      value={{
        state,
        fetchPokemon,
        toggleThemeModal,
        setTheme,
        togglePookmoonModal,
        setSinglePook,
        setSelectedValue,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };

export const useGlobalContext = () => {
  return useContext(ThemeContext);
};

export function setThemeColor(theme) {
  let themeText;
  let themeBg;
  let themeName;
  let themeBorder;

  if (theme === "pink") {
    themeText = "text-[#E85382]";
    themeBg = "bg-[#E85382]";
    themeBorder = "border-[#E85382]";
    themeName = "pink";
  } else if (theme === "blue") {
    themeText = "text-[#39BADF]";
    themeBg = "bg-[#39BADF]";
    themeBorder = "border-[#39BADF]";
    themeName = "blue";
  } else if (theme === "yellow") {
    themeText = "text-[#E1A725]";
    themeBg = "bg-[#E1A725]";
    themeBorder = "border-[#E1A725]";
    themeName = "yellow";
  } else {
    themeText = "text-[#E85382]";
    themeBg = "bg-[#E85382]";
    themeBorder = "border-[#E85382]";
    themeName = "pink";
  }

  return { themeText, themeBg, themeBorder, themeName };
}
