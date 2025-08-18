import React from 'react';
import { Layout, Menu } from 'antd';
import './CollabNavbar.css';

const { Header } = Layout;

const CollabNavbar: React.FC = () => {
  return (
    <Header className="collab-navbar">
      <div className="logo">Base Company Portal</div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Collaborations</Menu.Item>
        <Menu.Item key="3">Support</Menu.Item>
      </Menu>
    </Header>
  );
};

export default CollabNavbar;
