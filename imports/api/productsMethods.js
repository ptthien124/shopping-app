import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { ProductsCollection } from "./links";
import SimpleSchema from "simpl-schema";

Meteor.methods({
  "products.insert"(data) {
    new SimpleSchema({
      title: { type: String },
      description: { type: String },
      image: { type: String },
      price: { type: Number },
      user: { type: Object },
    }).validate(data);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const newData = { ...data, createdAt: new Date() };

    ProductsCollection.insert({
      ...newData,

      userId: this.userId,
    });
  },
});
