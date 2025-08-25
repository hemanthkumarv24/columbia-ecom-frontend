import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button, Typography, Statistic, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

const { Title } = Typography;

interface Product {
  productID: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const token = useSelector((state: RootState) => state.auth.token);
  const apiUrl = import.meta.env.VITE_PRODUCTS_API_URL;
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/Products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.$values);
    } catch (error) {
      message.error('Failed to fetch products');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <Title level={2}>Admin Dashboard</Title>

      <Row gutter={[16, 16]} style={{ marginBottom: '2rem' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Products"
              value={products.length}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card title="View All Products">
            <Button type="primary" block onClick={() => navigate('/viewproducts')}>
              View Products
            </Button>
          </Card>
        </Col>

        <Col span={6}>
          <Card title="Create New Product">
            <Button type="primary" block onClick={() => navigate('/createproduct')}>
              Create Product
            </Button>
          </Card>
        </Col>

        <Col span={6}>
          <Card title="Delete Product">
            <Button type="primary" danger block onClick={() => navigate('/deleteproduct')}>
              Delete Product
            </Button>
          </Card>
        </Col>

        {/* <Col span={6}>
          <Card title="Update Product">
            <Button type="default" block onClick={() => navigate('/update-product')}>
              Update Product
            </Button>
          </Card>
        </Col> */}
      </Row>
    </div>
  );
};

export default AdminPage;
