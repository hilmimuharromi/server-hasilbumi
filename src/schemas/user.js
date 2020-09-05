import { gql } from "apollo-server";

export default gql`
  type User {
    id: ID!
    email: String!
    profile: Profile
    keranjang: [Product]
  }

  type Profile {
    id: ID!
    name: String!
  }

  type Token {
    token: String!
  }

  extend type Query {
    user(id: ID!): User!
    profile: Profile!
    login(email: String!, password: String!): Token!
  }

  extend type Mutation {
    register(name: String!, email: String!, password: String!): Token!
  }
`;
