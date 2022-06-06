import React, { useState } from "react";
import "../../styles/css/adminPage.css";
import AddProduct from "./AddProduct";
import RemoveProduct from "./RemoveProduct";
import UpdateProduct from "./UpdateProduct";

function AdminPage() {
  const [action, setAction] = useState("add");

  return (
    <div className="adminPage">
      <div className="buttonWrapper">
        <button onClick={() => setAction("add")}>add</button>
        <button onClick={() => setAction("update")}>update</button>
        <button onClick={() => setAction("remove")}>remove</button>
      </div>

      {action === "add" && <AddProduct />}
      {action === "update" && <UpdateProduct />}
      {action === "remove" && <RemoveProduct />}
    </div>
  );
}

export default AdminPage;
