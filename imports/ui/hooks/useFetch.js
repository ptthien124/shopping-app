import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import ProductsCollection from "../../api/ProductsCollection";

function useFetch(filter, findOne = false, skip = 0, limit = 12) {
  const [loading, setLoading] = useState(true);
  const result = useTracker(() => {
    setLoading(true);
    if (findOne) {
      const products = Meteor.subscribe("products");
      if (products.ready()) {
        const result = ProductsCollection.findOne(filter);

        setLoading(false);
        return result;
      }
    }
    const products = Meteor.subscribe("pagingProducts", skip, limit);
    if (products.ready()) {
      const result = ProductsCollection.find(filter, {
        skip: skip,
        limit: limit,
        createdAt: -1,
      }).fetch();

      setLoading(false);
      return result;
    }

    return [];
  }, [filter, skip, limit]);

  return {
    loading,
    list: result,
  };
}

export default useFetch;
