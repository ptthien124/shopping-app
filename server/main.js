import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import "../imports/api/authMethods";
import "../imports/api/authPublications";
import "../imports/api/productsMethods";
import "../imports/api/productsPublications";
import "../imports/api/userMethods";
import "../imports/api/userPublications";
import products from "../products.json";
import { ProductsCollection } from "/imports/api/links";

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
