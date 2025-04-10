import React, { useEffect, useState } from 'react';
import { Box, Button, CheckBox, Typography } from '@repo/ui/components';
import { CloseRound } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import TutorialDescription from './Description';

const TutorialWrapper = styled(Box)`
  border-radius: 12px;
  box-shadow:
    4px 0px 8px 0px rgba(0, 0, 0, 0.1),
    0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  .check-box {
    &:hover,
    &.active {
      background-color: ${({ theme }) => theme.color.gray50};
    }
  }
`;

const sidebarList = [
  {
    name: 'Set up the screen',
    value: 'screen',
    title: 'Set up the screen',
    description:
      'To use the TV screen, download [MenuBossTV - Digital Signage All in one Service] from the Amazon App Store and run the app on the TV. Click the [New screen] button and enter the PIN number shown on the TV screen',
    options: [
      'If you find it challenging to differentiate between multiple TVs using the TV screen name display function, you can distinguish the TVs by clicking the more icon and selecting [Display screen name]'
    ],
    video: '/videos/screen.mp4'
  },
  {
    name: 'Create a schedule',
    value: 'schedule',
    title: 'Create a schedule',
    description:
      'Through schedule creation, you can flexibly use digital signage. You can set up your own schedule by adding playlists for specific times such as Basic / Morning / Lunch / Dinner',
    options: [
      'When creating a new schedule, first press the plus button, then 1. [add playlist] 2. Set the time for the schedule',
      'Basic 24-hour playlist can overlap, but other playlists cannot have time overlaps'
    ],
    video: '/videos/schedule.mp4'
  },
  {
    name: 'Create a playlist',
    value: 'playlist',
    title: 'Create a playlist',
    description: `You can create your own digital signage by arranging the desired media and setting the time in the playlist. Through the option, you can set the digital signage's [horizontal / vertical] orientation and the [Fill / Fit / Stretch] configuration`,
    options: [
      'Before finalizing the playlist, you can preview it through',
      'You can arrange the content and set the time. However, time setting is not available for videos'
    ],
    video: '/videos/playlist.mp4'
  },
  {
    name: 'Create a canvas',
    value: 'canvas',
    title: 'Create a canvas',
    description:
      'Canvas enables you to create your own digital menu using a variety of templates or your personal image and video files. Through the preview feature, you can see how the screen will be adjusted for horizontal / vertical orientation',
    options: [
      'You can upload images and videos to create your own unique digital menu board',
      `The canvas you've created can be utilized as a digital menu by adding it to a timetable or playlist`
    ],
    video: '/videos/canvas.mp4'
  },
  {
    name: 'Upload a media file',
    value: 'media',
    title: 'Upload a media file',
    description:
      'In the library menu, you can upload your image and video files, or create a folder using the [New Folder] button at the top. Additionally, you can delete files or move them to a different folder through the more option',
    options: [
      'You can sort folders by name or by newest to oldest',
      'Creating a folder within another folder is not possible'
    ],
    video: '/videos/media.mp4'
  },
  {
    name: 'Invite team members',
    value: 'team',
    title: 'Invite team members',
    description: `By adding team members, you can manage your business with various members. Enter the team member's information, select a role, and create a member profile to facilitate easy management of your business`,
    options: [
      'You can easily manage members in your store by adding team members',
      'By defining the role of each member, you can establish their specific responsibilities'
    ],
    video: '/videos/team.mp4'
  },
  {
    name: 'Create roles',
    value: 'role',
    title: 'Create roles',
    description:
      'You can create roles and assign them to each member. Permissions for each menu can be established, and the store can be managed based on the assigned permissions of the respective members',
    options: [
      'After setting the name of the role, you can grant permissions in the Members section',
      'You can set detailed permissions for [Screen / Schedule / Playlist / Canvas / Media / Team member / Role settings]'
    ],
    video: '/videos/role.mp4'
  },
  {
    name: 'Settings & My account',
    value: 'setting',
    title: 'Settings & My account',
    description:
      'In Settings & My account, you have the option to edit or set your information. In Settings, you can manage members through [Team member / Role settings]. In My Information, you can set and view your [Profile / Business / Plan & Pricing /  Billing / Payment Method]',
    options: [
      'Settings can be accessed through the left menu',
      'You can set your information by clicking the arrow next to My Profile on the top right'
    ],
    video: '/videos/setting.mp4'
  }
];

interface ITutorial {
  onClose: () => void;
}

const Tutorial: React.FC<ITutorial> = ({ onClose }) => {
  const { pathname } = useRouter();
  const [step, setStep] = useState(0);
  const [selectItem, setSelectItem] = useState(sidebarList[0]);
  const [checkTutorial, setCheckTutorial] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const getItem = window.localStorage.getItem('tutorial');
    let item = {};
    if (getItem) {
      item = JSON.parse(getItem);
    }
    if (pathname.includes('screen')) {
      setStep(0);
      setSelectItem(sidebarList[0]);
      setCheckTutorial({
        ...item,
        screen: true
      });
    } else if (pathname.includes('schedule')) {
      setStep(1);
      setSelectItem(sidebarList[1]);
      setCheckTutorial({
        ...item,
        schedule: true
      });
    } else if (pathname.includes('playlist')) {
      setStep(2);
      setSelectItem(sidebarList[2]);
      setCheckTutorial({
        ...item,
        playlist: true
      });
    } else if (pathname.includes('canvas')) {
      setStep(3);
      setSelectItem(sidebarList[3]);
      setCheckTutorial({
        ...item,
        canvas: true
      });
    } else if (pathname.includes('media')) {
      setStep(4);
      setSelectItem(sidebarList[4]);
      setCheckTutorial({
        ...item,
        media: true
      });
    } else if (pathname.includes('team')) {
      setStep(5);
      setSelectItem(sidebarList[5]);
      setCheckTutorial({
        ...item,
        team: true
      });
    } else if (pathname.includes('role')) {
      setStep(6);
      setSelectItem(sidebarList[6]);
      setCheckTutorial({
        ...item,
        role: true
      });
    } else if (pathname.includes('account')) {
      setStep(7);
      setSelectItem(sidebarList[7]);
      setCheckTutorial({
        ...item,
        setting: true
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      window.localStorage.setItem('tutorial', JSON.stringify(checkTutorial));
    };
  }, [checkTutorial]);

  const handleCheck = (item: (typeof sidebarList)[0], index: number) => {
    setSelectItem(item);
    setStep(index);
    setCheckTutorial({
      ...checkTutorial,
      [item.value]: true
    });
  };

  const handleNextStep = () => {
    if (step === sidebarList.length - 1) {
      return;
    }
    setStep(step + 1);
    setSelectItem(sidebarList[step + 1]);
    setCheckTutorial({
      ...checkTutorial,
      [sidebarList[step + 1].value]: true
    });
  };

  return (
    <TutorialWrapper display="flex" width="1000px">
      <Box width="300px" borderRight={`1px solid ${theme.color.gray200}`} p="24px 0px">
        <Typography
          fontSize={theme.fontSize.text24}
          fontWeight={theme.fontWeight.semiBold}
          lineHeight="31px"
          p="0px 24px"
        >
          Get Started
        </Typography>
        <Box mt="32px">
          {sidebarList.map((sidebar, index) => (
            <CheckBox
              key={`tutorial-${sidebar.value}`}
              name={sidebar.value}
              checked={checkTutorial[sidebar.value]}
              height="56px"
              type="circle"
              className={classNames('check-box', {
                active: step === index
              })}
              p="0px 24px"
              onClick={() => handleCheck(sidebar, index)}
            >
              <Typography
                fontSize={theme.fontSize.text16}
                fontWeight={theme.fontWeight.normal}
                lineHeight="21px"
              >
                {sidebar.name}
              </Typography>
            </CheckBox>
          ))}
        </Box>
        <Box mt="67px" display="flex" p="0px 24px">
          {Object.keys(checkTutorial).length === 8 ? (
            <Button size="m" width="100%" onClick={onClose}>
              Complete
            </Button>
          ) : (
            <>
              <Button
                size="m"
                variant="outline"
                color="neutral"
                width="120px"
                mr="12px"
                onClick={onClose}
              >
                Skip tour
              </Button>
              <Button size="m" width="120px" onClick={handleNextStep}>
                Next
              </Button>
            </>
          )}
        </Box>
      </Box>
      <Box width="700px" p="24px">
        <Box display="flex" justifyContent="end">
          <CloseRound
            className="close"
            width="24"
            height="24"
            color={theme.color.gray500}
            onClick={onClose}
          />
        </Box>
        <Box mt="32px">
          <TutorialDescription item={selectItem} />
        </Box>
      </Box>
    </TutorialWrapper>
  );
};

export default Tutorial;
