import { AuthenticationError } from "apollo-server";

export default {
  Query: {
    kategori: async (parent, args, { models: { kategoriModel } }, info) => {
      const kategori = await kategoriModel.find();
      return kategori;
    },
    products: async (parent, args, { models: { productModel } }, info) => {
      const products = await productModel.find().populate("kategori").exec();
      return products;
    },
    productsByCategory: async (
      parent,
      { kategori },
      { models: { productModel } },
      info
    ) => {
      const products = await productModel
        .find({ kategori: kategori })
        .populate("kategori")
        .exec();
      return products;
    },
  },
  Mutation: {
    tambahKategori: async (
      parent,
      { nama, gambar },
      { models: { kategoriModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const kategori = await kategoriModel.create({ nama, gambar });
      console.log(kategori);
      return kategori;
    },

    tambahProduk: async (
      parent,
      args,
      { models: { productModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const {
        nama,
        hargaNominal,
        hargaUkuran,
        hargaDiskonNominal,
        hargaDiskonUkuran,
        gambar,
        deskripsi,
        asal,
        minimalOrder,
        stok,
        kategori,
      } = args;

      const product = await productModel.create({
        nama,
        harga: { nominal: hargaNominal, ukuran: hargaUkuran },
        hargaDiskonNominal: {
          nominal: hargaDiskonNominal,
          ukuran: hargaDiskonUkuran,
        },
        gambar,
        deskripsi,
        asal,
        minimalOrder,
        stok,
        kategori,
      });

      console.log(product, "produk");

      return product;
    },
  },
};
