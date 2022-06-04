import { Meteor } from "meteor/meteor";
import user from "./schemas/UsersSchemas";

Meteor.users.attachSchema(user.schema);
