import React from 'react';
import { Box, Image, Typography } from '@repo/ui/components';
import { Star } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import styled from 'styled-components';

const HomepageReviewWrapper = styled(Box)`
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0;
    .container {
      padding: 80px 24px;
      margin: 0;
      width: 100%;
      .title {
        font-size: ${({ theme }) => theme.fontSize.text24};
        line-height: 31px;
      }
      ul.review-list {
        margin-top: 48px;
        display: block;
        & > li {
          width: 100%;
          margin-right: 0;
          padding: 24px;
          margin-bottom: 24px;
          .review-title {
            font-size: ${({ theme }) => theme.fontSize.text18};
          }
          .review-sub-title {
            font-size: ${({ theme }) => theme.fontSize.text12};
          }
          .review-description {
            font-size: ${({ theme }) => theme.fontSize.text12};
            margin-top: 12px;
          }
          &:last-child {
            margin-bottom: 0;
          }
          & > ul {
            & > li {
              svg {
                width: 20px;
                height: 20px;
              }
            }
          }
        }
      }
    }
  }
  ul.review-list {
    margin-top: 64px;
    display: flex;
    & > li {
      background-color: ${({ theme }) => theme.color.white};
      width: 424px;
      margin-right: 24px;
      border-radius: 12px;
      box-shadow: 4px 4px 20px 0px rgba(0, 0, 0, 0.1);
      padding: 32px;
      &:last-child {
        margin-right: 0;
      }
      & > ul {
        display: flex;
        margin-top: 12px;
        & > li {
          display: flex;
          margin-right: 4px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
`;

const HomepageReview = () => {
  return (
    <HomepageReviewWrapper backgroundColor={theme.color.gray50} p="100px 0">
      <Box width="1320px" margin="0 auto" className="container">
        <Typography
          fontSize="40px"
          fontWeight={theme.fontWeight.semiBold}
          color={theme.color.gray900}
          textAlign="center"
          className="title"
        >
          Discover Genuine Customer Reviews
          <br className="mobile-hide" />
          See How MenuBoss Transforms Their Experiences
        </Typography>
        <ul className="review-list">
          <li>
            <Box display="flex" alignItems="center">
              <Box
                display="flex"
                width="48px"
                height="48px"
                borderRadius="50%"
                overflow="hidden"
                mr="16px"
                alignItems="center"
              >
                <Image src="/images/main/review1.png" alt="review 1" width={48} height={48} />
              </Box>
              <Box>
                <Typography
                  fontSize={theme.fontSize.text20}
                  fontWeight={theme.fontWeight.semiBold}
                  color={theme.color.gray900}
                  className="review-title"
                >
                  Michael Alecandro
                </Typography>
                <Typography
                  fontSize={theme.fontSize.text14}
                  color={theme.color.gray500}
                  mt="4px"
                  className="review-sub-title"
                >
                  Family restaurant
                </Typography>
              </Box>
            </Box>
            <ul>
              <li>
                <Star width="24" height="24" color={theme.color.yellow500} />
              </li>
              <li>
                <Star width="24" height="24" color={theme.color.yellow500} />
              </li>
              <li>
                <Star width="24" height="24" color={theme.color.yellow500} />
              </li>
              <li>
                <Star width="24" height="24" color={theme.color.yellow500} />
              </li>
              <li>
                <Star width="24" height="24" color={theme.color.yellow500} />
              </li>
            </ul>
            <Typography
              fontSize={theme.fontSize.text16}
              color={theme.color.gray900}
              mt="12px"
              lineHeight="21px"
              className="review-description"
            >
              Unlike the existing digital signage, I was able to manage the digital signage more
              conveniently by using the MenuBoss
            </Typography>
          </li>
          <li>
            <Box display="flex" alignItems="center">
              <Box
                display="flex"
                width="48px"
                height="48px"
                borderRadius="50%"
                overflow="hidden"
                mr="16px"
                alignItems="center"
              >
                <Image src="/images/main/review2.png" alt="review 2" width={48} height={48} />
              </Box>
              <Box>
                <Typography
                  fontSize={theme.fontSize.text20}
                  fontWeight={theme.fontWeight.semiBold}
                  color={theme.color.gray900}
                  className="review-title"
                >
                  Anana Syahab
                </Typography>
                <Typography
                  fontSize={theme.fontSize.text14}
                  color={theme.color.gray500}
                  mt="4px"
                  className="review-sub-title"
                >
                  Coffee shop
                </Typography>
              </Box>
            </Box>
            <ul>
              <li>
                <Star width="24" height="24" color={theme.color.yellow500} />
              </li>
              <li>
                <Star width="24" height="24" color={theme.color.yellow500} />
              </li>
              <li>
                <Star width="24" height="24" color={theme.color.yellow500} />
              </li>
              <li>
                <Star width="24" height="24" color={theme.color.yellow500} />
              </li>
              <li>
                <Star width="24" height="24" color={theme.color.gray100} />
              </li>
            </ul>
            <Typography
              fontSize={theme.fontSize.text16}
              color={theme.color.gray900}
              mt="12px"
              lineHeight="21px"
              className="review-description"
            >
              The MenuBoss service not only creates and uses digital signage, but also provides the
              most suitable service for stores
            </Typography>
          </li>
          <li>
            <Box display="flex" alignItems="center">
              <Box
                display="flex"
                width="48px"
                height="48px"
                borderRadius="50%"
                overflow="hidden"
                mr="16px"
                alignItems="center"
              >
                <Image src="/images/main/review3.png" alt="review 2" width={48} height={48} />
              </Box>
              <Box>
                <Typography
                  fontSize={theme.fontSize.text20}
                  fontWeight={theme.fontWeight.semiBold}
                  color={theme.color.gray900}
                  className="review-title"
                >
                  Paulo Marcus
                </Typography>
                <Typography
                  fontSize={theme.fontSize.text14}
                  color={theme.color.gray500}
                  mt="4px"
                  className="review-sub-title"
                >
                  Hotel Wine bar
                </Typography>
              </Box>
            </Box>
            <ul>
              <li>
                <Star width="24" height="24" color={theme.color.yellow500} />
              </li>
              <li>
                <Star width="24" height="24" color={theme.color.yellow500} />
              </li>
              <li>
                <Star width="24" height="24" color={theme.color.yellow500} />
              </li>
              <li>
                <Star width="24" height="24" color={theme.color.yellow500} />
              </li>
              <li>
                <Star width="24" height="24" color={theme.color.yellow500} />
              </li>
            </ul>
            <Typography
              fontSize={theme.fontSize.text16}
              color={theme.color.gray900}
              mt="12px"
              lineHeight="21px"
              className="review-description"
            >
              Not only can you create it yourself through the MenuBoss, but you can also use a
              variety of templates
            </Typography>
          </li>
        </ul>
      </Box>
    </HomepageReviewWrapper>
  );
};

export default HomepageReview;
