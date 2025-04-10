import React, { useState } from 'react';
import { Box, Typography } from '@repo/ui/components';
import { Down, Up } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import Link from 'next/link';
import styled from 'styled-components';

import { ADMIN_PATH, PATH } from '@/utils/path';

const PriceFAQWrapper = styled(Box)`
  @media ${({ theme }) => theme.device.mobile} {
    padding: 80px 24px;
    .container {
      width: 100%;
      .title {
        font-size: ${({ theme }) => theme.fontSize.text24};
        line-height: 31px;
      }
      .description {
        margin-top: 12px;
        font-size: ${({ theme }) => theme.fontSize.text16};
        line-height: 21px;
      }
      ul {
        margin-top: 48px;
        li {
          .header {
            padding: 0px 16px;
            height: 50px;
            .header-title {
              font-size: ${({ theme }) => theme.fontSize.text14};
            }
            svg {
              width: 18px;
              height: 18px;
            }
          }
          .content {
            padding: 20px 16px;
            font-size: ${({ theme }) => theme.fontSize.text14};
            line-height: 19px;
          }
        }
      }
    }
  }
  ul {
    margin-top: 64px;
    li {
      border: 1px solid ${({ theme }) => theme.color.gray300};
      border-radius: 12px;
      margin-bottom: 16px;
      &:last-child {
        margin-bottom: 0px;
      }
      .header {
        padding: 0px 32px;
        height: 67px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
      }
      .content {
        padding: 20px 32px;
        font-size: ${({ theme }) => theme.fontSize.text16};
        color: ${({ theme }) => theme.color.gray600};
        line-height: 21px;
      }
    }
  }
`;

const PriceFAQ = () => {
  const [active, setActive] = useState<number[]>([1]);

  const handleActive = (index: number) => {
    if (active.includes(index)) {
      setActive(active.filter((item) => item !== index));
    } else {
      setActive([...active, index]);
    }
  };

  return (
    <PriceFAQWrapper p="100px 0px">
      <Box width="1320px" margin="0 auto" className="container">
        <Box textAlign="center">
          <Typography
            as="span"
            fontSize="40px"
            fontWeight={theme.fontWeight.semiBold}
            color={theme.color.gray900}
            textAlign="center"
            className="title"
          >
            MenuBoss{' '}
            <Typography as="span" color={theme.color.secondary500}>
              FAQ
            </Typography>
          </Typography>
        </Box>
        <ul>
          <li>
            <div className="header" onClick={() => handleActive(1)}>
              <Typography
                fontSize={theme.fontSize.text20}
                fontWeight={theme.fontWeight.semiBold}
                color={theme.color.gray900}
                className="header-title"
              >
                What is the difference between the plan?
              </Typography>
              {active.includes(1) ? (
                <Up width="24" height="24" color={theme.color.gray500} />
              ) : (
                <Down width="24" height="24" color={theme.color.gray500} />
              )}
            </div>
            {active.includes(1) && (
              <div className="content">
                The difference between plans depends on the level of items included
                <br className="pc-hide" />
                <br className="pc-hide" />
                Details of the differences in the plan can be found in the Compare plans & features
                section in Pricing page.
              </div>
            )}
          </li>
          <li>
            <div className="header" onClick={() => handleActive(2)}>
              <Typography
                fontSize={theme.fontSize.text20}
                fontWeight={theme.fontWeight.semiBold}
                color={theme.color.gray900}
                className="header-title"
              >
                Can I change the plan while using it?
              </Typography>
              {active.includes(2) ? (
                <Up width="24" height="24" color={theme.color.gray500} />
              ) : (
                <Down width="24" height="24" color={theme.color.gray500} />
              )}
            </div>
            {active.includes(2) && (
              <div className="content">
                Absolutely! Adjusting your plan mid-use is easy. Just sign in at{' '}
                <Link
                  href={PATH.LOGIN}
                  style={{ color: theme.color.primary500 }}
                  className="underline"
                >
                  themenuboss.com/login
                </Link>{' '}
                and head over to{' '}
                <Link
                  href={ADMIN_PATH.ACCOUNT_PLAN}
                  style={{ color: theme.color.primary500 }}
                  className="underline"
                >
                  themenuboss.com/account/plan
                </Link>
                . There, you can choose your desired plan, verify your payment details, and proceed
                with the payment. Keep in mind, switching from a higher to a lower plan might limit
                your access if your existing data exceeds the new plan{"'"}s cloud storage limit. To
                prevent any service interruptions, we advise removing any unneeded media beforehand.
              </div>
            )}
          </li>
          <li>
            <div className="header" onClick={() => handleActive(3)}>
              <Typography
                fontSize={theme.fontSize.text20}
                fontWeight={theme.fontWeight.semiBold}
                color={theme.color.gray900}
                className="header-title"
              >
                Where can I see how to use it in detail?
              </Typography>
              {active.includes(3) ? (
                <Up width="24" height="24" color={theme.color.gray500} />
              ) : (
                <Down width="24" height="24" color={theme.color.gray500} />
              )}
            </div>
            {active.includes(3) && (
              <div className="content">
                For instructions on usage, please refer to the{' '}
                <a
                  href="/guides/Quick_Start_Guide_App_EN_ver1.0.pdf"
                  className="underline"
                  target="_blank"
                  style={{ color: theme.color.primary500 }}
                >
                  Quick Start Guide
                </a>
                . Should you have any additional queries, feel free to reach out to us at{' '}
                <a
                  href="mailto:support@themenuboss.com"
                  className="underline"
                  style={{ color: theme.color.primary500 }}
                >
                  support@themenuboss.com
                </a>
                .
              </div>
            )}
          </li>
          <li>
            <div className="header" onClick={() => handleActive(4)}>
              <Typography
                fontSize={theme.fontSize.text20}
                fontWeight={theme.fontWeight.semiBold}
                color={theme.color.gray900}
                className="header-title"
              >
                Where can I contact if I want to make a partner proposal?
              </Typography>
              {active.includes(4) ? (
                <Up width="24" height="24" color={theme.color.gray500} />
              ) : (
                <Down width="24" height="24" color={theme.color.gray500} />
              )}
            </div>
            {active.includes(4) && (
              <div className="content">
                Interested in partnering with us? We{"'"}d love to hear from you! Reach out to us at{' '}
                <a
                  href="mailto:support@themenuboss.com"
                  className="underline"
                  style={{ color: theme.color.primary500 }}
                >
                  info@themenuboss.com
                </a>
                . We{"'"}re constantly seeking collaborative opportunities and offer a variety of
                solutions to help expand your business.
              </div>
            )}
          </li>
          <li>
            <div className="header" onClick={() => handleActive(5)}>
              <Typography
                fontSize={theme.fontSize.text20}
                fontWeight={theme.fontWeight.semiBold}
                color={theme.color.gray900}
                className="header-title"
              >
                How do I cancel my plan?
              </Typography>
              {active.includes(5) ? (
                <Up width="24" height="24" color={theme.color.gray500} />
              ) : (
                <Down width="24" height="24" color={theme.color.gray500} />
              )}
            </div>
            {active.includes(5) && (
              <div className="content">
                To terminate your plan, simply sign in at{' '}
                <Link
                  href={PATH.LOGIN}
                  style={{ color: theme.color.primary500 }}
                  className="underline"
                >
                  themenuboss.com/login
                </Link>{' '}
                and select the {"'"}DELETE ACCOUNT{"'"} option at{' '}
                <Link
                  href={ADMIN_PATH.ACCOUNT_PROFILE}
                  style={{ color: theme.color.primary500 }}
                  className="underline"
                >
                  themenuboss.com/account/profile
                </Link>
                . Remember, canceling your account results in the permanent deletion of all your
                cloud-stored data, which cannot be restored. We strongly suggest backing up your
                data prior to cancellation for your peace of mind.
              </div>
            )}
          </li>
        </ul>
      </Box>
    </PriceFAQWrapper>
  );
};

export default PriceFAQ;
