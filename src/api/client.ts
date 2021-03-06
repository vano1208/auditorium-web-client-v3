import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const client = new ApolloClient({
  // uri: "http://192.168.0.102:4000/",
  uri: "http://localhost:4000",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLogged: {
            read() {
              return isLoggedVar();
            },
          },
          isBlurred: {
            read() {
              return isBlurredVar();
            },
          },
          gridUpdate: {
            read() {
              return gridUpdate();
            },
          },
          meType: {
            read() {
              return meType();
            },
          },
        },
      },
    },
  }),
});
export const isLoggedVar = makeVar(false);
export const isBlurredVar = makeVar(false);
export const gridUpdate = makeVar(false);
export const meType = makeVar("USER");
