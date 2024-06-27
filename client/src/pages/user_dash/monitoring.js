// Monitoring.js
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import "./styles/monitoring.css";
import {
  Avatar,
  Card,
  Progress,
  Table,
  Row,
  Col,
  Form,
  Input,
  Button,
} from "antd";
import LiquidGauge from "react-liquid-gauge";
import Layout from "../../components/layout";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Monitoring() {
  const { Meta } = Card;
  const [isTankRegistered, setIsTankRegistered] = useState(false);
  const [waterLevel, setWaterLevel] = useState(0);
  const [previousMonthUsage, setPreviousMonthUsage] = useState(75);
  const [dailyWaterUsage, setDailyWaterUsage] = useState(
    generatePast30DaysData()
  );
  const [tankId, setTankId] = useState("");
  const { user } = useSelector((state) => state.user);
  const [waterLevelBoundary, setWaterLevelBoundary] = useState(100);

  function generatePast30DaysData() {
    const today = new Date();
    const past30Days = Array.from({ length: 30 }, (_, index) => {
      const day = new Date(today);
      day.setDate(today.getDate() - index);
      return {
        day: day.toLocaleDateString(),
        usage: Math.floor(Math.random() * 30) + 1,
      };
    });
    return past30Days.reverse();
  }

  const columns = [
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Usage (units)",
      dataIndex: "usage",
      key: "usage",
    },
  ];

  const isTankRegisteredAPI = async () => {
    try {
      const response = await axios.post(`/api/user/hardware/tank-exits`, {
        userId: user?._id,
      });

      console.log("Registration successful:", response.data.success);

      if (response.data.success) {
        setIsTankRegistered(true);
      } else {
        setIsTankRegistered(false);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const handleTankIdChange = (e) => {
    setTankId(e.target.value);
  };

  const handleRegistration = async () => {
    try {
      const response = await axios.post(
        `/api/user/hardware/tank-registration`,
        {
          tankId,
          waterLevel,
          userId: user?._id,
        }
      );

      console.log("Registration successful:", response.data.success);

      if (response.data.success) {
        setIsTankRegistered(true);
      } else {
        console.log("User not Exist", response.data);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const getWaterLevel = async () => {
    try {
      const response = await axios.post(
        `/api/user/hardware/receive-water-level`,
        {
          userId: user?._id,
        }
      );

      console.log("Water level:", response.data.data.waterLevel);
      setWaterLevel(response.data.data.waterLevel);
      console.log("Registration successful:", response.data.success);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const handleWaterLevelBoundarySubmit = () => {
    console.log("Water level boundary submitted:", waterLevelBoundary);
    toast.success("Water level boundary set successfully!");
  };

  useEffect(() => {
    isTankRegisteredAPI();

    try {
      if (isTankRegistered) {
        getWaterLevel();
  
        const intervalId = setInterval(getWaterLevel, 30000); 


        // Cleanup the interval on component unmount
        return () => clearInterval(intervalId);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  }, [isTankRegistered]);

  return (
    <Layout>
      <h1 className="page-title">Monitoring</h1>
      <div className="card-container-monitoring">
        {isTankRegistered ? (
          // Monitoring content
          <>
            <Card className="card-monitoring">
              <LiquidGauge
                className="gauge-container"
                width={200}
                height={200}
                value={waterLevel}
                fontSize={24}
                textColor={waterLevel > waterLevelBoundary ? "red" : "#000"}
              />
              <Meta
                avatar={
                  <Avatar src="https://clipart-library.com/images/Lcd5ndBri.jpg" />
                }
                title="Water Level"
                description="This gives approximate water level in the tank."
              />
              {isTankRegistered && (
                <div className="water-level-boundary">
                  <label>Set Water Level Boundary:</label>
                  <Input
                    type="number"
                    value={waterLevelBoundary}
                    onChange={(e) => setWaterLevelBoundary(e.target.value)}
                  />
                  <Button
                    type="primary"
                    onClick={handleWaterLevelBoundarySubmit}
                    className="submit-button"
                  >
                    Set Boundary
                  </Button>
                </div>
              )}
            </Card>
          </>
        ) : (
          <Form className="card-monitoring">
            <Form.Item
              label="Tank ID"
              name="tankId"
              rules={[{ required: true, message: "Please enter Tank ID!" }]}
              className="form-item"
            >
              <Input
                className="input-field"
                value={tankId}
                onChange={handleTankIdChange}
              />
            </Form.Item>

            <Form.Item className="form-item">
              <Button
                type="primary"
                onClick={handleRegistration}
                className="submit-button"
              >
                Register Tank
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </Layout>
  );
}
