import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { schema } from '@services/apollo/schema';

const apolloServer = new ApolloServer({
  schema,
  plugins:
    process.env.NODE_ENV === 'production'
      ? [ApolloServerPluginLandingPageDisabled()]
      : undefined,
});

// eslint-disable-next-line import/no-unused-modules
export default startServerAndCreateNextHandler(apolloServer);
