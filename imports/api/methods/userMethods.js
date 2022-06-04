import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";


Meteor.methods({
  "user.isUserNameExisted": function (args) {
    const user = Accounts.findUserByUsername(args.username);

    if (user) {
      return true;
    }
    return false;
  },

  "user.signUp": function (args) {
    Meteor.users.insert({
      username: args.username,
      profile: {
        fullName: args.fullName,
        gender: args.gender,
        isAdmin: false,
      },
    });

    let user = {};

    const findUser = Accounts.findUserByUsername(args.username);

    Accounts.setPassword(findUser._id, args.password);

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
