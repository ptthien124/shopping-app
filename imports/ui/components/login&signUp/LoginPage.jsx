import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "../../redux/actions/auth";
import "../../styles/css/formPage.css";
import Form from "./Form";
import SharedPage from "./SharedPage";
import React from "react";

function LoginPage() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    if (auth.error !== "") {
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
        <p>{auth.error}</p>
      </Modal>
    </div>
  );
}

export default LoginPage;
