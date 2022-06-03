import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../../styles/css/formPage.css";
import Form from "./Form";
import SharedPage from "./SharedPage";

function LoginPage() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth);

  useEffect(() => {
    if (user.isLoggedIn) navigate("/");
  }, [user]);

  return (
    <div className="loginPage formPage">
      <SharedPage />
      <Form login title="Join To Us" gender />
    </div>
  );
}

export default LoginPage;
