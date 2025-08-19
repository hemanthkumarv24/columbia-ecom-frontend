import "./NavBar.css";
import ColumbiaLogo from "../../assets/CSC_Logo.webp";
import { Row, Col, Typography, Space, Input } from "antd";
import { useNavigate } from "react-router-dom";
import {
  EnvironmentOutlined,
  ShoppingOutlined,
  CustomerServiceOutlined,
  CompassOutlined,
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { Text } = Typography;

const NavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { icon: <EnvironmentOutlined />, label: "Store Locator", path: "/store-locator" },
    { icon: <ShoppingOutlined />, label: "Bulk Order", path: "/bulk-order" },
    { icon: <CustomerServiceOutlined />, label: "Support", path: "/support" },
    { icon: <CompassOutlined />, label: "Pincode", path: "/pincode" },
    { icon: <UserOutlined />, label: "Account", path: "/account" },
    { icon: <HeartOutlined />, label: "Wishlist", path: "/wishlist" },
    { icon: <ShoppingCartOutlined />, label: "Cart", path: "/cart" },
  ];

  return (
    <header className="navbar">
      <div className="top-nav">
        <img src={ColumbiaLogo} alt="Columbia Logo" className="logo" />

        <div className="search-bar">
          <Input.Search
            placeholder="Search for Products"
            enterButton
            onSearch={(value) => console.log("Search:", value)}
          />
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <MenuOutlined />
        </div>
      

      <Row gutter={[16, 16]} className={`nav-icons ${menuOpen ? "open" : ""}`}>
        {navItems.map(({ icon, label, path }) => (
          <Col key={label} onClick={() => navigate(path)} className="nav-icon-col">
            <Space direction="vertical" align="center" className="inner-icons">
              {icon}
              <Text>{label}</Text>
            </Space>
          </Col>
        ))}
      </Row>
</div>
      <nav className="category-menu">
        {[
          "Men",
          "Women",
          "Kids",
          "Camping + Safari",
          "Hiking + Trekking",
          "Winter Sports",
          "Water Sports",
        ].map((category) => (
          <a key={category} href="#">
            {category}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default NavBar;