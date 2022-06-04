import { Mongo } from "meteor/mongo";
import  Product  from "./schemas/ProductsSchemas";

const ProductsCollection = new Mongo.Collection("products");

ProductsCollection.attachSchema(Product.schema);

export default ProductsCollection;
