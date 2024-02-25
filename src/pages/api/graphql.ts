import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { schema } from '@services/apollo/schema';

const apolloServer = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginCacheControl({ defaultMaxAge: 60 }),
    ...(process.env.NODE_ENV === 'production'
      ? [ApolloServerPluginLandingPageDisabled()]
      : []),
  ],
});

// eslint-disable-next-line import/no-unused-modules
export default startServerAndCreateNextHandler(apolloServer);
