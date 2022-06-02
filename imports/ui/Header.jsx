import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Menu, Space } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAuth, logoutRequest } from "../redux/actions/authAction";
import "../styles/css/header.css";

function Header() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutRequest());
  };

  const menu = (
    <Menu
      items={[
        {
          label: "Profile",
          key: "0",
        },
        {
          label: "Setting",
          key: "1",
        },
        user.username === "admingmail.com" && {
          label: <Link to="/admin">Admin</Link>,
        },
        {
          type: "divider",
        },

        {
          label: (
            <Link onClick={handleLogout} to="/login">
              Log out
            </Link>
          ),
          key: "3",
        },
      ]}
    />
  );

  return (
    <div className="header">
      <div className="left">
        <Link className="link" to="/">
          Products
        </Link>
        <Link className="link" to="/cart">
          Cart
        </Link>
      </div>
      <div className="right">
        <div className="avatarWrapper">
          <FontAwesomeIcon className="avatar" icon={faCircleUser} />
        </div>

        <Dropdown
          overlay={menu}
          trigger={["click"]}
          placement="bottomRight"
          arrow
          overlayClassName="dropdown"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <h2 className="name">{user?.fullName}</h2>
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;
