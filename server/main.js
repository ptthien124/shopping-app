import uniqueId from "lodash/uniqueId";
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

const SEED_EMAIL = "admin@gmail.com";
const SEED_PASSWORD = "admintest";

Meteor.startup(() => {
  if (!Accounts.findUserByEmail(SEED_EMAIL)) {
    const user = {
      username: uniqueId("usr_"),
      email: SEED_EMAIL,
      password: SEED_PASSWORD,
      profile: {
        fullName: "admin",
        gender: "male",
        isAdmin: true,
      },
    };

    Accounts.createUser(user);
  }

  if (ProductsCollection.find().count() === 0) {
    addProduct(products);
  }
});
