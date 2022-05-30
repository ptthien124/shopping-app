import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import products from "../products.json";
import { ProductsCollection } from "/imports/api/links";
import "/imports/api/productsMethods";

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

const SEED_USERNAME = "admin";
const SEED_PASSWORD = "admin";

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (ProductsCollection.find().count() === 0) {
    addProduct(products);
  }

  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});
