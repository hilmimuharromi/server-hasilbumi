import { AuthenticationError, UserInputError } from "apollo-server";

export default {
  Query: {
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
