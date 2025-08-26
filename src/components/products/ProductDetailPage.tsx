import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Carousel, Button, Spin, message } from 'antd';
import axios from 'axios';
import DashboardLayout from '../common/DashboardLayout';
import { CartContext } from '../../context/CartContext';
import './ProductDetailPage.css';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';


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
const cartApiUrl = import.meta.env.VITE_CART_API_URL;
const userdetails = import.meta.env.VITE_API_URL;
//const userId = 1; // Replace with dynamic user ID

const ProductDetailPage = () => {
  
  const userid = useSelector((state: RootState) => state.auth.userID);
  console.log(userid);
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { refreshCartCount } = useContext(CartContext);

  useEffect(() => {
    axios.get(`${apiUrl}/Products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        message.error('Failed to load product details');
        setLoading(false);
      });

  }, [id]);

  const handleAddToCart = async () => {
    if (!product || !userid) {
      message.warning('Please wait, user not loaded.');
      return;
    }
    try {
      await axios.post(`${cartApiUrl}/Cart/add`, {
        productId: product.productID,
        userId: userid,
        quantity: 1
      });
      message.success('Product added to cart');
      refreshCartCount(); 
    } catch (error) {
      message.error('Failed to add product to cart');
    }
  };

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
          <Button
            type="primary"
            style={{ marginRight: '1rem' }}
            onClick={handleAddToCart}
            disabled={!userid}
          >
            Add to Cart
          </Button>
          <Button type="default">Buy Now</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProductDetailPage;
