import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Routing() {
  const navigate = useNavigate();
  const router = useSelector((state) => state.router);

  useEffect(() => {
    navigate(router.path);
  }, [router]);

  return <></>;
}

export default Routing;
