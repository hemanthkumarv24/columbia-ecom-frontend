import  { useEffect, useState } from 'react';
import { Card, Typography, Row, Col, Spin, message, Button } from 'antd';
import axios from 'axios';
import 'antd/dist/reset.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

interface User {
  username: string;
  email: string;
}


const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://localhost:7028/api/User/GetUsers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch  {
        message.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  return (
    <div className="user-container">
      <Title level={2} style={{ textAlign: 'center' }}>User Directory</Title>
      {loading ? (
        <div className="spinner">
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {users.map((emp, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card title={emp.username} bordered={false}>
                <Text>Email: {emp.email}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <Button><Link to="/ResetPassword" style={linkStyle}>Reset password</Link></Button>
    </div>
  );
};
const linkStyle = {
  color: '#000',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '16px',
};

export default UserList;