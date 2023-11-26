import { MOCK_TASKS } from '@/mocks';

const todoResolvers = {
  Query: {
    getTodos: () => {
      return MOCK_TASKS;
    },
  },
};

export { todoResolvers };
