import React from 'react';
// import { doGetTask } from '@/adapters/todos';
// import { QUERY_KEYS } from '@/utils/constants';
import { TodoQuery } from '@/adapters/todos';
import { useQuery } from '@apollo/client';
// import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Skeleton, Table } from 'antd';

import { columns } from './columns';

function TaskTable() {
  // const { data, isLoading: loading } = useQuery({
  //   queryKey: [QUERY_KEYS.GET_TASKS],
  //   queryFn: doGetTask,
  //   placeholderData: keepPreviousData,
  // });

  const { data, loading } = useQuery(TodoQuery);

  return (
    <Skeleton loading={loading} active paragraph={{ rows: 20 }}>
      <Table
        columns={columns()}
        dataSource={data?.getTodos as any}
        rowKey={'id'}
      />
    </Skeleton>
  );
}

export default TaskTable;
