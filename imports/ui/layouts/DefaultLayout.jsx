import React from "react";
import { Header } from "../components";

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="container">{children}</div>
    </div>
  );
}

export default DefaultLayout;
