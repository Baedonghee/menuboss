import { ADMIN_PATH } from '@/utils/path';
import { IPaymentAccountPlanList } from '@repo/ui/types';

export const accountTabMenuList = [
  {
    name: 'Profile',
    path: ADMIN_PATH.ACCOUNT_PROFILE
  },
  {
    name: 'Business',
    path: ADMIN_PATH.ACCOUNT_BUSINESS
  },
  {
    name: 'Plan & Pricing',
    path: ADMIN_PATH.ACCOUNT_PLAN
  },
  {
    name: 'Billing',
    path: ADMIN_PATH.ACCOUNT_BILLING
  },
  {
    name: 'Payment',
    path: ADMIN_PATH.ACCOUNT_PAYMENT
  }
];

export const accountPlanList = [
  {
    name: 'Basic',
    yearPrice: '$ 8',
    monthPrice: '$ 10',
    perScreen: 'per screen / month',
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
    ]
  },
  {
    name: 'Premium',
    yearPrice: '$ 16',
    monthPrice: '$ 20',
    perScreen: 'per screen / month',
    description: 'Best for growing teams managing a lot of content',
    count: 1,
    buttonName: 'Choose plan',
    options: [
      'Using all basic plan',
      'Custom User Roles',
      '400MB max file size upload',
      '30 themes',
      '6 users',
      '50GB file storage',
      '2GB storage / per screen'
    ]
  },
  {
    name: 'Premium+',
    yearPrice: '$ 24',
    monthPrice: '$ 30',
    perScreen: 'per screen / month',
    description: 'Best for growing teams managing a lot of content',
    count: 1,
    buttonName: 'Choose plan',
    options: [
      'Using all premium plan',
      'Audit Logs',
      '1GB max file size upload',
      'Unlimited themes',
      'Unlimited users',
      '100GB file storage',
      '5GB storage / per screen'
    ]
  },
  {
    name: 'Enterprise',
    yearPrice: 'for 14 days',
    monthPrice: 'for 14 days',
    description: 'Try any plan for free, for a sing screen',
    buttonName: 'Contact sales',
    options: [
      'Single Sign-on (SAML)',
      'Login IP & Password Restrictions',
      'Screen Secure Lockdown',
      'Screen Storage Encryption',
      'Unlimited file storage',
      'Security Session Policies'
    ]
  }
] as IPaymentAccountPlanList[];
