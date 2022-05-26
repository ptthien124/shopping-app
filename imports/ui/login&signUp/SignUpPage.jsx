import React from "react";
import Form from "./Form";
import SharedPage from "./SharedPage";
import "../../styles/css/formPage.css";

function SignUpPage() {
  return (
    <div className="signUpPage formPage">
      <SharedPage />
      <Form signUp title="Welcome to the app" />
    </div>
  );
}

export default SignUpPage;
