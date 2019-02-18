import { toast } from 'react-toastify';

export const toastSuccess = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER
  });
};

export const toastError = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER
  });
};
