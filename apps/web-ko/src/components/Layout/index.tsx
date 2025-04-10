import React from 'react';
import { Box } from '@repo/ui/components';
import styled from 'styled-components';

import Header from '../common/Header';
import Sidebar from '../common/Sidebar';

const LayoutWrapper = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  overflow-y: auto;
  main {
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-y: auto;
    width: 100%;
    min-width: 1148px;
    .container {
      padding: 32px;
    }
  }
`;

interface ILayout {
  children: React.ReactNode;
  isSearch?: boolean;
}

const Layout: React.FC<ILayout> = ({ children, isSearch }) => {
  return (
    <LayoutWrapper>
      <Sidebar />
      <main>
        <Header isSearch={isSearch} />
        <Box p="32px" maxWidth="1600px">
          {children}
        </Box>
      </main>
    </LayoutWrapper>
  );
};

export default Layout;
