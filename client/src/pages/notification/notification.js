import React from "react";
import { Tabs } from "antd";
import "./notification.css";
import { useSelector } from "react-redux";
import Layout from "../../components/layout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading } from "../../redux/alertsSlice";
import { hideLoading } from "../../redux/alertsSlice";
import toast from "react-hot-toast";
import { setUser } from "../../redux/userSlice";
import axios from "axios";
// const url = "http://localhost:4000";
// const url = "http://ec2-54-234-133-143.compute-1.amazonaws.com:4000";

const { TabPane } = Tabs;

export default function Notification() {
  const { user } = useSelector((state) => state.user);

  const onChange = (key) => {
    console.log(key);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const markAsRead = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `/api/user/mark-all-notification-seen`,
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success("Marked as unread");
        dispatch(setUser(response.data.data));
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const deleteAllNotification = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `/api/user/delete-all-notification`,
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        toast.success("deleted all notification");
        dispatch(setUser(response.data.data));
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(hideLoading());
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1 className="page-title">Notification</h1>
      <Tabs defaultActiveKey={0} onChange={onChange} className="tab">
        <TabPane tab="Unread" key={0}>
          <div>
            <div className="d-flex justify-content-end">
              <h1
                className="anchors"
                onClick={() => {
                  markAsRead();
                }}
              >
                Mark all as read
              </h1>
            </div>

            {user?.unreadNotifications.map((notification) => (
              <div
                className="card p-2"
                onClick={() => {
                  navigate(notification.onclick);
                }}
              >
                <div className="card-text">{notification.message}</div>
              </div>
            ))}
          </div>
        </TabPane>
        <TabPane tab="Read" key={1}>
          <div>
            <div className="d-flex justify-content-end">
              <h1 className="anchors" onClick={
                () => {
                  deleteAllNotification();
                }
               
              }>Delete All</h1>
            </div>
            {user?.seenNotifications.map((notification) => (
              <div
                className="card p-2"
                onClick={() => {
                  navigate(notification.onclick);
                }}
              >
                <div className="card-text">{notification.message}</div>
              </div>
            ))}
          </div>
        </TabPane>
      </Tabs>
    </Layout>
  );
}
