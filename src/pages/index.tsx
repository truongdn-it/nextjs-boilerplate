/* eslint-disable import/no-unused-modules */
import { Suspense } from 'react';
import { TodoQuery } from '@/adapters/todos';
import AdminLayout from '@/components/common/layout/admin-layout';
import { initializeApollo } from '@/services/apollo/client';
import { SEO } from '@/utils/constants';
import { Col, Row, Select, Typography, Watermark } from 'antd';
import { env } from 'env.mjs';
import { DefaultSeo } from 'next-seo';
import TaskTable from '@components/features/todos/tasks-table';

const { Title } = Typography;

const Home = () => {
  return (
    <>
      <DefaultSeo {...SEO} title="Home" canonical={env.NEXT_PUBLIC_BASE_URL} />
      <Watermark content="duongnamtruong.com">
        <div className="p-1">
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={2}>Welcome back!</Title>
              <Title level={5}>
                Here&apos;s a list of your tasks for this month!
              </Title>
            </Col>
            <Col>
              <Select
                defaultValue={'en'}
                style={{ width: 120 }}
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'vi', label: 'Tiếng Việt' },
                ]}
              />
            </Col>
          </Row>
          <Suspense fallback={<div>Loading...</div>}>
            <TaskTable />
          </Suspense>
        </div>
      </Watermark>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: TodoQuery,
  });
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
