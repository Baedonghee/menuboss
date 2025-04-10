import React, { useState } from 'react';
import { Box, Typography } from '@repo/ui/components';
import { Down, Up } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import styled from 'styled-components';

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
            자주 묻는 질문
          </Typography>
          <Typography
            as="h2"
            fontSize={theme.fontSize.text20}
            color={theme.color.gray700}
            mt="16px"
            textAlign="center"
            className="description"
          >
            궁금한 점이 있나요? 메뉴보스에게 물어보세요!
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
                메뉴보스란 무엇인가요?
              </Typography>
              {active.includes(1) ? (
                <Up width="24" height="24" color={theme.color.gray500} />
              ) : (
                <Down width="24" height="24" color={theme.color.gray500} />
              )}
            </div>
            {active.includes(1) && (
              <div className="content">
                메뉴보스는 기존의 아날로그 종이 메뉴판의 단점을 보완하고, 누구나 쉽고 간편하게
                디지털 메뉴판을 제작할 수 있도록 도와주는 서비스 플랫폼입니다.
                <br className="pc-hide" />
                <br className="pc-hide" /> 또한 디지털 메뉴판과 연관된 웹, 모바일 앱의 연동을 통해
                이용자가 일관된 서비스를 이용할 수 있도록 기능을 제공하고 있습니다
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
                무료와 유료 요금제의 차이점은 무엇인가요?
              </Typography>
              {active.includes(2) ? (
                <Up width="24" height="24" color={theme.color.gray500} />
              ) : (
                <Down width="24" height="24" color={theme.color.gray500} />
              )}
            </div>
            {active.includes(2) && (
              <div className="content">
                무료 체험을 통해 14일 동안 베이직 요금제를 미리 체험해볼 수 있습니다. 유료 요금제
                간의 차이는 각각 포함된 기능에 따라 달라집니다.
                <br className="pc-hide" />
                <br className="pc-hide" /> 요금제의 차이에 대한 자세한 내용은 [요금제 - 상세 기능 &
                비교] 부분에서 확인할 수 있습니다
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
                사용 도중에 요금제를 변경할 수 있나요?
              </Typography>
              {active.includes(3) ? (
                <Up width="24" height="24" color={theme.color.gray500} />
              ) : (
                <Down width="24" height="24" color={theme.color.gray500} />
              )}
            </div>
            {active.includes(3) && (
              <div className="content">
                가능합니다. 요금제를 변경하는 방법은 [홈페이지 로그인 - 내 정보 - 요금제 선택] 후
                세부 결제 정보를 확인한 뒤 결제를 진행할 수 있습니다.
                <br className="pc-hide" />
                <br className="pc-hide" /> 만약 높은 요금제에서 낮은 요금제로 전환하게되면 기존에
                사용하시는 파일의 기록, 저장공간, 구성원 수 등이 제한될 수 있습니다. 이 점을
                유의하시고 진행해주시길 바랍니다
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
                자세한 사용법은 어디서 볼 수 있나요?
              </Typography>
              {active.includes(4) ? (
                <Up width="24" height="24" color={theme.color.gray500} />
              ) : (
                <Down width="24" height="24" color={theme.color.gray500} />
              )}
            </div>
            {active.includes(4) && (
              <div className="content">
                하단의 [메뉴보스 사용방법 - 웹 서비스 & 모바일 앱 가이드] 를 참고해주세요.
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
                서비스 도입 문의는 어디로 연락해야 하나요?
              </Typography>
              {active.includes(5) ? (
                <Up width="24" height="24" color={theme.color.gray500} />
              ) : (
                <Down width="24" height="24" color={theme.color.gray500} />
              )}
            </div>
            {active.includes(5) && (
              <div className="content">
                메뉴보스와 함께 협력하고 싶으신가요? 홈페이지 상단의 [서비스 도입 문의]의 구글 폼을
                통해 귀하의 정보를 입력해주시거나, info@themenuboss.com 로 연락주시기 바랍니다.
                <br className="pc-hide" />
                <br className="pc-hide" />
                메뉴보스는 지속적으로 다양한 기업과의 협업을 모색하고 있으며, 귀하의 사업 확장을
                돕기 위한 다양한 솔루션을 제공하기 위해 노력하고 있습니다
              </div>
            )}
          </li>
        </ul>
      </Box>
    </PriceFAQWrapper>
  );
};

export default PriceFAQ;
