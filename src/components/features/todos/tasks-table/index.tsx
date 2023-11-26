import React from 'react';
import { TodoQuery } from '@/services/apollo/adapters/todos.adapter';
import { useQuery } from '@apollo/client';
// import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Skeleton, Table } from 'antd';
// import { doGetTask } from '@components/features/todos';
import { useTranslations } from '@utils/helpers/locales/locales.hook';

// import { QUERY_KEYS } from '@utils/helpers/queries';

import { columns } from './tasks-column.component';

function TaskTable() {
  const { t } = useTranslations();

  // const { data, isLoading } = useQuery({
  //   queryKey: [QUERY_KEYS.GET_TASKS],
  //   queryFn: doGetTask,
  //   placeholderData: keepPreviousData,
  // });

  const { data, loading } = useQuery(TodoQuery);

  return (
    <Skeleton loading={loading} active paragraph={{ rows: 20 }}>
      <Table
        columns={columns(t)}
        dataSource={data?.getTodos as any}
        rowKey={'id'}
      />
    </Skeleton>
  );
}

export default TaskTable;
