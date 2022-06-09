import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import uniqueId from "lodash/uniqueId";

const Schema = {
  SignUpDTO: new SimpleSchema({
    email: {
      type: String,
      required: true,
      regEx: SimpleSchema.RegEx.Email
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 20
    },
    fullName: {
      type: String,
      required: true,
      max: 100
    },
    gender: {
      type: String,
      required: true,
      max: 100
    },
  }),
  LoginDTO: new SimpleSchema({
    email: String,
    password: String,
  })
};

Meteor.methods({
  "user.signUp": function (payload) {
    Schema.SignUpDTO.validate(payload);

    const { email, password, fullName, gender } = payload;

    const user = {
      username: uniqueId('usr_'),
      email: email,
      password: password,
      profile: {
        fullName,
        gender
      }
    }

    console.log('create user: ', user);

    Accounts.createUser(user);
  },
  // "user.logIn": function (payload) {
  //   Schema.LoginDTO.validate(payload);

  //   console.log('payload: ', payload);

  //   Meteor.loginWithPassword(payload.email, payload.password)
  // }
});
