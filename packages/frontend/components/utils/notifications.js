import { toast } from "react-toastify";

export const ToastAlerts = (data) => {
  let { success, message } = data;
  if (success) {
    toast.success(message);
  } else {
    toast.error(message);
  }
};
