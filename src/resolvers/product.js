import { AuthenticationError, UserInputError } from "apollo-server";
import dataProducts from "../dataProducts";
export default {
  Query: {
    getProducts: async (
      parent,
      { name, startPrice, endPrice, category },
      { models: { productModel } },
      info
    ) => {
      if (!name) name = "";
      const products = await productModel
        .find({
          name: { $regex: name, $options: "i" },
          "price.nominal": { $lt: 39000 },
        })
        .exec();
      console.log(products, "get products");
      return products;
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
