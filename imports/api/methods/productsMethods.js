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

  "products.update"(data) {
    const product = ProductsCollection.findOne(data.productId);

    if (product) {
      data.title !== "" &&
        ProductsCollection.update(product._id, {
          $set: { title: data.title },
        });

      data.description !== "" &&
        ProductsCollection.update(product._id, {
          $set: { description: data.description },
        });

      data.image !== "" &&
        ProductsCollection.update(product._id, {
          $set: { image: data.image },
        });

      data.price !== "" &&
        ProductsCollection.update(product._id, {
          $set: { price: data.price },
        });
    }
  },

  "products.remove"(data) {
    if (!Meteor.user().profile.isAdmin) {
      throw new Meteor.Error("don't have permission");
    }

    ProductsCollection.remove(data.productId);
  },
});
