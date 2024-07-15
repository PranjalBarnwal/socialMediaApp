import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import bodyParser from "body-parser";

export async function initServer() {
  const app = express();
  app.use(bodyParser.json());

  const graphqlServer = new ApolloServer({
    typeDefs: `
            type Query {
                sayHello:String
                sayHelloToMe(name:String!) : String
            }
        `,
    resolvers: {
      Query: {
        sayHello: () => `Hello from graphql server`,
        sayHelloToMe: (parent: any, { name }: { name: String }) =>null
        //   `Hello from graphql server ${name}`,
      },
      // Mutation:{}
    },
  });

  await graphqlServer.start();

  app.use("/graphql", expressMiddleware(graphqlServer));

  return app;
}
