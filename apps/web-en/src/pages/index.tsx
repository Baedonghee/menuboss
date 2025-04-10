/* eslint-disable react-hooks/exhaustive-deps */
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
import HomepageIntroduction from '@/components/Main/Homepage/Introduction';
import HomepagePlan from '@/components/Main/Homepage/Plan';
import HomepageReview from '@/components/Main/Homepage/Review';
import HomepageService from '@/components/Main/Homepage/Service';
import HomepageSkill from '@/components/Main/Homepage/Skill';
import MainMake from '@/components/Main/Make';
import { mainPlanList } from '@/models/main';
import axios from '@/utils/client/axios';

interface IMain {
  planList: IMainPlanList[];
}

const Main = ({ planList }: IMain) => {
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
      <SeoHead schemaJson={addJsonLd()} />
      <MainHeader />
      <HomepageIntroduction />
      <HomepageService />
      <HomepageSkill />
      <HomepagePlan planList={planList} />
      <HomepageReview />
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
  } catch (err: any) {}
  return {
    props: {
      planList
    }
  };
};

export default MainProtect(Main);
