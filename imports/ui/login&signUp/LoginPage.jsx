import React from "react";
import Form from "./Form";
import SharedPage from "./SharedPage";
import "../../styles/css/formPage.css";

function LoginPage() {
  return (
    <div className="loginPage formPage">
      <SharedPage />
      <Form login title="Join To Us" gender />
    </div>
  );
}

export default LoginPage;
