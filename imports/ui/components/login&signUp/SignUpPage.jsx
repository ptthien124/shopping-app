import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ACTIONS } from "../../redux/actions/auth";
import "../../styles/css/formPage.css";
import Form from "./Form";
import SharedPage from "./SharedPage";

function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.userData._id) navigate("/");
  }, [auth]);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (!auth.userData._id && auth.error !== "") {
      setVisible(true);
    } else {
      setVisible(false);
      setConfirmLoading(false);
    }
  }, [auth]);

  const handleOk = () => {
    dispatch(ACTIONS.LOGOUT.REQUEST());
    setConfirmLoading(true);
  };

  const handleCancel = () => {
    setVisible(false);
    dispatch(ACTIONS.LOGOUT.REQUEST());
  };

  return (
    <div className="signUpPage formPage">
      <SharedPage />
      <Form signUp title="Welcome to the app" />

      <Modal
        title="Sign up failed!"
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
        <p>{auth.error}</p>
      </Modal>
    </div>
  );
}

export default SignUpPage;
