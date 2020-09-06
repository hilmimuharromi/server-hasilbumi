import { gql } from "apollo-server";

export default gql`
  type Product {
    id: ID!
    nama: String!
    harga: Harga
    hargaDiskon: Harga
    gambar: String
    deskripsi: String
    asal: String
    minimalOrder: String
    stok: Int
    kategori: Kategori
  }

  type Harga {
    nominal: Int
    ukuran: String
  }

  type Kategori {
    id: ID
    nama: String
    gambar: String
  }

  type Status {
    id: ID
    status: String
  }

  extend type Query {
    productId(id: ID!): Product
    products: [Product!]
    kategori: [Kategori]
  }
  extend type Mutation {
    tambahKategori(nama: String, gambar: String): Kategori
    hapusKategori(id: ID): Status
    tambahProduk(
      nama: String!
      hargaNominal: Int
      hargaUkuran: String
      hargaDiskonNominal: Int
      hargaDiskonUkuran: String
      gambar: String
      deskripsi: String
      asal: String
      minimalOrder: String
      stok: Int
      kategori: ID
    ): Product!
  }
`;
