/* eslint-disable import/no-unused-modules */
import React from 'react';
import Link from 'next/link';
import { SEO } from '@configs/seo.config';
import { Button, Result, Row } from 'antd';
import { DefaultSeo } from 'next-seo';
import Layout from '@components/common/Layout';
import { WEB_ROUTES } from '@utils/constants/routes.constant';

function Error403() {
  return (
    <>
      <DefaultSeo {...SEO} title="403" />
      <Row justify="center" align="middle" className="min-h-100">
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
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

export default Error403;

Error403.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
