import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Accounts } from "meteor/accounts-base";
import SimpleSchema from "simpl-schema";

Meteor.methods({
  "auth._checkPassword": function (args) {
    new SimpleSchema({
      username: { type: String },
      password: { type: String },
    }).validate(args);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const user = Accounts.findUserByUsername(args.username);

    const isUserExisted = Accounts._checkPassword(user, args.password);

    if (!isUserExisted) {
      return { ...user, check: false };
    }
    return { ...user, check: true };
  },

  "auth.loginWithPassword": function (args) {
    check(args, Object);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    
  },
});
