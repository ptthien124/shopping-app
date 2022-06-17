import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import ProductsCollection from "../../api/ProductsCollection";

function useCountProduct(search) {
  const productsCount = useTracker(() => {
    const count = Meteor.subscribe("filterProducts", search);
    if (count.ready()) {
      const result = ProductsCollection.find({
        title: { $regex: search },
      }).count();
      return result;
    }
    return 0;
  }, [search]);

  return productsCount;
}

export default useCountProduct;
