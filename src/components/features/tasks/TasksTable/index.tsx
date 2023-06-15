import React from 'react'
import { API_ROUTES } from '@utils/constants'

import DataTable from './table'

async function getTasks() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${API_ROUTES.GET_TASKS}`
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function TaskTable() {
  const data = await getTasks()

  return <DataTable initData={data?.data} />
}

export { TaskTable }
