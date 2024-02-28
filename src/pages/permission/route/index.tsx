/* eslint-disable import/no-unused-modules */
import Link from 'next/link';
import AdminLayout from '@/components/common/layout/admin-layout';
import { SEO, WEB_ROUTES } from '@/utils/constants';
import { Button, Result, Row, Watermark } from 'antd';
import { env } from 'env.mjs';
import { DefaultSeo } from 'next-seo';

const Home = () => {
  return (
    <>
      <DefaultSeo {...SEO} title="Home" canonical={env.NEXT_PUBLIC_BASE_URL} />
      <Watermark content="duongnamtruong.com">
        <Row justify="center" align="middle">
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
      </Watermark>
    </>
  );
};

export default Home;

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
