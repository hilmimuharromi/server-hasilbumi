import { gql } from "apollo-server";

export default gql`
  type User {
    id: ID!
    email: String!
    status: Int!
    profile: Profile
  }

  type Profile {
    id: ID!
    name: String!
    user: ID
    nomorHp: String
    tanggalLahir: String
    jenisKelamin: String
    alamat: String
  }

  type KeranjangItem {
    id: ID
    product: Product
    kuantitas: Int
    total: Int
  }

  type Token {
    token: String!
  }
  extend type Query {
    getProfile: User!
    login(email: String!, password: String!): Token!
  }
  extend type Mutation {
    register(
      name: String!
      email: String!
      status: Int
      password: String!
    ): Token!
  }
`;
