import { Accounts } from "meteor/accounts-base";
import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";

Meteor.methods({
  "user.isUserNameExisted": function (args) {
    new SimpleSchema({
      username: { type: String },
      password: { type: String },
    }).validate(args);

    const user = Accounts.findUserByUsername(args.username);

    if (user) {
      return true;
    }
    return false;
  },

  "user.signUp": function (args) {
    check(args, Object);

    const newUser = Meteor.users.insert({
      username: args.username,
      profile: {
        fullName: args.fullName,
        gender: args.gender,
        isAdmin: false,
      },
    });
    Accounts.setPassword(newUser, args.password);

    let user = {};

    const findUser = Accounts.findUserByUsername(args.username);

    if (findUser._id) {
      user = {
        username: findUser.username,
        fullName: findUser.profile.fullName,
        gender: findUser.profile.gender,
        userId: findUser._id,
        isAdmin: findUser.profile.isAdmin,
      };
    }

    return user;
  },
});
