import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpDefault } from "../../redux/actions/userAction";
import "../../styles/css/formPage.css";
import Form from "./Form";
import SharedPage from "./SharedPage";

function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (auth.isLoggedIn) navigate("/");
  }, [auth]);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");

  useEffect(() => {
    if (user.isSignUpFailed) {
      setModalText(user.error);
      setVisible(true);
    } else {
      setVisible(false);
      setConfirmLoading(false);
    }
  }, [user]);

  const handleOk = () => {
    dispatch(signUpDefault());
    setConfirmLoading(true);
  };

  return (
    <div className="signUpPage formPage">
      <SharedPage />
      <Form signUp title="Welcome to the app" />

      <Modal
        title="Sign up failed!"
        visible={visible}
        onOk={handleOk}
        maskClosable={false}
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

export default SignUpPage;
