import React, { useState } from "react";
import "./styles/layout.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Modal } from "antd";
import { Badge } from "antd";
import { useToaster } from 'react-hot-toast';

function Layout({ children }) {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const toaster = useToaster();

  const userMenu = [
    {
      name: "Home",
      icon: "ri-home-2-fill",
      path: "/userHome",
    },
    {
      name: "Control Panel",
      icon: "ri-file-list-fill",
      path: "/controlPanel",
    },
    {
      name: "Monitoring",
      icon: "ri-hospital-fill",
      path: "/monitoring",
    },
    {
      name: "Profile",
      icon: "ri-file-user-fill ",
      path: "/userProfile",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      icon: "ri-home-2-fill",
      path: "/userHome",
    },
    {
      name: "All Users",
      icon: "ri-user-line",
      path: "/admin/allUser",
    },
    {
      name: "All Admins",
      icon: "ri-user-settings-line",
      path: "/admin/alladmins",
    },
    {
      name: "Profile",
      icon: "ri-file-user-fill ",
      path: "/admin/adminProfile",
    },
  ];

  const menuToBeRendered = user?.isAdministrator ? adminMenu : userMenu;

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleLogout = () => {
    Modal.confirm({
      title: "Logout",
      content: "Are you sure you want to logout?",
      onOk: () => {
        localStorage.clear();
        navigate("/login");
        message.success("Logout successful");
      },
      onCancel: () => {},
    });
  };

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className={`${collapsed ? "collapsed-sidebar" : "sidebar"}`}>
          <div
            className={`${
              collapsed
                ? "collapsed-sidebar-header-image"
                : "sidebar-header-image"
            }`}
          >
            <img src="/assets/images/logo.png" alt="Logo" />
          </div>

          <div
            className={`${
              collapsed ? "collapsed-sidebar-header" : "sidebar-header"
            }`}
          >
            <img src="/assets/images/logo.png" alt="Logo" />
          </div>

          <div className="menu">
            {menuToBeRendered.map((menu, index) => {
              return (
                <div
                  key={index}
                  className={`d-flex menu-item ${
                    selectedMenu === index ? "active" : ""
                  }`}
                  onClick={() => handleMenuClick(index)}
                >
                  <Link to={menu.path}>
                    <i className={menu.icon}></i>
                  </Link>

                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}

            <div className={`d-flex menu-item`} onClick={handleLogout}>
              <i className="ri-logout-box-r-fill"></i>
              {!collapsed && <Link>Logout</Link>}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {!collapsed ? (
              <i
                className="ri-close-line remix-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            ) : (
              <i
                className="ri-menu-line remix-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            )}

            <div
              className="info-use"
              onClick={() => {
                navigate("/notifications");
              }}
            >
              <Badge count={user?.unreadNotifications.length}>
                <i className="ri-notification-3-fill remix-icon"></i>
              </Badge>

              <Link className="anchor" to="/userHome">
                {user?.fullName}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
