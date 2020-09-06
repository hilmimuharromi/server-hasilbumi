import { gql } from "apollo-server";

export default gql`
  type Category {
    id: ID
    code: Int!
    name: String
    slug: String
    imageUrl: String
  }
  extend type Query {
    getCategories: [Category]
  }

  extend type Mutation {
    addCategory(
      name: String!
      code: Int!
      slug: String!
      imageUrl: String
    ): Category
    deleteCategory(id: ID): ResultAction
    updateCategory(
      id: String!
      name: String
      code: Int
      slug: String
      imageUrl: String
    ): ResultAction
  }
`;
