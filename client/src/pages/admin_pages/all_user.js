// frontend/pages/AllUser.js
import React, { useEffect } from "react";
import Layout from "../../components/layout";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useState } from "react";
import { Table } from "antd";

// const url = "http://localhost:4000";

export default function AllUser() {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserData = async () => {
      try {
        dispatch(showLoading());

        const response = await axios.post(
          `/api/admin/get-all-users`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        console.log("Hide loading spinner");
        dispatch(hideLoading());
      }
    };

    getUserData();
  }, [dispatch]);

  const columns = [
    {
      title: "FullName",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="d-flex">
          <h1 className="anchors">Block</h1>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="page-title">All User</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
}
