import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutAuth } from "../../redux/actions/authAction";
import "../../styles/css/formPage.css";
import Form from "./Form";
import SharedPage from "./SharedPage";

function LoginPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logoutAuth());
  }, []);

  return (
    <div className="loginPage formPage">
      <SharedPage />
      <Form login title="Join To Us" gender />
    </div>
  );
}

export default LoginPage;
