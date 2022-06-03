import React from "react";
import { Link } from "react-router-dom";
import "../../styles/css/empty.css";

function Empty() {
  return (
    <div className="empty">
      <span>Your cart is empty!</span>
      <Link to="/">Go to products</Link>
    </div>
  );
}

export default Empty;
