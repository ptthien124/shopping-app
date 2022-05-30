import { check } from "meteor/check";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { ProductsCollection } from "./links";

Meteor.methods({
  "products.insert"(data) {
    check(data, Object);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    const newData = { ...data, createdAt: new Date() };

    ProductsCollection.insert({
      ...newData,

      userId: this.userId,
    });
  },

  "products.remove"(productId) {
    check(productId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    ProductsCollection.remove(productId);
  },
});
