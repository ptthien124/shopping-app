import { notification } from "antd";
import React from "react";

function useNotification(title = "", width = 300, duration = 2.5) {
  const openNotification = () => {
    notification.open({
      // message: "",
      description: `Add ${title} to your cart.`,
      className: "custom-class",
      style: {
        width: width,
      },
      duration: duration,
    });
  };

  return openNotification;
}

export default useNotification;
