import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
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
    onClick();
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
