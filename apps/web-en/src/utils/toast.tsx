/* eslint-disable react/react-in-jsx-scope */
import { toast, ToastOptions } from 'react-toastify';
import { CheckFilled, Warning } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';

const defaultOption: ToastOptions = {
  position: 'top-left',
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: false,
  closeButton: false,
  autoClose: 3000,
  bodyClassName: 'toast-body',
  className: 'toast-container'
};

export const errorToast = (message = "Sorry, we're addressing a system error.") => {
  toast.error(message, {
    ...defaultOption,
    icon: <Warning width="20" height="20" color={theme.color.white} />
  });
};

export const warningToast = (message = "Sorry, we're addressing a system error.") => {
  toast.warning(message, {
    ...defaultOption,
    icon: <CheckFilled width="20" height="20" color={theme.color.white} />
  });
};

export const successToast = (message = "Sorry, we're addressing a system error.") => {
  toast.success(message, {
    ...defaultOption,
    icon: <CheckFilled width="20" height="20" color={theme.color.white} />
  });
};
