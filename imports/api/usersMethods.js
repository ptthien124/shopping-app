import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
  "users._checkPassword": function (args) {
    check(args, Object);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const user = Accounts.findUserByUsername(args.username);

    const isUserExisted = Accounts._checkPassword(user, args.password);

    return { ...isUserExisted, user };
  },
});
