import { AuthenticationError, UserInputError } from "apollo-server";

export default {
  Query: {
    getCategories: async (
      parent,
      args,
      { models: { categoryModel } },
      info
    ) => {
      const category = await categoryModel.find();
      return category;
    },
  },
  Mutation: {
    addCategory: async (
      parent,
      { name, code, slug, imageUrl },
      { models: { categoryModel }, me },
      info
    ) => {
      if (me.status === 1 || me.status === 2) {
        const category = await categoryModel.create({
          name,
          code,
          slug,
          imageUrl,
        });
        return category;
      } else {
        throw new AuthenticationError("You are not authenticated");
      }
    },
    updateCategory: async (
      parent,
      { id, name, code, slug, imageUrl },
      { models: { categoryModel }, me },
      info
    ) => {
      const oldCategory = await categoryModel.findOne({ _id: id });
      console.log(oldCategory, "old category");
      if (oldCategory) {
        if (!name) name = oldCategory.name;
        if (!code) code = oldCategory.code;
        if (!slug) slug = oldCategory.slug;
        if (!imageUrl) imageUrl = oldCategory;

        const category = await categoryModel.updateOne(
          { _id: id },
          {
            name,
            code,
            slug,
            imageUrl,
          }
        );
        let Result = {
          id,
          status: "Data Tidak Ditemukan",
        };
        if (category.n === 1) {
          Result.status = "Success";
        } else {
          throw new UserInputError("Data Tidak Ditemukan");
        }
        console.log(category, "update bos");
        return Result;
      } else {
        throw new UserInputError("data Not Found");
      }
    },
    deleteCategory: async (
      parent,
      { id },
      { models: { categoryModel }, me },
      info
    ) => {
      if (me.status === 1 || me.status === 2) {
        const category = await categoryModel.deleteOne({ _id: id });
        let Result = {
          id,
          status: "Data Tidak Ditemukan",
        };
        if (category.n === 1) {
          Result.status = "Success";
        } else {
          throw new UserInputError("Data Tidak Ditemukan");
        }
        console.log(Result, "hapus category");
        return Result;
      } else {
        throw new AuthenticationError("You are not authenticated");
      }
    },
  },
};
