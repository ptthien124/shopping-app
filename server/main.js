import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import "../imports/api/authMethods";
import "../imports/api/productsMethods";
import "../imports/api/userMethods";
import products from "../products.json";
import { ProductsCollection } from "/imports/api/links";

function addProduct(data) {
  // data.forEach((item) => {
  //   Meteor.call("products.insert", {
  //     title: item.title,
  //     description: item.description,
  //     image: item.image,
  //     price: item.price,
  //     user: {},
  //   });
  data.forEach((item) => {
    ProductsCollection.insert({ ...item, createAt: new Date() });
  });
}

const SEED_USERNAME = "admingmail.com";
const SEED_PASSWORD = "admintest";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    var newUserId = Meteor.users.insert({
      username: SEED_USERNAME,
      profile: {
        fullName: "admin",
      },
      createdAt: new Date(),
    });
    Accounts.setPassword(newUserId, SEED_PASSWORD);
  }

  if (ProductsCollection.find().count() === 0) {
    addProduct(products);
  }
});

Meteor.methods({});
