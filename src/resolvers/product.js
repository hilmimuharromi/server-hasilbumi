import { AuthenticationError, UserInputError } from "apollo-server";
import e from "cors";
import dataProducts from "../dataProducts";
import category from "./../model/category";
export default {
  Query: {
    getProducts: async (
      parent,
      { name, startPrice, endPrice, category, page, limit },
      { models: { productModel } },
      info
    ) => {
      if (!name) name = "";
      if (!page) page = 1;
      if (!startPrice) startPrice = 0;
      if (!endPrice) endPrice = 99999999999;
      console.log(category, "kategori");
      const products = await productModel
        .find({
          name: { $regex: name, $options: "i" },

          "price.nominal": { $gte: startPrice, $lte: endPrice },
        })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await productModel.countDocuments({
        name: { $regex: name, $options: "i" },

        "price.nominal": { $gte: startPrice, $lte: endPrice },
      });

      let payload = {
        pageInfo: {
          total: count,
          page: page,
        },
        products: products,
      };
      console.log(payload, "total get products");
      return payload;
    },

    // products: async (parent, args, { models: { productModel } }, info) => {
    //   const products = await productModel.find().exec();
    //   return products;
    // },
    // productsByCategory: async (
    //   parent,
    //   { category },
    //   { models: { productModel } },
    //   info
    // ) => {
    //   console.log(kode, "masuk by kategori");
    //   const products = await productModel
    //     .find({ kategori: id })
    //     .populate("kategori")
    //     .exec();
    //   return products;
    // },
  },
  Mutation: {
    seedProducts: async (
      parent,
      { password },
      { models: { productModel } },
      info
    ) => {
      if (password === "168168") {
        const result = await productModel.insertMany(dataProducts);
        console.log(result, "insertmany");
        return result;
      } else {
        throw new AuthenticationError("Tidak Punya Akses");
      }
    },
    // addProduct: async (
    //   parent,
    //   {
    //     nama,
    //     hargaNominal,
    //     hargaUkuran,
    //     hargaDiskonNominal,
    //     hargaDiskonUkuran,
    //     gambar,
    //     deskripsi,
    //     asal,
    //     minimalOrder,
    //     stok,
    //     kategori,
    //   },
    //   { models: { productModel }, me },
    //   info
    // ) => {
    //   if (!me) {
    //     throw new AuthenticationError("You are not authenticated");
    //   }
    //   const product = await productModel.create({
    //     nama,
    //     harga: { nominal: hargaNominal, ukuran: hargaUkuran },
    //     hargaDiskonNominal: {
    //       nominal: hargaDiskonNominal,
    //       ukuran: hargaDiskonUkuran,
    //     },
    //     gambar,
    //     deskripsi,
    //     asal,
    //     minimalOrder,
    //     stok,
    //     kategori,
    //   });
    //   console.log(product, "produk");
    //   return product;
    // },
  },
};
