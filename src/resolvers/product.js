import { AuthenticationError } from "apollo-server";

export default {
  Query: {
    kategori: async (parent, args, { models: { kategoriModel } }, info) => {
      const kategori = await kategoriModel.find();
      return kategori;
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
    hapusKategori: async (
      parent,
      { id },
      { models: { kategoriModel }, me },
      info
    ) => {
      const kategori = await kategoriModel.deleteOne({ _id: id });
      let status = {
        id,
        status: "Data Tidak Ditemukan",
      };
      if (kategori.n === 1) {
        status.status = "Success";
      }

      console.log(status, "hapus kategori");
      return status;
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
