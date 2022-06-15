import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const ProductsCollection = new Mongo.Collection("products");

const Product = {};

Product.schema = new SimpleSchema({
  title: { type: String },
  description: { type: String },
  image: { type: String, regEx: SimpleSchema.RegEx.Url },
  price: { type: Number },
  userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  createdAt: {
    type: Date,
    optional: true,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue() {
      if (this.isUpdate) {
        return new Date();
      }
    },
  },
});

ProductsCollection.attachSchema(Product.schema);

export default ProductsCollection;
