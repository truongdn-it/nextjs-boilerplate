import React from 'react';
import { Layout as AntdLayout } from 'antd';
import { motion } from 'framer-motion';

const { Content } = AntdLayout;

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AntdLayout>
      <Content>
        <motion.div
          initial="pageInitial"
          animate="pageAnimate"
          exit="pageExit"
          variants={{
            pageInitial: {
              opacity: 0,
              y: 50,
            },
            pageAnimate: {
              opacity: 1,
              y: 0,
            },
            pageExit: {
              opacity: 0,
              y: -50,
            },
          }}
          transition={{
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.5,
          }}
        >
          {children}
        </motion.div>
      </Content>
    </AntdLayout>
  );
}

export default Layout;
