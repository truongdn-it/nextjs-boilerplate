import { graphql } from '@/__generated__';
import { API_ROUTES } from '@/utils/constants/common';

import HttpClient from './xhr';

const doGetTask = () => {
  return HttpClient.sendGet({
    url: API_ROUTES.GET_TASKS,
  });
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
