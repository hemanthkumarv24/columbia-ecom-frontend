// src/pages/ProductPage.tsx
import { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Spin, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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


const ProductPage = ({userid}:any) => {
console.log(userid)
    
const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get(`${apiUrl}/Products`) 
      .then(response => {
        setProducts(response.data.$values);
        setLoading(false);
      })
      .catch(error => {
        message.error(error.message);
        setLoading(false);
      });
  }, []);
  console.log(products)

const handleProductClick = (productID: number) => {
  navigate(`/product/${productID}`);

};

  
const getImageUrl = (product: Product): string => {
    const images = product.productImages?.$values;
    return images && images.length > 0 ? images[0].imageUrl : 'https://via.placeholder.com/200';
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Title level={2}>Welcome to Our Store</Title>
      <Paragraph>Browse our latest products below.</Paragraph>

      {loading ? (
        <Spin size="large" />
      ) : (
        
    <Row gutter={[24, 24]}>
          {products.map(product => (
            <Col key={product.productID} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                onClick={() => handleProductClick(product.productID)}
                cover={
                  <img
                    alt={product.name}
                    src={getImageUrl(product)}
                    style={{ height: 200, objectFit: 'cover' }}
                  />
                }
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <>
                      <Paragraph ellipsis={{ rows: 2 }}>{product.description}</Paragraph>
                      <Title level={5}>₹{product.price}</Title>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}

    </div>
  );
};

export default ProductPage;
