/* eslint-disable import/no-unused-modules */
import React from 'react';
import Link from 'next/link';
import Layout from '@/components/common/layout/base-layout';
import { Button, Result, Row } from 'antd';
import { DefaultSeo } from 'next-seo';
import { WEB_ROUTES } from '@utils/constants/common.constant';
import { SEO } from '@utils/constants/seo.constant';

function Error500() {
  return (
    <>
      <DefaultSeo {...SEO} title="500" />
      <Row justify="center" align="middle" className="min-h-100">
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
          extra={
            <Link href={WEB_ROUTES.HOME}>
              <Button type="primary">Back Home</Button>
            </Link>
          }
        />
      </Row>
    </>
  );
}

export default Error500;

Error500.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
