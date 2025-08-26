import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import { Button, List, InputNumber, Image, Typography, message } from 'antd';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import NavBar from '../components/navbar/NavBar';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const CartPage: React.FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userID);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const { refreshCartCount } = useContext(CartContext);
  const cartApiUrl = import.meta.env.VITE_CART_API_URL;
  const ApiUrl = import.meta.env.VITE_PRODUCTS_API_URL;

  const navigate = useNavigate();
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const fetchCartItems = async () => {
    try {
      const cartResponse = await axios.get(`${cartApiUrl}/Cart/items/${userId}`);
      const cartData = cartResponse.data;

      const enrichedCartItems = await Promise.all(
        cartData.map(async (item: any) => {
          try {
            const productResponse = await axios.get(`${ApiUrl}/Products/${item.productId}`);
            return {
              ...item,
              ...productResponse.data, // Merge product details
            };
          } catch (productError) {
            console.error(`Failed to fetch product ${item.productId}`, productError);
            return item; // Fallback to original item
          }
        })
      );

      setCartItems(enrichedCartItems);
    } catch (error) {
      message.error('Failed to load cart items');
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (!userId) return;
    setLoadingId(productId);
    try {
      await axios.put(`${cartApiUrl}/Cart/update/${userId}`, {
        productId,
        quantity,
      });
      await fetchCartItems();
      refreshCartCount();
    } catch {
      message.error('Failed to update quantity');
    } finally {
      setLoadingId(null);
    }
  };

  const removeItem = async (productId: number) => {
    if (!userId) return;
    setLoadingId(productId);
    try {
      await axios.delete(`${cartApiUrl}/Cart/remove/${userId}/${productId}`);
      await fetchCartItems();
      refreshCartCount();
    } catch {
      message.error('Failed to remove item');
    } finally {
      setLoadingId(null);
    }
  };

  useEffect(() => {
    if (userId) fetchCartItems();
  }, [userId]);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const getImageUrl = (item: any): string => {
    const images = item.productImages?.$values;
    if (Array.isArray(images) && images.length > 0) {
      return images[0].imageUrl;
    }
    return 'https://via.placeholder.com/80?text=No+Image';
  };

  const handleOptimisticQuantity = (productId: number, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );
    updateQuantity(productId, newQuantity);
  };

  return (
    <>
      <NavBar />
      <div style={{ padding: '2rem' }}>
        <Title level={2}>Your Cart</Title>
        <List
          itemLayout="horizontal"
          dataSource={cartItems}
          renderItem={(item) => (
            <List.Item
              actions={[
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Button
                    onClick={() =>
                      handleOptimisticQuantity(item.productId, Math.max(1, (item.quantity || 1) - 1))
                    }
                    size="small"
                  >
                    -
                  </Button>
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) =>
                      handleOptimisticQuantity(item.productId, value || 1)
                    }
                    style={{ width: 60 }}
                  />
                  <Button
                    onClick={() =>
                      handleOptimisticQuantity(item.productId, (item.quantity || 1) + 1)
                    }
                    size="small"
                  >
                    +
                  </Button>
                </div>,
                <Button
                  danger
                  onClick={() => removeItem(item.productId)}
                  disabled={loadingId === item.productId}
                >
                  Remove
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Image
                    width={80}
                    height={80}
                    src={getImageUrl(item)}
                    fallback="https://via.placeholder.com/80?text=No+Image"
                    style={{ objectFit: 'cover', borderRadius: 4 }}
                  />
                }
                title={item.productName}
                description={`Price: ₹${item.price}`}
                style={{ paddingRight: 16 }}
              />
            </List.Item>
          )}
        />
        <div style={{ marginTop: 32, textAlign: 'right' }}>
          <Title level={4}>Total: ₹{total}</Title>
          <Button type="primary" size="large" disabled={cartItems.length === 0}>
            Checkout
          </Button>
        </div>
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <Button type="default" onClick={() => navigate('/home')}>
            Back to Products
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
