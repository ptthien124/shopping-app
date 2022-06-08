import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

Meteor.methods({
  "user.signUp": function (args) {
    const isUserExisted = Accounts.findUserByUsername(args.username);

    if (isUserExisted) {
      console.log('here');
      return { isSuccess: false, error: "Username existed!" };
    }

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

    if (findUser._id) {
      Accounts.setPassword(findUser._id, args.password);

      user = {
        username: findUser.username,
        fullName: findUser.profile.fullName,
        gender: findUser.profile.gender,
        userId: findUser._id,
        isAdmin: findUser.profile.isAdmin,
      };
    }

    return { isSuccess: true, user };
  },
});
