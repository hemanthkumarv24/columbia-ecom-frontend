import React, { useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  Space,
  Typography,
  Divider,
  message,
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

const { Title } = Typography;

interface ProductUpdateFormValues {
  name: string;
  description?: string;
  price: number;
  imageUrls?: string[];
  images?: UploadFile[];
}

const ProductForm: React.FC = () => {
  const [form] = Form.useForm();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleAddImageUrl = () => {
    const url = form.getFieldValue('newImageUrl');
    if (url && !imageUrls.includes(url)) {
      setImageUrls([...imageUrls, url]);
      form.setFieldsValue({ newImageUrl: '' });
    }
  };

  const handleRemoveImageUrl = (url: string) => {
    setImageUrls(imageUrls.filter(u => u !== url));
  };
const apiUrl = import.meta.env.VITE_PRODUCTS_API_URL;

const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
console.log(token)
const handleSubmit = async (values: ProductUpdateFormValues) => {
  const formData = new FormData();

  formData.append('name', values.name);
  formData.append('description', values.description || '');
  formData.append('price', values.price.toString());

  fileList.forEach((file) => {
    if (file.originFileObj) {
      formData.append('images', file.originFileObj);
    }
  });

  imageUrls.forEach((url) => {
    formData.append('imageUrls', url);
  });

  try {
    const response = await axios.post(`${apiUrl}/Products/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,

      },
    });

    const createdProduct = response.data;
    message.success('Product created successfully!');
    form.resetFields();
    setImageUrls([]);
    setFileList([]);

    // Redirect to product detail page
    navigate(`/product/${createdProduct.productID}`);
  } catch (error: unknown) {
    message.error('Failed to create product');
    console.error(error);
  }
};



  return (
    <div style={styles.container}>
      <Title level={3}>Create Product</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={styles.form}
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: 'Please enter product name' }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} placeholder="Enter product description" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, type: 'number', min: 0 }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="Enter price"
            prefix="₹"
          />
        </Form.Item>

        <Divider />

        <Title level={5}>Upload Images</Title>
        <Upload
          multiple
          listType="picture"
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          beforeUpload={() => false} // Prevent auto upload
        >
          <Button icon={<UploadOutlined />}>Select Images</Button>
        </Upload>

        <Divider />

        <Title level={5}>Add Image URLs</Title>
        <Space>
          <Form.Item name="newImageUrl" noStyle>
            <Input placeholder="Paste image URL" style={{ width: 300 }} />
          </Form.Item>
          <Button icon={<PlusOutlined />} onClick={handleAddImageUrl}>
            Add URL
          </Button>
        </Space>

        <div style={styles.imagePreview}>
          {imageUrls.map((url, index) => (
            <div key={index} style={styles.imageItem}>
              <img src={url} alt={`preview-${index}`} style={styles.image} />
              <Button
                type="link"
                danger
                onClick={() => handleRemoveImageUrl(url)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>

        <Divider />

        <Form.Item>
          <Button type="primary" htmlType="submit" style={styles.submitButton}>
            Create Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 800,
    margin: '0 auto',
    padding: '2rem',
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  form: {
    marginTop: '1rem',
  },
  imagePreview: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    marginTop: '1rem',
  },
  imageItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    objectFit: 'cover',
    borderRadius: 4,
    border: '1px solid #ddd',
  },
  submitButton: {
    width: '100%',
  },
};

export default ProductForm;
