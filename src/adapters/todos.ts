import { graphql } from '@/__generated__';
import { REQ_METHODS } from '@/utils/constants';
import { API_ROUTES } from '@/utils/constants/common';

import { request } from './xhr';

const doGetTask = async () => {
  try {
    const res = await request<GeneralResponse<ITask[]>>(
      API_ROUTES.GET_TASKS,
      REQ_METHODS.GET,
    );
    return res.data.data;
  } catch (e) {
    throw e;
  }
};

const TodoQuery = graphql(`
  query TodoQuery {
    getTodos {
      id
      title
      status
      label
      priority
    }
  }
`);

export { doGetTask, TodoQuery };
