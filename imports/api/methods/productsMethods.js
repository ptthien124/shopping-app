import { Meteor } from "meteor/meteor";
import ProductsCollection from "../ProductsCollection";

Meteor.methods({
  "products.insert"(data) {
    const newData = { ...data };

    ProductsCollection.insert({
      ...newData,

      userId: this.userId,
    });
  },

  "products.remove"(data) {
    if (!Meteor.user().profile.isAdmin) {
      throw new Meteor.Error("don't have permission");
    }

    ProductsCollection.remove(data.productId);
  },
});
