import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { useState } from "react";
import AddProduct from "./AddProduct";
import RemoveProduct from "./RemoveProduct";
import "../../styles/css/adminPage.css";

function AdminPage() {
  // const username = "admin1";
  // const pass = "admin";

  // Meteor.loginWithPassword(username, pass);

  const [addOrRemove, setAddOrRemove] = useState("add");

  const user = useTracker(() => Meteor.user());

  return (
    <div className="adminPage">
      <div className="buttonWrapper">
        <button onClick={() => setAddOrRemove("add")}>add</button>
        <button onClick={() => setAddOrRemove("remove")}>remove</button>
      </div>

      {addOrRemove === "add" ? <AddProduct /> : <RemoveProduct />}
    </div>
  );
}

export default AdminPage;
