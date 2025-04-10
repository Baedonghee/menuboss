import React from 'react';
import { Box, Button, Typography } from '@repo/ui/components';
import { AppStore, GooglePlayStore, SidebarLogo } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import styled from 'styled-components';

const AppDownloadWrapper = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/app/homepage-app-download.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  .app-download {
    background-color: ${({ theme }) => theme.color.white};
    border: 0;
    color: ${({ theme }) => theme.color.gray900};
    &:hover {
      background-color: ${({ theme }) => theme.color.white};
      border: 0;
      color: ${({ theme }) => theme.color.gray900};
    }
  }
`;

const AppDownload = () => {
  return (
    <AppDownloadWrapper>
      <Box p="0px 24px" position="relative">
        <Box mt="52px">
          <SidebarLogo width="222" height="36" color={theme.color.white} />
          <Typography
            fontSize={theme.fontSize.text20}
            fontWeight={theme.fontWeight.bold}
            color={theme.color.white}
            mt="24px"
          >
            The most perfect Business
            <br />
            Digital Signage service
          </Typography>
        </Box>
      </Box>
      <Box position="absolute" bottom="72px" left="0" p="0px 24px" width="100%">
        <a
          href="https://apps.apple.com/us/app/menuboss-digital-signage-pro/id6467700525"
          target="_blank"
          rel="noreferrer"
        >
          <Button className="app-download" borderRadius="100px" size="l" width="100%">
            <AppStore width="24" height="24" />
            App Store
          </Button>
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=com.orot.menuboss"
          target="_blank"
          rel="noreferrer"
        >
          <Button className="app-download" borderRadius="100px" size="l" width="100%" mt="16px">
            <GooglePlayStore width="24" height="24" />
            Google Play
          </Button>
        </a>
      </Box>
    </AppDownloadWrapper>
  );
};

export default AppDownload;
