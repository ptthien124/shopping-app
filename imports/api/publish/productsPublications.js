import { Meteor } from "meteor/meteor";
import ProductsCollection from "../ProductsCollection";

Meteor.publish({
  products: function publishProducts() {
    const data = ProductsCollection.find();
    return data;
  },
  pagingProducts: function publishPagingProducts(offset, limit) {
    const data = ProductsCollection.find({}, { skip: offset, limit });
    return data;
  },
  filterProducts: function publishFilterProducts(filter) {
    const data = ProductsCollection.find({ title: { $regex: filter } });
    return data;
  },
});
