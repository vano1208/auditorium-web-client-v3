import {ApolloClient, InMemoryCache, makeVar} from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLogged: {
            read () {
              return isLoggedVar();
            }
          }
        }
      }
    }
  }),
});

export const isLoggedVar = makeVar(false)
