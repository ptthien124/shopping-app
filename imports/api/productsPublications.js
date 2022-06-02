import { Meteor } from "meteor/meteor";
import { ProductsCollection } from "./links";

Meteor.publish("products", function publishProducts() {
  const data = ProductsCollection.find();
  return data;
});
