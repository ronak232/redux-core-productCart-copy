import { createContext, useEffect, useReducer } from "react";

// Creating the common context api for toggle theme mode..
const ThemeContext = createContext();

// initial state
const INITIAL_STATE = { darkMode: false };

// Reducer function to update the component state..
const themeModereducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE":
      return { darkMode: !state.darkMode };
    default:
      return state;
  }
};

const ThemeProvider = ({ children }) => {
  const storedTheme = JSON.parse(localStorage.getItem("theme"));
  const [state, dispatch] = useReducer(
    themeModereducer,
    storedTheme || INITIAL_STATE
  );

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(state));
  }, [state]);
  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
