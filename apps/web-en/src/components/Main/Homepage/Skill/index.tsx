import React from 'react';
import { Box, Button, Image, Typography } from '@repo/ui/components';
import { AmazonAppStore, AppStore, GooglePlayStore } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { authUserSelector } from '@/state/auth';
import { ADMIN_PATH, PATH } from '@/utils/path';

const HomepageSkillWrapper = styled(Box)`
  @media ${({ theme }) => theme.device.mobile} {
    padding: 0;
    .container {
      padding: 80px 24px;
      width: 100%;
      margin: 0;
    }
    .manual {
      display: block;
      flex-direction: row;
      margin-bottom: 100px;
      &.last {
        margin-bottom: 0;
      }
      .image-wrapper {
        margin-right: 0;
        img {
          width: 100% !important;
        }
      }
      .manual-box {
        width: 100%;
        margin-top: 40px;
        text-align: center;
        margin-left: 0;
        margin-right: 0;
        .manual-title {
          font-size: ${({ theme }) => theme.fontSize.text20};
        }
        .manual-desc {
          margin-top: 16px;
          font-size: ${({ theme }) => theme.fontSize.text14};
          line-height: 19px;
        }
        .manual-button-wrapper {
          margin-top: 24px;
          display: flex;
          justify-content: center;
          a {
            margin-right: 12px !important;
            &:last-of-type {
              margin-right: 0 !important;
            }
            button {
              width: 165px;
            }
          }
        }
      }
    }
  }
`;

const HomepageSkill = () => {
  const me = useRecoilValue(authUserSelector);

  return (
    <HomepageSkillWrapper p="100px 0">
      <Box width="1320px" margin="0 auto" className="container">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb="200px"
          flexDirection="row-reverse"
          className="manual"
        >
          <Box display="flex" className="image-wrapper">
            <Image
              width={500}
              height={420}
              src="/images/main/skill-service.png"
              alt="skill service"
            />
          </Box>
          <Box mr="120px" width="700px" className="manual-box">
            <Typography
              as="span"
              fontSize={theme.fontSize.text32}
              fontWeight={theme.fontWeight.semiBold}
              color={theme.color.gray900}
              className="manual-title"
            >
              Interested in digital signage, but worried about cost and complexity? Don’t worry
            </Typography>
            <Typography
              fontSize={theme.fontSize.text18}
              color={theme.color.gray700}
              mt="24px"
              lineHeight="24px"
              className="manual-desc"
            >
              Experience cost-effective simplicity with MenuBoss. This user-friendly platform lets
              you quickly update and modify content, enabling you to effortlessly create engaging
              and unique menu displays
            </Typography>
            <Box mt="40px" className="manual-button-wrapper">
              <Link href={me ? ADMIN_PATH.SCREENS : PATH.LOGIN}>
                <Button width="160px" size="l" variant="outline">
                  Get started
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb="200px"
          className="manual"
        >
          <Box display="flex" className="image-wrapper">
            <Image
              width={500}
              height={420}
              src="/images/main/skill-mobile.png"
              alt="skill mobile"
            />
          </Box>
          <Box ml="120px" width="700px" className="manual-box">
            <Typography
              as="span"
              fontSize={theme.fontSize.text32}
              fontWeight={theme.fontWeight.semiBold}
              color={theme.color.gray900}
              className="manual-title"
            >
              Manage your menu display seamlessly with the MenuBoss mobile app
            </Typography>
            <Typography
              fontSize={theme.fontSize.text18}
              color={theme.color.gray700}
              mt="24px"
              lineHeight="24px"
              className="manual-desc"
            >
              Beyond crafting and customizing menus via the web, gain full control over your menu
              screens directly through the convenience of the MenuBoss Mobile TV app
            </Typography>
            <Box mt="40px" display="flex" className="manual-button-wrapper">
              <a
                href="https://apps.apple.com/us/app/menuboss-digital-signage-pro/id6467700525"
                target="_blank"
                style={{ marginRight: '24px' }}
                rel="noreferrer"
              >
                <Button width="180px" size="l" variant="outline">
                  <AppStore width="24" height="24" />
                  App Store
                </Button>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.orot.menuboss"
                target="_blank"
                rel="noreferrer"
              >
                <Button width="180px" size="l" variant="outline">
                  <GooglePlayStore width="24" height="24" />
                  Google Play
                </Button>
              </a>
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row-reverse"
          className="manual last"
        >
          <Box display="flex" className="image-wrapper">
            <Image width={500} height={420} src="/images/main/skill-tv.png" alt="skill tv" />
          </Box>
          <Box mr="120px" width="700px" className="manual-box">
            <Typography
              as="span"
              fontSize={theme.fontSize.text32}
              fontWeight={theme.fontWeight.semiBold}
              color={theme.color.gray900}
              className="manual-title"
            >
              Skip the expensive hardware for your digital signage. Just download the free
              MenuBossTV app
            </Typography>
            <Typography
              fontSize={theme.fontSize.text18}
              color={theme.color.gray700}
              mt="24px"
              lineHeight="24px"
              className="manual-desc"
            >
              If you have a Smart TV with Google OS, you’re already equipped to use MenuBoss
              Solutions. For other TVs, choose affordable options like Amazon Fire TV Sticks or
              Google Chromecast, install the MenuBossTV app, and connect. Simply download the free
              MenuBossTV app on your device to get started
            </Typography>
            <Box mt="40px" className="manual-button-wrapper">
              <a
                href="https://www.amazon.com/gp/product/B0CKYWPB62"
                target="_blank"
                rel="noreferrer"
              >
                <Button width="160px" size="l" variant="outline">
                  <AmazonAppStore width="24" height="24" />
                  App Store
                </Button>
              </a>
            </Box>
          </Box>
        </Box>
      </Box>
    </HomepageSkillWrapper>
  );
};

export default HomepageSkill;
