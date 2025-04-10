import React from 'react';
import { useRouter } from 'next/router';

import { useHistory } from '../../hooks';
import { useAlert } from '../../providers';
import { theme } from '../../styles/theme';
import Box from '../Box';
import Back from '../SVG/icons/back';
import Typography from '../Typography';

interface ITitleBox {
  title?: string;
  children?: React.ReactNode;
  backUrl?: string;
  historyBack?: boolean;
  isDirty?: boolean;
  setIsDirty?: (status: boolean) => void;
}

const TitleBox: React.FC<ITitleBox> = ({
  title,
  children,
  backUrl,
  historyBack,
  isDirty,
  setIsDirty
}) => {
  const { back } = useHistory();
  const router = useRouter();
  const { handleShowAlert, language } = useAlert();

  const handleBack = () => {
    if (!isDirty) {
      if (historyBack && backUrl) {
        router.push(backUrl);
        return;
      }
      back(backUrl);
      return;
    }
    handleShowAlert({
      title: language === 'en' ? 'Warning' : '주의',
      description:
        language === 'en'
          ? 'Are you sure you want to leave this page? You have unsaved changes that will be lost.'
          : '현재 작성한 내용이 저장되지않았습니다. 저장하지 않고 나가겠습니까?',
      type: 'error',
      alertType: 'confirm',
      onConfirm: () => {
        setIsDirty && setIsDirty(false);
        if (historyBack && backUrl) {
          router.push(backUrl);
          return;
        }
        back(backUrl);
        return;
      }
    });
  };

  return (
    <>
      {backUrl && (
        <Box display="flex" alignItems="center" mb="32px">
          <Box display="flex" alignItems="center" onClick={handleBack} cursor="pointer">
            <Back width="20" height="20" color={theme.color.gray500} />
            <Typography fontSize={theme.fontSize.text16} color={theme.color.gray500} ml="8px">
              {language === 'en' ? 'Back' : '뒤로가기'}
            </Typography>
          </Box>
        </Box>
      )}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        {title && (
          <Typography
            as="h1"
            fontSize={theme.fontSize.text24}
            fontWeight={theme.fontWeight.semiBold}
          >
            {title}
          </Typography>
        )}
        {children && (title ? <Box display="flex">{children}</Box> : children)}
      </Box>
    </>
  );
};

export default TitleBox;
