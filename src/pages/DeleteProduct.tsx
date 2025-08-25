import React, { useEffect, useState } from 'react';
import { Input, List, Button, message, Popconfirm } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

const { Search } = Input;

interface Product {
  productID: number;
  name: string;
  description: string;
  price: number;
}

const DeleteProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const token = useSelector((state: RootState) => state.auth.token);
  const apiUrl = import.meta.env.VITE_PRODUCTS_API_URL;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/Products`);
      setProducts(response.data.$values);
      setFilteredProducts(response.data.$values);
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

  const onSearch = (value: string) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/Products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      message.error('Failed to delete product');
      console.log(error);

    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Delete Product</h2>
      <Search
        placeholder="Search product by name"
        onSearch={onSearch}
        enterButton
        style={{ marginBottom: '20px', maxWidth: '400px' }}
      />
      <List
  loading={loading}
  itemLayout="horizontal"
  dataSource={Array.isArray(filteredProducts) ? filteredProducts : []}
  renderItem={item => (
    <List.Item
      actions={[
        <Popconfirm
          title="Are you sure to delete this product?"
          onConfirm={() => deleteProduct(item.productID)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      ]}
    >
      <List.Item.Meta
        title={item.name}
        description={`${item.description} - ₹${item.price}`}
      />
    </List.Item>
  )}
/>
    </div>
  );
};

export default DeleteProduct;
