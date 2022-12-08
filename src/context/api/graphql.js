// import { ApolloServer, gql } from "apollo-server-micro";
// import { createContext } from "../../../server/context";
// import schema from "../../../server/schema";

// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;

// const resolvers = {
//   Query: {
//     hello: (_, __, { req }) => {
//       console.log(req.user);
//       return "Hello world!";
//     },
//   },
// };

// const apolloServer = new ApolloServer({
//   schema,
//   context: (req, res) => createContext(req, res),
//   subscriptions: {
//     path: "/api/graphql",
//     keepAlive: 9000,
//     onConnect: () => console.log("connected"),
//     onDisconnect: () => console.log("disconnected"),
//   },
// });

// const graphqlWithSubscriptionHandler = (req, res, next) => {
//   if (!res.socket.server.apolloServer) {
//     console.log(`* apolloServer first use *`);

//     apolloServer.installSubscriptionHandlers(res.socket.server);
//     const handler = apolloServer.createHandler({ path: "/api/graphql" });
//     res.socket.server.apolloServer = handler;
//   }

//   return res.socket.server.apolloServer(req, res, next);
// };

// export default graphqlWithSubscriptionHandler;
// // export default apolloServer.createHandler({ path: "/api/graphql" });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
