import React from "react";
import { Button, Modal } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../hooks";
import { ACTIONS } from "../../redux/actions/auth";
import "../../styles/css/formPage.css";
import { Form, SharedPage } from "../login&signUp";

function LoginPage() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const {
    visible,
    confirmLoading,
    setVisible,
    setConfirmLoading,
    handleOk,
    handleCancel,
  } = useModal();

  useEffect(() => {
    if (auth.error !== "") {
      setVisible(true);
    } else {
      setVisible(false);
      setConfirmLoading(false);
    }
  }, [auth]);

  return (
    <div className="loginPage formPage">
      <SharedPage />
      <Form login title="Join To Us" gender />

      <Modal
        title="Login failed!"
        visible={visible}
        onCancel={() => {
          handleCancel();
          handleOk();
        }}
        centered
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={() => {
              handleOk();
              dispatch(ACTIONS.LOGOUT.REQUEST());
            }}
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

export default LoginPage;
