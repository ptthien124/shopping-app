import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

Meteor.methods({
  "auth.findUser": function (args) {
    let user = {};

    user = Accounts.findUserByUsername(args.username);

    return user;
  },
});
