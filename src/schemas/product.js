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
    codeCategory: String
  }

  type Price {
    nominal: Int
    ukuran: String
  }

  type ResultAction {
    id: ID
    status: String
  }

  type PageInfo {
    total: Int
    page: Int
  }

  type Result {
    pageInfo: PageInfo
    products: [Product]
  }

  extend type Query {
    getProducts(
      name: String
      startPrice: Int
      endPrice: Int
      category: String
      limit: Int
      page: Int
    ): Result
  }
  extend type Mutation {
    addProduct(name: String): Product!
    seedProducts(password: String): [Product]
  }
`;
