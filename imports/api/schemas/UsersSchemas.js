import SimpleSchema from "simpl-schema";

const user = {};

user.profile = new SimpleSchema({
  fullName: { type: String },
  gender: { type: String, allowedValues: ["male", "female"] },
  isAdmin: { type: Boolean, defaultValue: false, optional: true },
});

user.schema = new SimpleSchema({
  username: { type: String },
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

export default user;
