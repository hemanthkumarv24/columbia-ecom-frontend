import { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Avatar,
  Typography,
  Input,
  Button,
  Form,
  Upload,
  message,
  Select,
  Spin,
} from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import type { Rule } from "antd/es/form";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import store from "../store/store";

const { Text } = Typography;
const { Option } = Select;
const apiUrl = import.meta.env.VITE_API_URL;

type JwtPayload = {
  email: string;
};

// Axios instance with interceptor
const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const ProfilePage = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [editingPhoto, setEditingPhoto] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasAddress, setHasAddress] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const initialProfile = {
    email: "",
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  };

  // Decode token to extract email
  useEffect(() => {
    if (!token) {
      message.warning("Please log in to access your profile");
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      setUserEmail(decoded.email);
    } catch (err) {
      message.error("Invalid token");
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch profile data
  useEffect(() => {
    if (!userEmail) return;

    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(`${apiUrl}/GetAddress`, {
          params: { email: userEmail },
        });
        form.setFieldsValue({ ...response.data, email: userEmail });
        setPhotoUrl(response.data.userPhoto || null);
        setHasAddress(true);
      } catch (error: any) {
        if (error.response?.status === 404) {
          setHasAddress(false);
        } else {
          message.error("Failed to load profile");
        }
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProfile();
  }, [userEmail, form]);

  // Handle photo upload
  const handleUpload = ({ file }: any) => {
    const previewUrl = URL.createObjectURL(file);
    setPhotoUrl(previewUrl);
    setUploadedFile(file);
    setEditingPhoto(false);
  };

  // Save profile data
  const handleSave = async () => {
    try {
      setLoading(true);
      const updatedData = await form.validateFields();

      const formData = new FormData();
      Object.entries(updatedData).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      if (uploadedFile) {
        formData.append("UserPhoto", uploadedFile);
      }

      const endpoint = hasAddress ? `${apiUrl}/UpdateAddress` : `${apiUrl}/UserDetails`;
      const method = hasAddress ? "patch" : "post";

      await axiosInstance[method](endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success(hasAddress ? "Profile updated!" : "Profile created!");
      setIsEditing(false);
      setHasAddress(true);
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <Spin
        tip="Loading profile..."
        style={{ marginTop: 100, display: "block", textAlign: "center" }}
      />
    );
  }

  return (
    <Card title="Profile" style={{ maxWidth: 900, margin: "auto", marginTop: 40 }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <div style={{ textAlign: "center" }}>
            <Avatar
              size={150}
              src={photoUrl}
              icon={!photoUrl && <UserOutlined />}
              style={{ marginBottom: 16 }}
            />
            <div>
              {editingPhoto ? (
                <Upload showUploadList={false} customRequest={handleUpload}>
                  <Button icon={<UploadOutlined />}>Choose File</Button>
                </Upload>
              ) : (
                <Button onClick={() => setEditingPhoto(true)}>Edit Photo</Button>
              )}
            </div>
          </div>
        </Col>

        <Col xs={24} md={16}>
          <Form
            form={form}
            initialValues={{ ...initialProfile, email: userEmail }}
            layout="horizontal"
            labelAlign="left"
            labelCol={{ flex: "120px" }}
            wrapperCol={{ flex: "auto" }}
            style={{ marginTop: 8 }}
          >
            {Object.entries(initialProfile).map(([key]) => {
              const isEmail = key === "email";
              const rules: Rule[] = isEmail
                ? [{ type: "email", message: "Enter a valid email" }]
                : [];

              return (
                <Form.Item
                  key={key}
                  label={key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                  name={key}
                  rules={rules}
                  style={{ marginBottom: 12 }}
                >
                  {isEditing ? (
                    key === "country" ? (
                      <Select>
                        <Option value="India">India</Option>
                        <Option value="USA">USA</Option>
                        <Option value="UK">UK</Option>
                      </Select>
                    ) : (
                      <Input />
                    )
                  ) : (
                    <Text>{form.getFieldValue(key)}</Text>
                  )}
                </Form.Item>
              );
            })}
          </Form>

          <div style={{ textAlign: "right" }}>
            {isEditing ? (
              <>
                <Button type="primary" onClick={handleSave} loading={loading}>
                  Save
                </Button>
                <Button onClick={() => setIsEditing(false)} style={{ marginLeft: 8 }}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ProfilePage;