import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { ApolloServer, AuthenticationError } from "apollo-server-express";

import schemas from "./schemas";
import resolvers from "./resolvers";

import userModel from "./model/user";
import productModel from "./model/product";
import profileModel from "./model/profile";

import categoryModel from "./model/category";
const app = express();
app.use(cors());

const getUser = async (req) => {
  const token = req.headers["token"];

  if (token) {
    try {
      return await jwt.verify(token, "riddlemethis");
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
};

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context: async ({ req }) => {
    if (req) {
      const me = await getUser(req);

      return {
        me,
        models: {
          userModel,
          productModel,
          categoryModel,
          profileModel,
        },
      };
    }
  },
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen(5000, () => {
  mongoose.connect("mongodb://localhost:27017/hasilbumi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
});
