import React from 'react';
import { IApiList, IMainPlanList, IPaymentProduct } from '@repo/ui/types';
import { AxiosResponse } from 'axios';
import { NextPageContext } from 'next';

import paymentApi from '@/api/client/payment.json';
import SeoHead from '@/components/common/SeoHead';
import MainProtect from '@/components/Layout/MainProtect';
import AcceptCookie from '@/components/Main/AcceptCookie';
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
        "url": "https://www.themenuboss.co.kr/"
      }
      `
    };
  };

  return (
    <>
      <SeoHead title="Pricing | MenuBoss" schemaJson={addJsonLd()} />
      <MainHeader />
      <PricePlan planList={planList} />
      <PriceTable />
      <PriceFAQ />
      <MainMake />
      <MainFooter />
      <AcceptCookie />
    </>
  );
};

export const getServerSideProps = async ({ req }: NextPageContext) => {
  const planList = [];
  try {
    const {
      data: { list }
    }: AxiosResponse<IApiList<IPaymentProduct[]>> = await axios.get(paymentApi.getProducts, {
      headers: {
        'User-Agent': req?.headers['user-agent'],
        'application-time-zone': Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    });
    if (list.length) {
      const newPlanList = [...mainPlanList];
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
  } catch (err) {}
  return {
    props: {
      planList
    }
  };
};

export default MainProtect(Price);
