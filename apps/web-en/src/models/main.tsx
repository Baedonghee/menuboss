/* eslint-disable react/react-in-jsx-scope */
import { Ai, List, Menu, Mobile, Plan, Tv } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import { IMainPlanList } from '@repo/ui/types';

export const serverCardList = [
  {
    name: 'Intuitive Menu Editing',
    icon: <Menu width="24" height="24" color={theme.color.white} />,
    description: 'Canvas-style menu editing allows you to create your own menu'
  },
  {
    name: 'Flexible Scheduling',
    icon: <List width="24" height="24" color={theme.color.white} />,
    description: 'You can flexibly set the menu you want throughout the day or by time zone'
  },
  {
    name: 'Mobile Menu Control',
    icon: <Mobile width="24" height="24" color={theme.color.white} />,
    description: 'The Mobile Menuboss TV app lets you control the TV menu screen'
  },
  {
    name: 'AI-Powered Service Support',
    icon: <Ai width="24" height="24" color={theme.color.white} />,
    description: 'AI service recommends a variety of menu backgrounds and videos for your business'
  },
  {
    name: 'Versatile Subscrption options',
    icon: <Plan width="24" height="24" color={theme.color.white} />,
    description:
      'Through the subscription plan, we actively support videos, photo shoots, and 1:1 customized services'
  },
  {
    name: 'Professional TV Installation',
    icon: <Tv width="24" height="24" color={theme.color.white} />,
    description:
      'Regardless of subscription plan, we offer customized interior TV installation for the store'
  }
];

export const mainPlanList = [
  {
    name: 'Free',
    yearPrice: 'For 14 days',
    monthPrice: 'For 14 days',
    description: 'Try any plan for free, for a sing screen',
    buttonName: 'Get started free',
    optionDescription:
      'Check out our features before going to the next stage of your deployment. No credit card or billing details required.',
    options: [],
    disabledOptions: []
  },
  {
    name: 'Basic',
    yearPrice: '$ 8',
    monthPrice: '$ 10',
    perScreen: 'per screen',
    description: 'Best for users getting started with digital signage',
    count: 1,
    buttonName: 'Choose plan',
    options: [
      'Schedules & Playlists',
      '100MB max file size upload',
      '20 themes',
      '1 users',
      '5GB file storage',
      '500MB storage / per screen'
    ],
    disabledOptions: ['Custom User Roles', 'Audit Logs', 'Enterprise plan service']
  },
  {
    name: 'Premium',
    yearPrice: '$ 16',
    monthPrice: '$ 20',
    perScreen: 'per screen',
    description: 'Best for growing teams managing a lot of content',
    count: 1,
    buttonName: 'Choose plan',
    options: [
      'Schedules & Playlists',
      'Custom User Roles',
      '400MB max file size upload',
      '30 themes',
      '6 users',
      '50GB file storage',
      '2GB storage / per screen'
    ],
    disabledOptions: ['Audit Logs', 'Enterprise plan service']
  },
  {
    name: 'Premium+',
    yearPrice: '$ 24',
    monthPrice: '$ 30',
    perScreen: 'per screen',
    description: 'Best for growing teams managing a lot of content',
    count: 1,
    buttonName: 'Choose plan',
    options: [
      'Schedules & Playlists',
      'Custom User Roles',
      'Audit Logs',
      '1GB max file size upload',
      'Unlimited themes',
      'Unlimited users',
      '100GB file storage',
      '5GB storage / per screen'
    ],
    disabledOptions: ['Enterprise plan service']
  },
  {
    name: 'Enterprise',
    yearPrice: 'Contact sales',
    monthPrice: 'Contact sales',
    description: 'Request a demo or Request a Trial',
    buttonName: 'Contact sales',
    options: [
      'Schedules & Playlists',
      'Custom User Roles',
      'Audit Logs',
      'Single Sign-on (SAML)',
      'Login IP & Password Restrictions',
      'Screen Secure Lockdown',
      'Screen Storage Encryption',
      'Unlimited file storage',
      'Security Session Policies'
    ],
    disabledOptions: []
  }
] as IMainPlanList[];
