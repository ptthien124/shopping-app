import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";

const user = {};

user.profile = new SimpleSchema({
  fullName: { type: String },
  gender: { type: String, allowedValues: ["male", "female"] },
  isAdmin: { type: Boolean, defaultValue: false, optional: true },
});

user.schema = new SimpleSchema({
  username: { type: String },
  emails: {
    optional: false,
    type: Array,
    label: "Email",
  },
  "emails.$": {
    type: Object,
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  "emails.$.verified": {
    type: Boolean,
    optional: true,
  },
  profile: { type: user.profile },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  createdAt: {
    type: Date,
    optional: true,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue() {
      if (this.isUpdate) {
        return new Date();
      }
    },
  },
});

Meteor.users.attachSchema(user.schema);
