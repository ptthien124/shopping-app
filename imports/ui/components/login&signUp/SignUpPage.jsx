import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../styles/css/formPage.css";
import Form from "./Form";
import SharedPage from "./SharedPage";

function SignUpPage() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth);

  useEffect(() => {
    if (user.isLoggedIn) navigate("/");
  }, [user]);

  return (
    <div className="signUpPage formPage">
      <SharedPage />
      <Form signUp title="Welcome to the app" />
    </div>
  );
}

export default SignUpPage;
