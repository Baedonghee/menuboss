/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert, ModalContainer } from '@repo/ui/components';
import { useRouter } from 'next/router';

interface IAlert {
  open: boolean;
  type: 'check' | 'error' | 'warning' | 'info' | 'success';
  alertType: 'alert' | 'confirm';
  title: string;
  description: string;
  confirmText: string;
  onConfirm?: () => void;
  onClose?: () => void;
}

interface IAlertContext {
  alert: IAlert;
  handleShowAlert: ({
    type,
    title,
    alertType,
    description,
    confirmText
  }: {
    type?: 'check' | 'error' | 'warning' | 'info' | 'success';
    alertType?: 'alert' | 'confirm';
    title?: string;
    description: string;
    confirmText?: string;
    onConfirm?: () => void;
    onClose?: () => void;
  }) => void;
  handleClose: () => void;
  language: 'en' | 'ko';
}

const AlertContext = createContext<IAlertContext | undefined>(undefined);

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}

export function AlertProvider({ children, language = 'en' }: React.PropsWithChildren<any>) {
  const router = useRouter();
  const [alert, setAlert] = useState<IAlert>({
    open: false,
    type: 'check',
    alertType: 'alert',
    title: language === 'en' ? 'Notification' : '알림',
    description: '',
    confirmText: language === 'en' ? 'Ok' : '확인',
    onConfirm: () => {},
    onClose: undefined
  });

  useEffect(() => {
    const handleRouteChange = () => {
      handleClose();
    };
    router.events.on('routeChangeStart', handleRouteChange);

    // Clean up the event listener when the component unmounts
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  const handleShowAlert = ({
    type = 'check',
    title = language === 'en' ? 'Notification' : '알림',
    alertType = 'alert',
    description,
    confirmText = language === 'en' ? 'Ok' : '확인',
    onConfirm,
    onClose
  }: {
    type?: 'check' | 'error' | 'warning' | 'info' | 'success';
    alertType?: 'alert' | 'confirm';
    title?: string;
    description: string;
    confirmText?: string;
    onConfirm?: () => void;
    onClose?: () => void;
  }) => {
    setAlert({
      open: true,
      type,
      alertType,
      title,
      description,
      confirmText,
      onConfirm,
      onClose
    });
  };

  const handleClose = () => {
    if (alert.onClose) {
      alert.onClose();
    }
    setAlert({
      open: false,
      type: 'check',
      alertType: 'alert',
      title: '',
      description: '',
      confirmText: language === 'en' ? 'Ok' : '확인',
      onConfirm: undefined,
      onClose: undefined
    });
  };

  const handleConfirm = () => {
    alert.onConfirm && alert.onConfirm();
  };

  const contextValue: IAlertContext = {
    alert,
    handleShowAlert,
    handleClose,
    language
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      {alert?.open && (
        <ModalContainer onClose={handleClose}>
          <Alert
            title={alert.title}
            type={alert.type}
            alertType={alert.alertType}
            description={alert.description}
            confirmText={alert.confirmText}
            onClose={handleClose}
            onConfirm={handleConfirm}
            language={language}
          />
        </ModalContainer>
      )}
    </AlertContext.Provider>
  );
}
