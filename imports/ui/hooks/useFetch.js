import React from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import ProductsCollection from "../../api/ProductsCollection";

function useFetch(filter, findOne = false, skip = 0, limit = 12) {
  const result = useTracker(() => {
    const products = Meteor.subscribe("products");
    if (products.ready()) {
      if (findOne) {
        return ProductsCollection.findOne(filter);
      }

      return ProductsCollection.find(filter, {
        skip: skip,
        limit: limit,
        createdAt: -1,
      }).fetch();
    }

    return [];
  }, [filter, skip, limit]);

  return [result];
}

export default useFetch;
