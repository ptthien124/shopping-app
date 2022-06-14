import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/css/formPage.css";
import Form from "./Form";
import SharedPage from "./SharedPage";
import React from "react";
import { signUpFailOk } from "../../redux/actions/auth";
import useModal from "../../hooks/useModal";

function SignUpPage() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  // const [visible, setVisible] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);

  const [
    visible,
    confirmLoading,
    setVisible,
    setConfirmLoading,
    handleOk,
    handleCancel,
  ] = useModal();

  useEffect(() => {
    if (!auth.userData._id && auth.error !== "") {
      setVisible(true);
    } else {
      setVisible(false);
      setConfirmLoading(false);
    }
  }, [auth]);

  // const handleOk = () => {
  //   setConfirmLoading(true);
  //   dispatch(signUpFailOk());
  // };

  // const handleCancel = () => {
  //   setVisible(false);
  //   dispatch(signUpFailOk());
  // };

  return (
    <div className="signUpPage formPage">
      <SharedPage />
      <Form signUp title="Welcome to the app" />

      <Modal
        title="Sign up failed!"
        visible={visible}
        onCancel={() => {
          handleCancel();
          dispatch(signUpFailOk());
        }}
        centered
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={() => {
              handleOk();
              dispatch(signUpFailOk());
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

export default SignUpPage;
