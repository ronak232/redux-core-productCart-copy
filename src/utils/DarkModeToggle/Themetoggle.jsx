import React, { useContext } from "react";
import { BsSun } from "react-icons/bs";
import { BsSunFill } from "react-icons/bs";
import { ThemeContext } from "../../hooks/ContextApi";

function Themetoggle() {
  const theme = useContext(ThemeContext);
  const handleTheme = () => {
    theme.dispatch({ type: "TOGGLE" });
  };
  return (
    <div className="toggle">
      <div className="toggle-theme">
        <BsSun className="toggle-icon" />
        <BsSunFill className="toggle-icon" />
        <button
          className="toggle-btn"
          style={{ right: theme.state.darkMode ? 0 : 45 }}
          onClick={handleTheme}
        ></button>
      </div>
    </div>
  );
}

export default Themetoggle;
