import React from "react";

function Input({
  inputId,
  title,
  register,
  registerFilter,
  placeholder,
  errors,
  type = "text",
  submitted,
}) {
  return (
    <div className="wrapper">
      <div className="container">
        <label htmlFor={inputId}>{title}</label>
        <input
          id={inputId}
          name={inputId}
          type={type}
          placeholder={placeholder}
          {...register(inputId, { required: true, ...registerFilter })}
        />
      </div>
      {Object.keys(errors).length !== 0 && submitted && (
        <ul>
          {errors[inputId]?.type === "required" && <li>{title} is required</li>}
          {errors[inputId]?.type === "pattern" && (
            <li>Invalid {inputId} address</li>
          )}
          {errors[inputId]?.type === "minLength" && (
            <li>{title} must be have 6 characters long</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Input;
