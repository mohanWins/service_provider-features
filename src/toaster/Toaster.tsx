import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const toastConfig: any = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  // pauseOnHover: true,
  draggable: true,
};

const Toastify = () => {
  return (
    <ToastContainer
      position={toastConfig?.position}
      autoClose={toastConfig?.autoClose}
      hideProgressBar={toastConfig?.hideProgressBar}
      // newestOnTop={toastConfig.newestOnTop}
      closeOnClick={toastConfig?.closeOnClick}
      // rtl={toastConfig.rtl}
      // pauseOnFocusLoss={toastConfig.pauseOnFocusLoss}
      draggable={toastConfig?.draggable}

      // pauseOnHover={toastConfig.pauseOnHover}
    />
  );
};
export const showToast = (message: any, type: any) => {
  switch (type) {
    case "success":
      toast.success(message, toastConfig);
      break;
    case "error":
      toast.error(message, toastConfig);
      break;
    case "info":
      toast.info(message, toastConfig);
      break;
    case "warning":
      toast.warning(message, toastConfig);
      break;
    default:
      toast(message, toastConfig);
  }
};

export default Toastify;
