/* eslint-disable import/no-unused-modules */
import { Suspense } from 'react'
import { doGetTask } from '@adapters/tasks'
import { motion } from 'framer-motion'
import Layout from '@components/common/Layout'
import TaskTable from '@components/features/tasks/TasksTable'

function Home({ tasks }: any) {
  return (
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
      <Suspense fallback={<div>Loading...</div>}>
        <TaskTable initialData={tasks} />
      </Suspense>
    </motion.div>
  )
}

export default Home

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps = async () => {
  const data = await doGetTask()

  return {
    props: {
      tasks: data?.data?.data,
    },
  }
}
