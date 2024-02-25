import React from 'react';
import { useRouter } from 'next/router';
import { Layout as AntdLayout } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '@components/common/footer/copyright-footer';

const { Content } = AntdLayout;

const variants = {
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: 0.5,
    },
  },
  out: {
    opacity: 0,
    scale: 1,
    y: 40,
    transition: {
      duration: 0.75,
    },
  },
};

function Layout({ children }: { children: React.ReactNode }) {
  const { asPath } = useRouter();

  return (
    <AntdLayout>
      <Content>
        <div style={{ overflow: 'hidden' }}>
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={asPath}
              variants={variants}
              animate="in"
              initial="out"
              exit="out"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </Content>
      <Footer />
    </AntdLayout>
  );
}

export default Layout;
