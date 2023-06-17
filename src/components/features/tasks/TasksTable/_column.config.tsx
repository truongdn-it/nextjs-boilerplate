import { Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'

const columns: ColumnsType<DataType> = [
  {
    title: 'Task',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Priority',
    key: 'priority',
    dataIndex: 'priority',
    render(value) {
      switch (value) {
        case 'low':
          return <Tag color="green">{value}</Tag>
        case 'medium':
          return <Tag color="orange">{value}</Tag>
        case 'high':
          return <Tag color="red">{value}</Tag>
      }
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: () => <span>action</span>,
  },
]

export { columns }
