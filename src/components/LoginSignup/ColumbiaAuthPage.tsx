import React from 'react';
import { Row, Col, Card, Tabs, Form, Input, Button, Typography } from 'antd';
import type { FormProps } from 'antd';
import './ColumbiaAuthPage.css';

const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

const ColumbiaAuthPage: React.FC = () => {
  const handleLogin: FormProps<LoginFormValues>['onFinish'] = (values) => {
    console.log('Login:', values);
  };

  const handleRegister: FormProps<RegisterFormValues>['onFinish'] = (values) => {
    console.log('Register:', values);
  };

  return (
    // <div className="columbia-auth-wrapper">
      <div className="auth-container">
        <Row className="auth-row" gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <Card className="auth-card" bordered={false}>
              <Title level={3} className="auth-title">Welcome to Columbia Sportswear</Title>
              <Tabs defaultActiveKey="login" centered>
                <TabPane tab="Login" key="login">
                  <Form layout="vertical" onFinish={handleLogin}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                    >
                      <Input placeholder="you@example.com" />
                    </Form.Item>
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[{ required: true, message: 'Please enter your password' }]}
                    >
                      <Input.Password placeholder="••••••••" />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" block>
                        Login
                      </Button>
                    </Form.Item>
                  </Form>
                </TabPane>
                <TabPane tab="Register" key="register">
                  <Form layout="vertical" onFinish={handleRegister}>
                    <Form.Item
                      label="Full Name"
                      name="name"
                      rules={[{ required: true, message: 'Please enter your name' }]}
                    >
                      <Input placeholder="John Doe" />
                    </Form.Item>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                    >
                      <Input placeholder="you@example.com" />
                    </Form.Item>
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[{ required: true, message: 'Please create a password' }]}
                    >
                      <Input.Password placeholder="Create a password" />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" block>
                        Register
                      </Button>
                    </Form.Item>
                  </Form>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card className="info-card" bordered={false}>
              <Title level={3}>About Columbia Sportswear</Title>
              <Paragraph>
                Columbia Sportswear is a global leader in outdoor apparel and gear. Founded in 1938 and headquartered in Portland, Oregon, Columbia has been innovating to keep people warm, dry, cool, and protected no matter the conditions.
              </Paragraph>
              <Paragraph>
                Whether you're hiking rugged trails, skiing snowy slopes, or exploring the urban outdoors, Columbia's gear is designed to help you embrace the adventure with confidence and comfort.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    // </div>
  );
};

export default ColumbiaAuthPage;
