import { ApolloServer } from "apollo-server";
import typeDefs from "./graphql/typedefs";
import resolvers from "./graphql/resolvers";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const env: any = process.env;

mongoose
  .connect(env.MONGODB_URI)
  .then((_) => {
    console.log("Connected to DB");
    const server = new ApolloServer({ typeDefs, resolvers });
    server.listen().then((_) => console.log(`GraphQL Started: ${_.url}`));
  })
  .catch((error) => {
    console.log(error);
  });
