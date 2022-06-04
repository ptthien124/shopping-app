import { Spin } from "antd";
import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../redux/actions/authAction";
import { signUpRequest } from "../../redux/actions/userAction";
import "../../styles/css/form.css";
import Button from "../Button";

function Form({ title, login, signUp }) {
  const dispatch = useDispatch();

  const users = Meteor.users.find({}).fetch();

  const auth = useSelector((state) => state.auth);

  const [gender, setGender] = useState();
  const [genderChecked, setGenderChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  //validate input
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (signUp) {
      const signUpData = {
        username: data.email,
        password: data.password,
        fullName: data.fullName,
        gender: gender,
      };
      dispatch(signUpRequest(signUpData));
    } else if (login) {
      const loginData = { username: data.email, password: data.password };
      dispatch(loginRequest(loginData));
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

  return (
    <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
      {title && <h1>{title}</h1>}

      {/* email */}
      <div className="wrapper">
        <div className="container">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your email"
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
        </div>
        {Object.keys(errors).length !== 0 && !emailFocus && (
          <ul>
            {errors.email?.type === "required" && <li>Email is required</li>}
            {errors.email?.type === "pattern" && <li>Invalid email address</li>}
          </ul>
        )}
      </div>

      {/* password */}
      <div className="wrapper">
        <div className="container">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Your password"
            {...register("password", { required: true, minLength: 6 })}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
          />
        </div>

        {Object.keys(errors).length !== 0 && !passwordFocus && (
          <ul>
            {errors.password?.type === "required" && (
              <li>Password is required</li>
            )}
            {errors.password?.type === "minLength" && (
              <li>Password must be have 6 characters long</li>
            )}
          </ul>
        )}
      </div>

      {/* fullName */}
      {signUp && (
        <div className="wrapper">
          <div className="container">
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              {...register("fullName", { required: true })}
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
            />
          </div>
          {!nameFocus && Object.keys(errors).length !== 0 && (
            <ul>
              {errors.fullName?.type === "required" && (
                <li>Name is required</li>
              )}
            </ul>
          )}
        </div>
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
        {auth.logging ? (
          <Spin style={{ margin: "0 auto" }} />
        ) : (
          <Button
            onClick={() => setSubmitted(true)}
            title={(login && "Login") || (signUp && "Sign Up")}
          ></Button>
        )}
      </div>
    </form>
  );
}

export default Form;
