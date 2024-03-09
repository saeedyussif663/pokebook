export function reducer(state, action) {
  if (action.type === "SETISLOADING") {
    return {
      ...state,
      isLoading: action.payload,
    };
  }

  if (action.type === "SETTHEME") {
    return {
      ...state,
      theme: action.payload,
    };
  }

  if (action.type === "SETVALUE") {
    return {
      ...state,
      selectedValue: action.payload,
    };
  }
  if (action.type === "SETSINGLEPOOK") {
    const pook = state.pokebook.find((pook) => pook.id === action.payload);
    return {
      ...state,
      singlePook: pook,
    };
  }
  if (action.type === "TOGGLEPOOKMOONMODAL") {
    return {
      ...state,
      isPookModalShowing: !state.isPookModalShowing,
    };
  }

  if (action.type === "EMPTYPOOKMONARRAY") {
    return {
      ...state,
      pokebook: [],
    };
  }

  if (action.type === "PUSHPOOKMON") {
    return {
      ...state,
      pokebook: [...state.pokebook, action.payload],
    };
  }

  if (action.type === "TOGGLETHEMEMODAL") {
    return {
      ...state,
      isThemeModalShowing: !state.isThemeModalShowing,
    };
  }
  return state;
}
