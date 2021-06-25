import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import session from 'express-session';
import http from 'http';
import cors from 'cors';
import { corsOptions, host, PORT, sessionOptions } from './consts';
//apollo config
import typeDefs from './types.graphql';
import { resolvers } from './resolvers';
import { readToken } from '../middlewares/readToken';

const app = express();
app.use(session(sessionOptions));

app.use(cors(corsOptions));
app.use(readToken)

const httpServer = http.createServer(app);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
  playground: false,
})
apolloServer.installSubscriptionHandlers(httpServer);
apolloServer.applyMiddleware({
  app, cors: corsOptions
})

const { graphqlPath, subscriptionsPath } = apolloServer;

export {
  httpServer,
  graphqlPath,
  subscriptionsPath
}