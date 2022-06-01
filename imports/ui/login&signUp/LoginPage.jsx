import React from "react";
import "../../styles/css/formPage.css";
import Form from "./Form";
import SharedPage from "./SharedPage";

function LoginPage() {
  return (
    <div className="loginPage formPage">
      <SharedPage />
      <Form login title="Join To Us" gender />
    </div>
  );
}

export default LoginPage;
