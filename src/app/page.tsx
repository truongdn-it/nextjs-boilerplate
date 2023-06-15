/* eslint-disable import/no-unused-modules */
import { Suspense } from 'react'
import { Metadata } from 'next'
import { Skeleton } from '@components/common/Skeleton'
import { TaskTable } from '@components/features/tasks/TasksTable'

import { UserNav } from '../components/features/tasks/TasksTable/user-nav'

const metadata: Metadata = {
  title: 'Home | Nextjs Base App',
  description: 'A Nextjs Base App by TruongDN.',
}

const TaskPage = async () => {
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>

        <Suspense
          fallback={
            <div className="flex gap-4 flex-col">
              <Skeleton className="h-[48px] w-full" />
              <Skeleton className="h-[624px] w-full" />
            </div>
          }
        >
          <TaskTable />
        </Suspense>
      </div>
    </>
  )
}

export { metadata }
export default TaskPage
