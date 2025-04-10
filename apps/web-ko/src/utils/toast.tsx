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

export const errorToast = (
  message = '현재 네트워크 오류가 발생했습니다. 잠시 후에 다시 시도해 주세요.'
) => {
  toast.error(message, {
    ...defaultOption,
    icon: <Warning width="20" height="20" color={theme.color.white} />
  });
};

export const warningToast = (
  message = '현재 네트워크 오류가 발생했습니다. 잠시 후에 다시 시도해 주세요.'
) => {
  toast.warning(message, {
    ...defaultOption,
    icon: <CheckFilled width="20" height="20" color={theme.color.white} />
  });
};

export const successToast = (
  message = '현재 네트워크 오류가 발생했습니다. 잠시 후에 다시 시도해 주세요.'
) => {
  toast.success(message, {
    ...defaultOption,
    icon: <CheckFilled width="20" height="20" color={theme.color.white} />
  });
};
