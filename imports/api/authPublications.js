import { Meteor } from "meteor/meteor";

Meteor.publish("user", function publishUser() {
  return Meteor.user();
});
