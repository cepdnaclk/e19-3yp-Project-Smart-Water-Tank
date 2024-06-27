import React, { useState } from 'react';
import Layout from '../../components/layout';
import { Card, Form, Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import "./styles/profile.css";

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);

  const { user } = useSelector((state) => state.user);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateUser = async (values) => {
    // Implement the logic to update user details on the server
    console.log('Updating user details:', values);
    // Example: You can use axios.post() to update the user details
    try {
      // Replace the following line with your actual update logic
      // const response = await axios.post(`/api/user/update/${user?._id}`, values);
      console.log('User details updated successfully:', values);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user details:', error);
    }
  };

  return (
    <Layout>
      <h1 className="page-title">User Profile</h1>
      <Card title="User Details">
        <Form
          layout="vertical"
          onFinish={handleUpdateUser}
          initialValues={user} // Use user data directly from the Redux state
          disabled={!isEditing}
        >
          <Form.Item label="User Name" name="name">
            <Input disabled={!isEditing} />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input disabled={!isEditing} />
          </Form.Item>
          <Form.Item label="Tank ID" name="tankId">
            <Input disabled={!isEditing} />
          </Form.Item>
          {isEditing ? (
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Button onClick={handleEditToggle}>Cancel</Button>
            </Form.Item>
          ) : (
            <Button type="primary" onClick={handleEditToggle}>
              Edit
            </Button>
          )}
        </Form>
      </Card>
    </Layout>
  );
}
