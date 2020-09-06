import { AuthenticationError, UserInputError } from "apollo-server";

export default {
  Query: {
    kategori: async (parent, args, { models: { kategoriModel } }, info) => {
      const kategori = await kategoriModel.find();
      return kategori;
    },
    products: async (parent, args, { models: { productModel } }, info) => {
      const products = await productModel
        .find()
        .populate({ path: "kategori", match: { kode: 3 } })
        .exec();
      return products;
    },
  },
  Mutation: {
    tambahKategori: async (
      parent,
      { kode, nama, slug, gambar },
      { models: { kategoriModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }
      const kategori = await kategoriModel.create({ kode, nama, slug, gambar });
      console.log(kategori);
      return kategori;
    },
    hapusKategori: async (
      parent,
      { id },
      { models: { kategoriModel }, me },
      info
    ) => {
      if (!me) throw new AuthenticationError("You are not authenticated");

      const kategori = await kategoriModel.deleteOne({ _id: id });
      let status = {
        id,
        status: "Data Tidak Ditemukan",
      };
      if (kategori.n === 1) {
        status.status = "Success";
      } else {
        throw new UserInputError("Data Tidak Ditemukan");
      }

      console.log(status, "hapus kategori");
      return status;
    },

    tambahProduk: async (
      parent,
      {
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
      },
      { models: { productModel }, me },
      info
    ) => {
      if (!me) {
        throw new AuthenticationError("You are not authenticated");
      }

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
