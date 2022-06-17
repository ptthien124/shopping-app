import { Spin } from "antd";
import React, { useState } from "react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { factoryInput, Input } from ".";
import { Button } from "../../components";
import { ACTIONS } from "../../redux/actions/auth";
import "../../styles/css/form.css";

function Form({ title, login, signUp }) {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const authData = auth.userData;

  const [gender, setGender] = useState("");
  const [genderChecked, setGenderChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  //validate input
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSubmitted(true);
    if (!authData._id && data) {
      if (signUp && gender !== "") {
        const payload = {
          email: data.email,
          password: data.password,
          fullName: data.fullName,
          gender: gender,
        };

        dispatch(ACTIONS.SIGN_UP.REQUEST(payload));
      } else if (login) {
        const loginData = { email: data.email, password: data.password };

        dispatch(ACTIONS.LOGIN.REQUEST(loginData));
      }
    }
  };

  const genderList = [
    {
      id: "male",
      title: "Male",
    },
    {
      id: "female",
      title: "Female",
    },
  ];

  const inputs = useMemo(
    () => [
      {
        inputId: "email",
        title: "Email",
        placeholder: "Your email",
        type: "email",
        registerFilter: { pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i },
        errors: errors,
      },
      {
        inputId: "password",
        title: "Password",
        registerFilter: { minLength: 6 },
        placeholder: "Your password",
        type: "password",
        errors: errors,
      },
      signUp && {
        inputId: "fullName",
        title: "Full name",
        registerFilter: {},
        placeholder: "",
        type: "text",
        errors: errors,
      },
    ],
    [errors]
  );

  return (
    <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
      {title && <h1>{title}</h1>}

      {inputs.map(
        (input) =>
          input && (
            <Input
              key={input.inputId}
              inputId={input.inputId}
              title={input.title}
              register={register}
              registerFilter={input.registerFilter}
              placeholder={input.placeholder}
              errors={input.errors}
              type={input.type}
              submitted={submitted}
            />
          )
      )}

      {/* gender */}
      {signUp && (
        <div className="wrapper">
          <div className="container">
            <span className="genderTitle">Gender</span>
            <div className="container">
              {genderList.map((g) => (
                <div className="gender" key={g.id}>
                  <input
                    key={g.id}
                    type="radio"
                    id={g.id}
                    checked={gender === g.id}
                    onChange={() => {
                      setGender(g.id);
                      setGenderChecked(true);
                    }}
                  />
                  <label htmlFor={g.id}>{g.title}</label>
                </div>
              ))}
            </div>
          </div>
          {signUp && !genderChecked && submitted && (
            <p className="genderError">Check your gender!!!</p>
          )}
        </div>
      )}

      <div className="container">
        <div style={{ width: "150px" }}></div>
        {auth.loading ? (
          <Spin style={{ margin: "0 auto" }} />
        ) : (
          <Button
            onClick={() => setSubmitted(true)}
            title={(login && "Login") || (signUp && "Sign Up")}
          ></Button>
        )}
      </div>

      {login ? (
        <div
          style={{
            paddingLeft: "150px",
            textAlign: "center",
            fontSize: "2rem",
            margin: "12px 0",
            color: "#333",
          }}
        >
          <p style={{ margin: "0" }}> Not registered yet?</p>{" "}
          <Link to="/signUp">Create new account.</Link>
        </div>
      ) : (
        <div
          style={{
            paddingLeft: "150px",
            textAlign: "center",
            fontSize: "2rem",
            margin: "12px 0 24px",
            color: "#333",
          }}
        >
          Already have an account, <Link to="/login">Login.</Link>
        </div>
      )}
    </form>
  );
}

export default Form;
