import { graphql } from '@/__generated__/gql';

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

export { TodoQuery };
