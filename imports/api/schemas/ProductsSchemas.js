import SimpleSchema from "simpl-schema";

const Product = {};

Product.schema = new SimpleSchema({
  title: { type: String },
  description: { type: String },
  image: { type: String },
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

export default Product;
