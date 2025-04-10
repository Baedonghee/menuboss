import React from 'react';
import { Box, Typography } from '@repo/ui/components';
import { theme } from '@repo/ui/theme';
import parse from 'html-react-parser';
import styled from 'styled-components';

import { serverCardList } from '@/models/main';

const HomepageServiceCardWrapper = styled.li``;

interface IHomepageServiceCard {
  item: (typeof serverCardList)[0];
}

const HomepageServiceCard: React.FC<IHomepageServiceCard> = ({ item }) => {
  return (
    <HomepageServiceCardWrapper>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="48px"
        height="48px"
        borderRadius="50%"
        backgroundColor={theme.color.primary500}
        mr="16px"
        className="service-card-icon"
      >
        {item.icon}
      </Box>
      <Typography
        fontSize={theme.fontSize.text20}
        fontWeight={theme.fontWeight.semiBold}
        color={theme.color.gray900}
        mt="76px"
        className="service-card-title"
      >
        {item.name}
      </Typography>

      <Box
        mt="32px"
        fontSize={theme.fontSize.text16}
        fontWeight={theme.fontWeight.normal}
        color={theme.color.gray900}
        className="service-card-description"
        lineHeight="21px"
      >
        {parse(item.description)}
      </Box>
      {/* <Box
        mt="24px"
        fontSize={theme.fontSize.text14}
        fontWeight={theme.fontWeight.normal}
        color={checked ? theme.color.white : theme.color.gray500}
      >
        Learn More
      </Box> */}
    </HomepageServiceCardWrapper>
  );
};

export default HomepageServiceCard;
