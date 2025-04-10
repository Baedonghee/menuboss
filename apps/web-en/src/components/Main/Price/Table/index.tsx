import React from 'react';
import { Box, Button, Typography } from '@repo/ui/components';
import { CheckLine } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { authUserSelector } from '@/state/auth';
import { ADMIN_PATH, PATH } from '@/utils/path';

const PriceTableWrapper = styled(Box)`
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
    }
    .table {
      width: 100%;
      overflow-x: scroll;
      flex-wrap: nowrap;
      justify-content: start;
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    ul.header-list {
      width: 656px;
      li {
        width: 164px !important;
        font-size: ${({ theme }) => theme.fontSize.text14} !important;
      }
    }
    ul.content-list {
      li {
        width: 656px;
        & > div {
          width: 164px !important;
          font-size: ${({ theme }) => theme.fontSize.text12} !important;
        }
      }
    }
  }
  ul.header-list {
    display: flex;
    background-color: ${({ theme }) => theme.color.primary50};
    li {
      width: 200px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${({ theme }) => theme.fontSize.text18};
      color: ${({ theme }) => theme.color.gray900};
      font-weight: ${({ theme }) => theme.fontWeight.semiBold};
      &:first-child {
        width: 320px;
        justify-content: start;
        padding-left: 16px;
      }
    }
  }
  ul.content-list {
    padding: 8px 0px;
    li {
      display: flex;
      & > div {
        width: 200px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${({ theme }) => theme.fontSize.text16};
        color: ${({ theme }) => theme.color.gray700};
        border-right: 1px solid ${({ theme }) => theme.color.gray300};
        &:first-child {
          width: 320px;
          justify-content: start;
          padding-left: 16px;
        }
        &:last-child {
          border-right: none;
        }
      }
    }
  }
  ul.button-list {
    margin-top: 40px;
    display: flex;
    li {
      width: 200px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:first-child {
        width: 320px;
      }
    }
  }
`;

const PriceTable = () => {
  const me = useRecoilValue(authUserSelector);

  return (
    <PriceTableWrapper p="100px 0px">
      <Box width="1320px" margin="0 auto" className="container">
        <Typography
          fontSize="40px"
          fontWeight={theme.fontWeight.semiBold}
          color={theme.color.gray900}
          textAlign="center"
          className="title"
        >
          Compare Plans & Features
        </Typography>
        <Box mt="64px" className="table">
          <ul className="header-list">
            <li>Content</li>
            <li>Free</li>
            <li>Basic</li>
            <li>Premium</li>
            <li>Premium+</li>
            <li>Enterprise</li>
          </ul>
          <ul className="content-list">
            <li>
              <div>Free stock media library</div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
            </li>
            <li>
              <div>Schedules & Playlists</div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
            </li>
            <li>
              <div>File uploads</div>
              <div>100MB/per file</div>
              <div>100MB/per file</div>
              <div>400MB/per file</div>
              <div>1GB/per file</div>
              <div>5GB/per file</div>
            </li>
            <li>
              <div>File storage</div>
              <div>5GB</div>
              <div>5GB</div>
              <div>50GB</div>
              <div>100GB</div>
              <div>Unlimited</div>
            </li>
            <li>
              <div>Screen storage</div>
              <div>500MB/per screen</div>
              <div>500MB/per screen</div>
              <div>2GB/per screen</div>
              <div>5GB/per screen</div>
              <div>Unlimited</div>
            </li>
            <li>
              <div>Canvas (content creator)</div>
              <div>Unlimited</div>
              <div>Unlimited</div>
              <div>Unlimited</div>
              <div>Unlimited</div>
              <div>Unlimited</div>
            </li>
            <li>
              <div>Canvas (custom fonts)*</div>
              <div></div>
              <div></div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
            </li>
            <li>
              <div>Canvas (generative AI)*</div>
              <div></div>
              <div></div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
            </li>
            <li>
              <div>Canvas history</div>
              <div>7 days</div>
              <div>7 days</div>
              <div>30 days</div>
              <div>90 days</div>
              <div>Unlimited</div>
            </li>
          </ul>
          <ul className="header-list">
            <li>Sharing & collaboration</li>
            <li>Free</li>
            <li>Basic</li>
            <li>Premium</li>
            <li>Premium+</li>
            <li>Enterprise</li>
          </ul>
          <ul className="content-list">
            <li>
              <div>Permission users</div>
              <div>1 user</div>
              <div>1 user</div>
              <div>6 users</div>
              <div>Unlimited users</div>
              <div>Unlimited users</div>
            </li>
            <li>
              <div>Permission roles</div>
              <div></div>
              <div></div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
            </li>
            <li>
              <div>Invite users</div>
              <div></div>
              <div></div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
            </li>
          </ul>
          <ul className="header-list">
            <li>Admin & security</li>
            <li>Free</li>
            <li>Basic</li>
            <li>Premium</li>
            <li>Premium+</li>
            <li>Enterprise</li>
          </ul>
          <ul className="content-list">
            <li>
              <div>SAML Single Sign-On (SSO)</div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
            </li>
            <li>
              <div>Login IP & password restrictions</div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
            </li>
            <li>
              <div>Screen secure lockdown</div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
            </li>
            <li>
              <div>Screen storage encryption</div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
            </li>
            <li>
              <div>Security session policies</div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
            </li>
            <li>
              <div>Audit logs</div>
              <div></div>
              <div></div>
              <div></div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
            </li>
          </ul>
          <ul className="header-list">
            <li>Support</li>
            <li>Free</li>
            <li>Basic</li>
            <li>Premium</li>
            <li>Premium+</li>
            <li>Enterprise</li>
          </ul>
          <ul className="content-list">
            <li>
              <div>Mobile apps</div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
            </li>
            <li>
              <div>Priority support</div>
              <div></div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
              <div>
                <CheckLine width="24" height="24" color={theme.color.secondary500} />
              </div>
            </li>
            <li>
              <div>Customer success manager</div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div>Custom</div>
            </li>
          </ul>
          <ul className="button-list mobile-hide">
            <li></li>
            <li>
              <Link href={me ? ADMIN_PATH.SCREENS : PATH.LOGIN}>
                <Button width="168px" borderRadius="100px">
                  Start Free Trial
                </Button>
              </Link>
            </li>
            <li>
              <Link href={me ? ADMIN_PATH.SCREENS : PATH.LOGIN}>
                <Button width="168px" borderRadius="100px">
                  Start Free Trial
                </Button>
              </Link>
            </li>
            <li>
              <Link href={me ? ADMIN_PATH.SCREENS : PATH.LOGIN}>
                <Button width="168px" borderRadius="100px">
                  Start Free Trial
                </Button>
              </Link>
            </li>
            <li>
              <Link href={me ? ADMIN_PATH.SCREENS : PATH.LOGIN}>
                <Button width="168px" borderRadius="100px">
                  Start Free Trial
                </Button>
              </Link>
            </li>
            <li>
              <Button width="168px" variant="outline" borderRadius="100px">
                Contact Sales
              </Button>
            </li>
          </ul>
        </Box>
      </Box>
    </PriceTableWrapper>
  );
};

export default PriceTable;
