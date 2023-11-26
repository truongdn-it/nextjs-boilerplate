import { gql } from '@apollo/client';

const todoTypeDefs = gql`
  type Todo {
    id: ID!
    title: String
    status: String
    label: String
    priority: String
  }

  type Query {
    getTodos: [Todo]
  }
`;

export { todoTypeDefs };
