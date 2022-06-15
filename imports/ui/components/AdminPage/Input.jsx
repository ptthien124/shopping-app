import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
