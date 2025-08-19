import  { useState } from 'react';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import 'antd/dist/reset.css';
import '../components/login/Login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../store/authSlice';

const apiUrl = import.meta.env.VITE_API_URL;

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const navigate = useNavigate();

    const dispatch = useDispatch();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/Login`, {
        email,
        PasswordHash: passwordHash,
      });

      const jwt = response.data.token; // adjust if needed
      dispatch(setToken(jwt));
      message.success('Login successful!');
      navigate('/home');
    } catch (error: any) {
      message.error(error?.response?.data?.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
        <Form
          name="login_form"
          layout="vertical"
         
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              value={passwordHash}
              onChange={(e) => setPasswordHash(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading} onClick={handleSubmit}>
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;