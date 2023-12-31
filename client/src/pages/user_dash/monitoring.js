// Monitoring.js
import React, { useState } from "react";
import toast from "react-hot-toast";
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
import "./styles/monitoring.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Monitoring() {
  const { Meta } = Card;
  const [isTankRegistered, setIsTankRegistered] = useState(false);
  const [waterLevel, setWaterLevel] = useState();
  const [previousMonthUsage, setPreviousMonthUsage] = useState(75);
  const [dailyWaterUsage, setDailyWaterUsage] = useState(
    generatePast30DaysData()
  );
  const [tankId, setTankId] = useState("");
  const { user } = useSelector((state) => state.user);

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

  const isTankRegistere = async () => {


    try {
      const response = await axios.get("/api/user/hardware/tank-exits", {
        params: {
          userId: user?._id,
        },
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
        "/api/user/hardware/tank-registration",
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

    try{

      const response = await axios.get(
        "/api/user/hardware/receive-water-level", {
          params: {
            userId: user?._id,
          },
        }
      );

      console.log("water level:", response.data.data.waterLevel);

      setWaterLevel(response.data.data.waterLevel);

      console.log("Registration successful:", response.data.success);

    }catch(error){

      console.error("Registration failed:", error);
      throw error;

    }


  }

  useEffect(() => {
    isTankRegistere();

    try{
      if (isTankRegistered) {

        getWaterLevel();
        
      }
    }catch(error){
      console.error("Registration failed:", error);
      throw error;
    }
  });

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
                textColor="#000"
              />
              <Meta
                avatar={
                  <Avatar src="https://clipart-library.com/images/Lcd5ndBri.jpg" />
                }
                title="Water Level"
                description="This gives approximate water level in the tank."
              />
            </Card>

            <Card className="card-monitoring">
              <Meta
                avatar={
                  <Avatar src="https://clipart-library.com/images/Lcd5ndBri.jpg" />
                }
                title="Previous Month Usage"
                description="This gives the usage details for the previous month. Click below to see day-by-day usage."
              />

              <div style={{ marginTop: "16px" }}>
                <h3>Total Monthly Usage</h3>
                <Progress percent={previousMonthUsage} status="active" />
              </div>
            </Card>

            <Row gutter={16}>
              <Col span={24}>
                <Card className="card-monitoring" style={{ width: "1000px" }}>
                  <Table
                    dataSource={dailyWaterUsage}
                    columns={columns}
                    pagination={false}
                    scroll={{ y: 200 }}
                  />
                </Card>
              </Col>
            </Row>
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
