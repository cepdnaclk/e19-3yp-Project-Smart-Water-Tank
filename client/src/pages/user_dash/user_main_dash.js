import React, { useEffect, useState } from "react";
import AuthServices from "../../services/AuthServices";
import Layout from "../../components/layout";
import { useSelector } from "react-redux";
import { Card, Statistic, Row, Col, Alert, Divider } from "antd";
import "./styles/dash.css";

export default function UserMaindash() {
  const [tankData, setTankData] = useState(null);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AuthServices.getData(); // Adjust this function based on your actual API

        if (response && response.data) {
          setTankData(response.data);
        } else {
          console.error("Invalid API response:", response);
          // Handle the case where the API response is not as expected
        }
      } catch (error) {
        console.error("Error fetching tank data:", error);
        // Handle the error case
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <h1 className="page-title">Dashboard</h1>

      {user?.isAdministrator ? (
        <Row gutter={16}>
          <Col span={24}>
            <Card>
              <h2>Admin Dashboard Content</h2>
              {/* Add graphical representation of all users and admins */}
              {/* Example: Display total number of users and admins */}
              <Statistic
                title="Total Users"
                value={tankData?.totalUsers || 0}
              />
              <Statistic
                title="Total Admins"
                value={tankData?.totalAdmins || 0}
              />
              {/* Add more statistics or graphs as needed */}
            </Card>
          </Col>
        </Row>
      ) : (
        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <h2>Welcome to the Smart Water Tank App!</h2>
              <p>
                Thank you for using our app to monitor your water tank. Below
                are some guidelines to help you get started:
              </p>

              {/* Guideline Card 1 */}
              <Card>
                <h3>Monitor Device Status</h3>
                <p>
                  Check the status of your connected devices to ensure
                  everything is functioning properly.
                </p>
              </Card>

              {/* Guideline Card 2 */}
              <Card>
                <h3>Usage Tips</h3>
                <p>
                  Learn about water conservation and receive tips on how to
                  optimize your water usage. Explore the User Dashboard for an
                  overview of your water tank's health.
                  <ul>
                    <li>
                      Check the device status section to ensure all components
                      are functioning as expected.
                    </li>
                    <li>
                      Stay informed with alerts and take appropriate actions
                      when necessary.
                    </li>
                  </ul>
                </p>
              </Card>

              {/* Add more guideline cards as needed */}
            </Card>
          </Col>

          <Col span={12}>
            <Card>
              {/* Display Tank Data Statistics */}
              <h2>Tank Data Statistics</h2>
              {tankData ? (
                <>
                  <Statistic
                    title="Water Level"
                    value={tankData.waterLevel}
                    suffix="%"
                  />
                  <Statistic
                    title="Temperature"
                    value={tankData.temperature}
                    suffix="°C"
                  />
                  {/* Add more statistics as needed */}
                </>
              ) : (
                <Alert message="All devices are working properly.." type="info" />
              )}
            </Card>

            <Divider />

            <Card>
              {/* Additional Information Section */}
              <h2>Additional Information</h2>
              <p></p>
              {/* Add more content as needed */}
            </Card>
          </Col>
        </Row>
      )}
    </Layout>
  );
}
