import React from 'react';
import { Layout as AntdLayout } from 'antd';
import Footer from '@components/common/footer/copyright-footer';
import AnimateLayout from '@components/common/layout/animate';

const { Content } = AntdLayout;

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AntdLayout>
      <Content>
        <AnimateLayout>{children}</AnimateLayout>
      </Content>
      <Footer />
    </AntdLayout>
  );
}

export default Layout;
