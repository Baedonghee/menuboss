import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@repo/ui/components';
import { theme } from '@repo/ui/theme';
import styled from 'styled-components';

const AcceptCookie = () => {
  const [isCookieAccept, setIsCookieAccept] = useState(false);

  useEffect(() => {
    const cookieAccept = localStorage.getItem('cookieAccept');
    if (!cookieAccept) {
      setIsCookieAccept(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieAccept', 'true');
    setIsCookieAccept(false);
  };

  return (
    isCookieAccept && (
      <Box position="fixed" width="100%" p="0px 160px" bottom="32px" left="0px" height="92px">
        <Box
          margin="0 auto"
          boxShadow="4px 0px 8px 0px rgba(0, 0, 0, 0.10), 0px 4px 8px 0px rgba(0, 0, 0, 0.10);"
          height="100%"
          backgroundColor={theme.color.gray50}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="0px 120px"
            height="100%"
          >
            <Typography fontSize={theme.fontSize.text14} color={theme.color.gray900}>
              By clicking “Accept Cookies”, you agree to the storing of cookies on your device to
              enhance site navigation, analyze site usage,
              <br />
              and assist in our marketing efforts. View our Cookie Policy for more information.
            </Typography>
            <Box>
              <Button width="120px" size="s" onClick={handleAcceptAll}>
                Accept All
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  );
};

export default AcceptCookie;
