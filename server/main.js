import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import "../imports/api/methods/authMethods";
import "../imports/api/methods/productsMethods";
import "../imports/api/methods/userMethods";
import ProductsCollection from "../imports/api/ProductsCollection";
import "../imports/api/publish/authPublications";
import "../imports/api/publish/productsPublications";
import "../imports/api/publish/userPublications";
import "../imports/api/UsersCollection";
import products from "../products.json";

function addProduct(data) {
  data.forEach((item) => {
    ProductsCollection.insert({ ...item, createAt: new Date() });
  });
}

const SEED_USERNAME = "adminAtSigngmail.com";
const SEED_PASSWORD = "admintest";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    var newUserId = Meteor.users.insert({
      username: SEED_USERNAME,
      profile: {
        fullName: "admin",
        gender: "male",
        isAdmin: true,
      },
      createdAt: new Date(),
    });
    Accounts.setPassword(newUserId, SEED_PASSWORD);
  }

  if (ProductsCollection.find().count() === 0) {
    addProduct(products);
  }
});
