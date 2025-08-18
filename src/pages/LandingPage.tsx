import React from 'react';
import { Layout } from 'antd';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturedCategory from '../components/FeaturedCategory';
import CollectionsBanner from '../components/CollectionsBanner';
import Footer from '../components/Footer';

const { Header, Content, Footer: AntFooter } = Layout;

const LandingPage: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh', background: '#fff', margin: 0, padding: 0 }}>
      <Header style={{ padding: 0 }}>
        <Navbar />
      </Header>
      <Content style={{ overflow: 'auto', padding: 0, margin: 0 }}>
        <HeroSection />
        <FeaturedCategory />
        <CollectionsBanner />
      </Content>
      <AntFooter style={{ padding: 0 }}>
        <Footer />
      </AntFooter>
    </Layout>
  );
};

export default LandingPage;