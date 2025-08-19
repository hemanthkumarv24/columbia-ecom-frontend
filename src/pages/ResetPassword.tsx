import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store.ts';
import { setToken } from '../store/authSlice.ts'; 
import 'antd/dist/reset.css'; 
import {
  Form,
  Input,
  Button,
  Typography,
  message as AntMessage,
  Card,
  Row,
  Col,
} from 'antd';
import {
  MailOutlined,
  LockOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


const apiUrl = import.meta.env.VITE_API_URL;

const { Title, Text } = Typography;


const ResetPassword: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate= useNavigate();
  
  
        console.log(token)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/ResetPassword`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, passwordHash, newPassword }),
      });
      console.log(token);
      const data = await response.json();
      if (response.ok) {
        AntMessage.success('Password reset successful!');
        dispatch(setToken(data.token));


        navigate('/home')

        
      } else {
        AntMessage.error(data.error || 'Password reset failed.');
      }
    } catch {
      AntMessage.error('An error occurred.');

    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Col xs={22} sm={16} md={12} lg={8}>
        <Card
          bordered={false}
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '12px' }}
        >
          <Title level={3} style={{ textAlign: 'center', marginBottom: '1rem' }}>
            🔁 Reset Your Password
          </Title>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Current Password Hash"
              name="passwordHash"
              rules={[{ required: true, message: 'Please enter your current password hash' }]}
            >
              <Input.Password
                prefix={<KeyOutlined />}
                placeholder="Current password hash"
                value={passwordHash}
                onChange={(e) => setPasswordHash(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[{ required: true, message: 'Please enter your new password' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                🔒 Reset Password
              </Button>
            </Form.Item>
          </Form>
          <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: '1rem' }}>
            Make sure your new password is strong and secure.
          </Text>
        </Card>
      </Col>
    </Row>

  );
};

export default ResetPassword;