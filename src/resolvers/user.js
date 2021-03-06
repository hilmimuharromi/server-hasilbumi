import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";

export default {
  Query: {
    login: async (
      parent,
      { email, password },
      { models: { userModel } },
      info
    ) => {
      const user = await userModel.findOne({ email }).exec();
      if (!user) {
        throw new AuthenticationError("Invalid credentials");
      }
      const matchPasswords = bcrypt.compareSync(password, user.password);

      if (!matchPasswords) {
        throw new AuthenticationError("Invalid credentials");
      }

      const token = jwt.sign(
        { id: user.id, status: user.status },
        "riddlemethis",
        {
          expiresIn: 24 * 10 * 50,
        }
      );

      return {
        token,
      };
    },
    getProfile: async (parent, args, { me, models: { userModel } }, info) => {
      if (!me) {
        throw new AuthenticationError("Invalid credentials");
      }
      const user = await userModel
        .findOne({ _id: me.id })
        .populate("profile")
        .exec();
      console.log(user);
      return user;
    },
  },
  Mutation: {
    register: async (
      parent,
      { name, status, email, password },
      { models: { userModel, profileModel } },
      info
    ) => {
      const profile = await profileModel.create({ name });
      if (profile) {
        if (!status) status = 3;
        const user = await userModel.create({
          email,
          password,
          status,
          profile: profile._id,
        });
        console.log(user, "user");
        console.log(profile, "profile");
        const token = jwt.sign({ id: user._id, status }, "riddlemethis", {
          expiresIn: 24 * 10 * 50,
        });
        return { token };
      }
    },
  },
};
