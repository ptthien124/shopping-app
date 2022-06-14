import React from "react";
import "../styles/css/button.css";

function Button({
  title,
  onClick,
  primary,
  red,
  yellow,
  width = 180,
  height = 60,
}) {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick(e);
  };

  const styles = {
    height: `${height}`,
    width: `${width}`,
  };

  return (
    <button
      style={styles}
      onClick={handleClick}
      className={`button ${primary && "primary"} ${red && "red"} ${
        yellow && "yellow"
      }`}
    >
      {title}
    </button>
  );
}

export default Button;
