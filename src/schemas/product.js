import { gql } from "apollo-server";

export default gql`
  type Product {
    id: ID!
    name: String!
    price: Price
    discountPrice: Price
    imageUrl: String
    description: String
    madeIn: String
    minOrder: Int
    stock: Int
  }

  type Price {
    nominal: Int
    ukuran: String
  }

  type ResultAction {
    id: ID
    status: String
  }

  extend type Query {
    getProducts(
      name: String
      startPrice: Int
      endPrice: Int
      category: String
    ): [Product]
  }
  extend type Mutation {
    addProduct(name: String): Product!
    seedProducts(password: String): [Product]
  }
`;
