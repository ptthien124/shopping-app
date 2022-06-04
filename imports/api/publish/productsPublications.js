import { Meteor } from "meteor/meteor";
import  ProductsCollection  from "../ProductsCollection";

Meteor.publish("products", function publishProducts() {
  const data = ProductsCollection.find();
  return data;
});
