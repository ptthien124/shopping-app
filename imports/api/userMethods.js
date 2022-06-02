import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Accounts } from "meteor/accounts-base";
import SimpleSchema from "simpl-schema";

Meteor.methods({
  "user.isUserNameExisted": function (args) {
    new SimpleSchema({
      username: { type: String },
      password: { type: String },
    }).validate(args);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const user = Accounts.findUserByUsername(args.username);

    if (user) {
      return { isUserExisted: true };
    }
    return { isUserExisted: false };
  },

  "user.signUp": function (args) {
    check(args, Object);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const newUserId = Meteor.users.insert({
      username: args.username,
      profile: {
        fullName: args.fullName,
        gender: args.gender,
      },
      createdAt: new Date(),
    });
    Accounts.setPassword(newUserId, args.password);

    const user = Accounts.findUserByUsername(args.username);

    console.log({
      username: args.username,
      fullName: args.fullName,
      userId: user._id,
    });
    return {
      username: args.username,
      fullName: args.fullName,
      userId: user._id,
    };
  },
});
