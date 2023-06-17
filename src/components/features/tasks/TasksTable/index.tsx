import React from 'react'
import { doGetTask } from '@adapters/tasks'
import { useQuery } from '@tanstack/react-query'
import { Table } from 'antd'
import { QUERY_KEYS } from '@utils/constants/routes.config'

import { columns } from './_column.config'

function TaskTable({ initialData }: { initialData: any }) {
  const data = useQuery({
    queryKey: [QUERY_KEYS.GET_TASKS],
    queryFn: () => doGetTask(),
    initialData,
  })
  return (
    <Table
      columns={columns}
      dataSource={data?.data?.data?.data}
      rowKey={'id'}
    />
  )
}

export default TaskTable
