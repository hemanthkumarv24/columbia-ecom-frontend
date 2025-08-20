// src/pages/ProductDetailPage.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Carousel, Button, Spin, message } from 'antd';
import axios from 'axios';
import DashboardLayout from '../common/DashboardLayout';
import './ProductDetailPage.css'; // or .module.css if using CSS modules

// import { LeftOutlined, RightOutlined } from '@ant-design/icons';


const { Title, Paragraph } = Typography;

interface ProductImage {
  imageUrl: string;
  isPrimary: boolean;
}

interface Product {
  productID: number;
  name: string;
  description: string;
  price: number;
  productImages?: {
    $values: ProductImage[];
  };
}

const apiUrl = import.meta.env.VITE_PRODUCTS_API_URL;

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  console.log(id)
  useEffect(() => {
    axios.get(`${apiUrl}/Products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        message.error('Failed to load product details', error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading || !product) return <Spin size="large" style={{ margin: '2rem' }} />;

  return (
    <DashboardLayout>

    <div style={{ padding: '2rem' }}>
      <Title level={2}>{product.name}</Title>
      
        <Carousel autoplay arrows>
  {product.productImages?.$values.map((img, index) => (
    <div key={index}>
      <img
        src={img.imageUrl}
        alt={`Product Image ${index + 1}`}
        style={{ width: '100%', height: '400px', objectFit: 'contain' }}
      />
    </div>
  ))}
</Carousel>


      <Paragraph style={{ marginTop: '1rem' }}>{product.description}</Paragraph>
      <Title level={3}>₹{product.price}</Title>
      <div style={{ marginTop: '1rem' }}>
        <Button type="primary" style={{ marginRight: '1rem' }}>Add to Cart</Button>
        <Button type="default">Buy Now</Button>
      </div>
    </div>
    </DashboardLayout>

  );
};

export default ProductDetailPage;
