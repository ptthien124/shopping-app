import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Menu, Modal, Space } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ACTIONS } from "../redux/actions/auth";
import "../styles/css/header.css";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(ACTIONS.LOGOUT.REQUEST());
    navigate("/login");
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate("/login");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
        user.isAdmin && {
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

        {user.isLoggedIn ? (
          <Link className="link" to="/cart">
            Cart
          </Link>
        ) : (
          <span
            style={{ cursor: "pointer" }}
            className="link"
            onClick={showModal}
          >
            Cart
          </span>
        )}
      </div>
      <div className="right">
        {user.isLoggedIn ? (
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            placement="bottomRight"
            arrow
            overlayClassName="dropdown"
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <div className="avatarWrapper">
                  <FontAwesomeIcon className="avatar" icon={faCircleUser} />
                </div>
                <h2 className="name">{user?.fullName}</h2>
              </Space>
            </a>
          </Dropdown>
        ) : (
          <Link className="link" to="/login">
            Login
          </Link>
        )}
      </div>

      <Modal
        title="Not logged in yet!"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <p>You need to login before shopping.</p>
        <p>Ok to login.</p>
      </Modal>
    </div>
  );
}

export default Header;
