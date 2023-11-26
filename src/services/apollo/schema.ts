import { makeExecutableSchema } from '@graphql-tools/schema';

import { todoResolvers } from './resolvers';
import { todoTypeDefs } from './type-defs';

export const schema = makeExecutableSchema({
  typeDefs: [todoTypeDefs],
  resolvers: [todoResolvers],
});
