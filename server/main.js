import { Meteor } from "meteor/meteor";
import products from "../products.json";
import { ProductsCollection } from "/imports/api/links";

function addProduct(data) {
  data.forEach((item) => {
    ProductsCollection.insert({ ...item, createAt: new Date() });
  });
}

// const prod = useTracker(() => ProductsCollection.find().fetch());

// function remove() {
//   prod.forEach((item) => {
//     ProductsCollection.remove(item._id);
//   });
// }

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (ProductsCollection.find().count() === 0) {
    addProduct(products);
  }
});
