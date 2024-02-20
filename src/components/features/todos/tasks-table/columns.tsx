import { EditOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import styles from './styles.module.scss';

const columns = (): ColumnsType<DataType> => [
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
    render(value) {
      switch (value) {
        case 'todo':
          return (
            <Tag color="default" className={styles.textCapitalize}>
              {value}
            </Tag>
          );
        case 'in progress':
          return (
            <Tag color="orange" className={styles.textCapitalize}>
              {value}
            </Tag>
          );
        case 'done':
          return (
            <Tag color="success" className={styles.textCapitalize}>
              {value}
            </Tag>
          );
        case 'backlog':
          return (
            <Tag color="blue" className={styles.textCapitalize}>
              {value}
            </Tag>
          );
        case 'canceled':
          return (
            <Tag color="red" className={styles.textCapitalize}>
              {value}
            </Tag>
          );
      }
    },
  },
  {
    title: 'Priority',
    key: 'priority',
    dataIndex: 'priority',
    render(value) {
      switch (value) {
        case 'low':
          return (
            <Tag color="green" className={styles.textCapitalize}>
              {value}
            </Tag>
          );
        case 'medium':
          return (
            <Tag color="orange" className={styles.textCapitalize}>
              {value}
            </Tag>
          );
        case 'high':
          return (
            <Tag color="red" className={styles.textCapitalize}>
              {value}
            </Tag>
          );
      }
    },
  },
  {
    title: 'Action',
    key: 'action',
    render: () => <EditOutlined />,
  },
];

export { columns };
