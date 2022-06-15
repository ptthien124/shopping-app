import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

Meteor.methods({
  "auth.login": function (args) {

    
    const { username, password } = args;

    let user = {};

    user = Accounts.findUserByEmail(username);

    if (!user._id) {
      return { isSuccess: false, error: "Wrong username!" };
    }

    return user;
  },
});
