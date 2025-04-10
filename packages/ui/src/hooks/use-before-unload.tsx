import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useAlert } from '../providers/alert.provider';

export const useBeforeUnload = (status: boolean, url: string, language: 'en' | 'ko' = 'en') => {
  const router = useRouter();

  const { handleShowAlert } = useAlert();
  const [isDirty, setIsDirty] = useState<boolean>(status);

  useEffect(() => {
    setIsDirty(status);
  }, [status]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (e.type === 'beforeunload' && isDirty) {
        e.preventDefault();
        e.returnValue =
          language === 'en'
            ? 'Are you sure you want to leave this page? You have unsaved changes that will be lost.'
            : '현재 작성한 내용이 저장되지않았습니다. 저장하지 않고 나가겠습니까?';
      }
    };

    const isSamePath = (nextUrl: string) => router.asPath.split('?')[0] === nextUrl.split('?')[0];

    const syncUrlWithRouter = () => {
      // if the user clicked on the browser back button then the url displayed in the browser gets incorrectly updated
      if (router.asPath !== window.location.pathname) {
        window.history.pushState(null, '', router.asPath);
      }
    };

    const blockingCallback = (url: string) => {
      handleShowAlert({
        title: language === 'en' ? 'Warning' : '주의',
        description:
          language === 'en'
            ? 'Are you sure you want to leave this page? You have unsaved changes that will be lost.'
            : '현재 작성한 내용이 저장되지않았습니다. 저장하지 않고 나가겠습니까?',
        type: 'error',
        alertType: 'confirm',
        onConfirm: () => {
          setIsDirty(false);
          router.events.off('routeChangeStart', handleRouterChangeStart);
          router.replace(url);
        },
        onClose: () => {
          setIsDirty(true);
        }
      });
    };

    const handleRouterChangeStart = (url: string) => {
      if (isSamePath(url) || !isDirty) {
        return;
      }
      syncUrlWithRouter();
      blockingCallback(url);
      router.events.emit('routeChangeError');
      throw 'OK, This is Not Error';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    router.events.on('routeChangeStart', handleRouterChangeStart);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      router.events.off('routeChangeStart', handleRouterChangeStart);
    };
  }, [handleShowAlert, isDirty, router, router.events, url]);

  return { isDirty, setIsDirty };
};
