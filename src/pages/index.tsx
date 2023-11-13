/* eslint-disable import/no-unused-modules */
import { Suspense } from 'react';
import Layout from '@/components/common/layouts/base-layout';
import TaskTable from '@/components/features/todos/tasks-table';
import { useTranslations } from '@/modules/locales/locales.hook';
import { useLocalesStore } from '@/modules/locales/locales.store';
import { SEO } from '@/modules/seo/seo.constant';
import { Col, Row, Select, Typography, Watermark } from 'antd';
import { DefaultSeo } from 'next-seo';

const { Title } = Typography;

const Home = () => {
  const { locale, t } = useTranslations();
  const changeLocale = useLocalesStore((state) => state.changeLocale);
  const handleChangeLocale = (value: TDefaultLocale) => {
    changeLocale(value);
  };

  return (
    <>
      <DefaultSeo {...SEO} title="Home" />
      <Watermark content="duongnamtruong.com">
        <div className="p-1">
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={2}>{t(`module_1.title`)}</Title>
              <Title level={5}>{t(`module_1.description`)}</Title>
            </Col>
            <Col>
              <Select
                defaultValue={locale}
                style={{ width: 120 }}
                onChange={handleChangeLocale}
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

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
