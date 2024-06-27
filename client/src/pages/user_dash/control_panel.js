import React, { useState } from "react";
import Layout from "../../components/layout";
import axios from "axios";
import { useSelector } from "react-redux";


import {
  Button,
  Switch,
  Card,
  Row,
  Col,
  InputNumber,
  notification,
} from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import "./styles/control_panel.css";
// const url = "http://localhost:4000";
// const url = "http://ec2-54-234-133-143.compute-1.amazonaws.com:4000";

export default function ControlPanel() {
  const [outputValve, setOutputValve] = useState(false);
  const [inputValve, setInputValve] = useState(false);
  const [motorPump, setMotorPump] = useState(false);

  const [waterLevelSensor, setWaterLevelSensor] = useState(true);
  const [inletValve, setInletValve] = useState(true);
  const [outletValve, setOutletValve] = useState(true);
  const { user } = useSelector((state) => state.user);



  const handleOutputValveChange = async () => {
    setOutputValve(!outputValve);
   

    try {
      const response = await axios.post(`/api/user/hardware/send-input-valve`, {
        userId: user?._id,
        string: `outputValve${!outputValve}`
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputValveChange = async() => {
    setInputValve(!inputValve);

    try {
      const response = await axios.post(`/api/user/hardware/send-output-valve`, {
        userId: user?._id,
        string: `inputValve${!inputValve}`
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleMotorPumpChange = async() => {
    setMotorPump(!motorPump);
   
    try {
      const response = await axios.post(`/api/user/hardware/send-motor-pump`, {
        userId: user?._id,
        string: `motorPump${!motorPump}`
      });
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Layout>
      <h1 className="page-title">Control Panel</h1>

      <div className="guide-section">
        <h2>How to Use</h2>
        <p>
          This control panel allows you to manage the valves and motor pump of
          your smart water tank. Simply toggle the switches to turn the
          corresponding components on or off.
        </p>
        <p>
          - The <strong>Output Valve</strong> controls the water flow out of the
          tank.
        </p>
        <p>
          - The <strong>Input Valve</strong> controls the water flow into the
          tank.
        </p>
        <p>
          - The <strong>Motor Pump</strong> powers the water pump for internal
          circulation.
        </p>
        <p>
          The status of each component is displayed with icons and text below
          the switches.
        </p>
      </div>

      <div className="card-container">
        <Card className="card">
          <Row gutter={16} className="switch-container">
            <Col span={24}>
              <h2 className="switch-label">Output Valve</h2>
              <Switch
                checked={outputValve}
                onChange={handleOutputValveChange}
              />
              <div className="status-icon">
                {outputValve ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <CloseCircleTwoTone twoToneColor="#eb2f96" />
                )}
                <span className="status-text">
                  {outputValve ? "On" : "Off"}
                </span>
              </div>
            </Col>
            <Col span={24}>
              <h2 className="switch-label">Input Valve</h2>
              <Switch checked={inputValve} onChange={handleInputValveChange} />
              <div className="status-icon">
                {inputValve ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <CloseCircleTwoTone twoToneColor="#eb2f96" />
                )}
                <span className="status-text">{inputValve ? "On" : "Off"}</span>
              </div>
            </Col>
          </Row>
        </Card>

        <Card className="card">
          <Row gutter={16} className="switch-container">
            <Col span={24}>
              <h2 className="switch-label">Motor Pump</h2>
              <Switch checked={motorPump} onChange={handleMotorPumpChange} />
              <div className="status-icon">
                {motorPump ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <CloseCircleTwoTone twoToneColor="#eb2f96" />
                )}
                <span className="status-text">{motorPump ? "On" : "Off"}</span>
              </div>
            </Col>
          </Row>
        </Card>
      </div>

     
    </Layout>
  );
}
