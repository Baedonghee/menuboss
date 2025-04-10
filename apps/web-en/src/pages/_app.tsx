import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ToastContainer } from 'react-toastify';
import isPropValid from '@emotion/is-prop-valid';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AlertProvider, HistoryProvider } from '@repo/ui/providers';
import { theme } from '@repo/ui/theme';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AppProps } from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { RecoilRoot } from 'recoil';
import styled, { StyleSheetManager, ThemeProvider } from 'styled-components';

import { UploadProvider } from '@/providers/upload.provider';
import GlobalStyles from '@/styles/global-styles';

import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    background-color: ${({ theme }) => theme.color.gray800};
    color: ${({ theme }) => theme.color.white};
    border-radius: 4px;
    border: 0;
  }
  .Toastify__toast--success {
    background-color: ${({ theme }) => theme.color.gray800};
    color: ${({ theme }) => theme.color.white};
  }
  .Toastify__toast--warning {
    background-color: ${({ theme }) => theme.color.yellow500};
    color: ${({ theme }) => theme.color.white};
  }
  .Toastify__toast--error {
    background-color: ${({ theme }) => theme.color.red500};
    color: ${({ theme }) => theme.color.white};
  }
  .toast-container {
    margin-bottom: 8px;
    min-height: 46px;
    padding: 12px 16px;
  }
  .toast-body {
    font-size: ${({ theme }) => theme.fontSize.text16};
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    padding: 0;
  }
`;

const { publicRuntimeConfig } = getConfig();
const { GOOGLE_LOGIN_API_KEY, MODE, GOOGLE_ANALYTICS } = publicRuntimeConfig;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GoogleOAuthProvider clientId={GOOGLE_LOGIN_API_KEY}>
        <StyleSheetManager shouldForwardProp={isPropValid}>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <StyledToastContainer limit={1} />
            <RecoilRoot>
              <UploadProvider>
                <AlertProvider>
                  <HistoryProvider>
                    <DndProvider backend={HTML5Backend}>
                      {MODE !== 'local' && (
                        <GoogleAnalytics
                          trackPageViews
                          gaMeasurementId={GOOGLE_ANALYTICS}
                          debugMode={MODE !== 'production'}
                        />
                      )}
                      <Component {...pageProps} />
                    </DndProvider>
                  </HistoryProvider>
                </AlertProvider>
              </UploadProvider>
            </RecoilRoot>
          </ThemeProvider>
        </StyleSheetManager>
      </GoogleOAuthProvider>
    </>
  );
}

export default MyApp;
