import React from 'react';
import { IApiList, IMainPlanList, IPaymentProduct } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import { NextPageContext } from 'next';

import subscriptionApi from '@/api/client/subscription.json';
import SeoHead from '@/components/common/SeoHead';
import MainProtect from '@/components/Layout/MainProtect';
import MainFooter from '@/components/Main/Footer';
import MainHeader from '@/components/Main/Header';
import MainMake from '@/components/Main/Make';
import PriceFAQ from '@/components/Main/Price/FAQ';
import PricePlan from '@/components/Main/Price/Plan';
import PriceTable from '@/components/Main/Price/Table';
import { mainPlanList } from '@/models/main';
import axios from '@/utils/client/axios';

interface IPrice {
  planList: IMainPlanList[];
}

const Price = ({ planList }: IPrice) => {
  const addJsonLd = () => {
    return {
      __html: `
      {
        "@context": "http://schema.org",
        "@type": "WebSite",
        "url": "https://www.menuboss.kr/"
      }
      `
    };
  };

  return (
    <>
      <SeoHead title="요금제 | MenuBoss" schemaJson={addJsonLd()} />
      <MainHeader />
      <PricePlan planList={planList} />
      <PriceTable />
      <PriceFAQ />
      <MainMake />
      <MainFooter />
    </>
  );
};

export const getServerSideProps = async ({ req }: NextPageContext) => {
  const planList = [];
  try {
    const {
      data: { list }
    }: AxiosResponse<IApiList<IPaymentProduct[]>> = await axios.get(
      subscriptionApi.getSubscriptionProducts,
      {
        headers: {
          'User-Agent': req?.headers['user-agent'],
          'application-time-zone': Intl.DateTimeFormat().resolvedOptions().timeZone
        }
      }
    );
    if (list.length) {
      const newPlanList = JSON.parse(JSON.stringify(mainPlanList)) as IMainPlanList[];
      list.forEach((item) => {
        newPlanList.forEach((plan) => {
          if (plan.name === item.title) {
            if (item.interval === 'month') {
              plan.monthPrice = `$ ${item.amount}`;
              plan.currency = item.currency;
            } else if (item.interval === 'year') {
              plan.yearPrice = `$ ${item.amount}`;
              plan.currency = item.currency;
            }
          }
        });
      });
      planList.push(...newPlanList);
    }
  } catch (err: any) {}
  return {
    props: {
      planList
    }
  };
};

export default MainProtect(Price);
