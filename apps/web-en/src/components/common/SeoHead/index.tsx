import React from 'react';
import getConfig from 'next/config';
import Head from 'next/head';
import { useRouter } from 'next/router';

const { publicRuntimeConfig } = getConfig();
const { CLIENT_API } = publicRuntimeConfig;

interface ISeoHead {
  /** 헤더 타이틀 */
  title?: string;
  /** meta 태그 설명 */
  description?: string;
  /** og 이미지 */
  image?: string;
  schemaJson?: {
    __html: string;
  };
}

const SeoHead = ({
  title = 'MenuBoss',
  description = 'Premier digital signage service for seamless TV app displays',
  image = '/images/cover.png',
  schemaJson
}: ISeoHead) => {
  const { asPath } = useRouter();
  return (
    <Head>
      <title key="title">{title}</title>
      <meta name="description" content={description} key="description" />
      <meta
        name="keywords"
        content="Premier digital signage service for seamless TV app displays"
        key="keywords"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
        key="viewPort"
      />
      {schemaJson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={schemaJson}
          key="product-jsonId"
        />
      )}
      <meta name="robots" content="index,follow" key="robots" />
      <meta property="og:type" content="product" key="ogType" />
      <meta property="og:title" content={title} key="ogTitle" />
      <meta property="og:description" content={description} key="ogDescription" />
      <meta property="og:image" content={image} key="ogImage" />
      <meta property="og:url" content={`${CLIENT_API}${asPath}`} key="ogUrl" />
      <meta property="og:locale" content="en_US" key="ogLocale" />
      <meta property="og:site_name" content="MenuBoss" key="ogSiteName" />
      <meta name="twitter:card" content="summary_large_image" key="twitterCard" />
      <meta
        httpEquiv="cache-control"
        content="no-cache, must-revalidate, post-check=0, pre-check=0"
        key="httpEquiv"
      />
      <link rel="canonical" href={`${CLIENT_API}${asPath}`} key="canonical" />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" key="shortcutIcon" />
      <link rel="apple-touch-icon" sizes="57x57" href="/images/icons/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/images/icons/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/images/icons/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/images/icons/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/images/icons/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/images/icons/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/images/icons/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/images/icons/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/images/icons/apple-icon-180x180.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/images/icons/android-icon-192x192.png"
      />
      <link rel="icon" type="image/png" sizes="32x32" href="/images/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/images/icons/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/images/icons/favicon-16x16.png" />
      <link rel="manifest" href="/images/icons/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/images/icons/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
};

export default SeoHead;
