/* eslint-disable import/no-unused-modules */
import { TodoQuery } from '@/adapters/todos';
import AdminLayout from '@/components/common/layout/admin-layout';
import { initializeApollo } from '@/services/apollo/client';
import { SEO, WEB_ROUTES } from '@/utils/constants';
import { Watermark } from 'antd';
import { env } from 'env.mjs';
import { DefaultSeo } from 'next-seo';
import TaskTable from '@components/features/todos/tasks-table';

const Home = () => {
  return (
    <>
      <DefaultSeo
        {...SEO}
        title="Dashboard"
        canonical={env.NEXT_PUBLIC_BASE_URL + WEB_ROUTES.DASHBOARD}
      />
      <Watermark content="duongnamtruong.com">
        <TaskTable />
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
