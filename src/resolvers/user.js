import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";

export default {
  Query: {
    login: async (
      parent,
      { name, password },
      { models: { userModel } },
      info
    ) => {
      const user = await userModel.findOne({ name }).exec();

      if (!user) {
        throw new AuthenticationError("Invalid credentials");
      }

      const matchPasswords = bcrypt.compareSync(password, user.password);

      if (!matchPasswords) {
        throw new AuthenticationError("Invalid credentials");
      }

      const token = jwt.sign({ id: user.id }, "riddlemethis", {
        expiresIn: 24 * 10 * 50,
      });

      return {
        token,
      };
    },
    profile: async (parent, args, { me, models: { userModel } }, info) => {
      if (!me) {
        throw new AuthenticationError("Invalid credentials");
      }
      const user = await userModel
        .findOne({ _id: me.id })
        .populate("profile")
        .populate("keranjang")
        .exec();

      console.log(user);
    },
  },
  Mutation: {
    register: async (
      parent,
      { name, email, password },
      { models: { userModel, profileModel } },
      info
    ) => {
      const profile = await profileModel.create({ name });
      if (profile) {
        const user = await userModel.create({
          email,
          password,
          profile: profile._id,
        });
        console.log(user, "user");
        console.log(profile, "profile");
        const token = jwt.sign({ id: user._id }, "riddlemethis", {
          expiresIn: 24 * 10 * 50,
        });
        return { token };
      }
    },
  },
};
