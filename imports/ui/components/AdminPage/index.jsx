import React, { useState } from "react";
import "../../styles/css/adminPage.css";
import AddProduct from "./AddProduct";
import RemoveProduct from "./RemoveProduct";

function AdminPage() {
  const [addOrRemove, setAddOrRemove] = useState("add");

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
