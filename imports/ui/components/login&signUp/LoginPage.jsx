import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAuth } from "../../redux/actions/authAction";
import "../../styles/css/formPage.css";
import Form from "./Form";
import SharedPage from "./SharedPage";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);

  useEffect(() => {
    if (user.isLoggedIn) navigate("/");
  }, [user]);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Wrong username or password.");

  useEffect(() => {
    if (user.loginFailed) {
      setVisible(true);
    } else {
      setVisible(false);
      setConfirmLoading(false);
    }
  }, [user]);

  const handleOk = () => {
    dispatch(logoutAuth());
    setConfirmLoading(true);
  };

  const handleCancel = () => {
    setVisible(false);
    handleOk();
  };

  return (
    <div className="loginPage formPage">
      <SharedPage />
      <Form login title="Join To Us" gender />

      <Modal
        title="Login failed!"
        visible={visible}
        onCancel={handleCancel}
        centered
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={handleOk}
          >
            OK
          </Button>,
        ]}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
}

export default LoginPage;
