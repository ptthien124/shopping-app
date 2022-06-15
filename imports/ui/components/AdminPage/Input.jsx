import React from "react";

function Input({ inputId, title, register, value, onChange, type = "text" }) {
  return (
    <div className="inputWrapper">
      <label htmlFor={inputId}>{title}</label>
      {register ? (
        <input
          id={inputId}
          name={inputId}
          type={type}
          {...register(inputId, { required: true })}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          id={inputId}
          name={inputId}
          type={type}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}

export default Input;
