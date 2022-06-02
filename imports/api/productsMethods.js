import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import { ProductsCollection } from "./links";

Meteor.methods({
  "products.insert"(data) {
    new SimpleSchema({
      title: { type: String },
      description: { type: String },
      image: { type: String },
      price: { type: Number },
      username: { type: String },
      fullName: { type: String },
      userId: { type: String },
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

  "products.remove"(data) {
    new SimpleSchema({
      productId: { type: String },
    }).validate(data);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    ProductsCollection.remove(data.productId);
  },
});
