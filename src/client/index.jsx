import { GraphQLClient } from "graphql-request";
import appState from "../utils/appState";

const { token } = appState();

export const client = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`,
  {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  }
);

export const ssrClient = (token) => {
  return new GraphQLClient(`${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`, {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
};

// import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";
// import { onError } from "@apollo/client/link/error";
// import { WebSocketLink } from "@apollo/client/link/ws";
// import {
//   getMainDefinition,
//   offsetLimitPagination,
// } from "@apollo/client/utilities";

// const httpLink =
//   process.browser &&
//   new HttpLink({
//     uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`,
//   });

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   // const token = Cookies.get("token");
//   const token = localStorage.getItem("token");
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// const httpLinkWithMiddleware = process.browser && authLink.concat(httpLink);

// const wsLink = process.browser
//   ? new WebSocketLink({
//       uri: `${process.env.NEXT_PUBLIC_WS_URL}/api/graphql`,
//       options: {
//         reconnect: true,
//         lazy: true,
//         // connectionParams: {
//         //   token: Cookies.get("token"),
//         // },
//       },
//     })
//   : null;

// const errorLink = onError(({ networkError, graphQLErrors }) => {
//   if (graphQLErrors) {
//     graphQLErrors.map(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       )
//     );
//   }
//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });

// const splitLink = process.browser
//   ? split(
//       ({ query }) => {
//         const definition = getMainDefinition(query);
//         return (
//           definition.kind === "OperationDefinition" &&
//           definition.operation === "subscription"
//         );
//       },
//       wsLink,
//       httpLinkWithMiddleware,
//       errorLink
//     )
//   : null;

// export const cache = new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//         getMessages: offsetLimitPagination(["chatRoomId"]),
//         // getMessages: {
//         //   merge(existing = [], incoming = []) {
//         //     console.log(existing, incoming);
//         //     return [...incoming];
//         //   },
//         // },
//       },
//     },
//     Message: {
//       keyFields: false,
//     },
//   },
// });

// export const apolloClient = new ApolloClient({
//   cache,
//   link: splitLink,
//   connectToDevTools: process.env.NODE_ENV === "development",
// });

// export const ssrClient = (token) => {
//   return new ApolloClient({
//     uri: `${process.env.BASE_URL}/api/graphql`,
//     cache: new InMemoryCache(),
//     headers: {
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   });
// };

// import { SubscriptionClient } from "subscription-transport-ws";
// import { createClient as createWSClient } from "graphql-ws";
// import {
//   Client,
//   dedupExchange,
//   fetchExchange,
//   subscriptionExchange,
// } from "urql";

// const subscriptionClient =
//   process.browser &&
//   new createWSClient({
//     url: `${process.env.NEXT_PUBLIC_WS_URL}/api/graphql`,
//   });
// export const urqlClient = new Client({
//   url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`,
//   fetchOptions: () => {
//     const { token } = appState();
//     return {
//       headers: { authorization: token ? `Bearer ${token}` : "" },
//     };
//   },
//   exchanges: [
//     dedupExchange,
//     fetchExchange,
//     subscriptionExchange({
//       forwardSubscription: (operation) => ({
//         subscribe: (sink) => ({
//           unsubscribe: subscriptionClient.subscribe(operation, sink),
//         }),
//       }),
//     }),
//   ],
// });
