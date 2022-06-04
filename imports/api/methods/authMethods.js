import { Accounts } from "meteor/accounts-base";
import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";

Meteor.methods({
  "auth.findUser": function (args) {
    check(args, Object);

    let user = {};

    user = Accounts.findUserByUsername(args.username);

    return user;
  },
});
