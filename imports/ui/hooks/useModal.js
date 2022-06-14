import React, { useState } from "react";

function useModal() {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return [
    visible,
    confirmLoading,
    setVisible,
    setConfirmLoading,
    handleOk,
    handleCancel,
  ];
}

export default useModal;
