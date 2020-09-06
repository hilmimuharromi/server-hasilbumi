import userSchema from "./user";
import productSchema from "./product";
import categorySchema from "./category";
import { gql } from "apollo-server";

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, productSchema, categorySchema];
