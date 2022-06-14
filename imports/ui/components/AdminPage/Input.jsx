import React from "react";
import { useState } from "react";

function Input({
  inputId,
  title,
  value,
  onChange,
  register = {},
  type = "text",
}) {
  const rest = { ...register };

  return (
    <div className="inputWrapper">
      <label htmlFor={inputId}>{title}</label>
      <input
        id={inputId}
        name={inputId}
        type={type}
        {...rest}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
