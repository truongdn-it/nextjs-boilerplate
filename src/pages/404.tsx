/* eslint-disable import/no-unused-modules */
import React from 'react';
import Link from 'next/link';
import { SEO } from '@configs/seo.config';
import { Button, Result, Row } from 'antd';
import { DefaultSeo } from 'next-seo';
import Layout from '@components/common/Layout';
import { WEB_ROUTES } from '@utils/constants/routes.constant';

function Error404() {
  return (
    <>
      <DefaultSeo {...SEO} title="404" />
      <Row justify="center" align="middle" className="min-h-100">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
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

export default Error404;

Error404.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
