/* eslint-disable import/no-unused-modules */
import { Button } from 'antd'
// import { motion } from 'framer-motion'
import Layout from '@components/common/Layout'

function Home() {
  return (
    // <motion.div
    //   initial="pageInitial"
    //   animate="pageAnimate"
    //   exit="pageExit"
    //   variants={{
    //     pageInitial: {
    //       opacity: 0,
    //       y: 50,
    //     },
    //     pageAnimate: {
    //       opacity: 1,
    //       y: 0,
    //     },
    //     pageExit: {
    //       opacity: 0,
    //       y: -50,
    //     },
    //   }}
    //   transition={{
    //     type: 'tween',
    //     ease: 'easeInOut',
    //     duration: 0.5,
    //   }}
    // >
    <div>
      <Button type="primary">Button</Button>
    </div>
    // </motion.div>
  )
}

export default Home

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}
