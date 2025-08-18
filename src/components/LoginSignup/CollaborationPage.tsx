import React from 'react';
import { Layout } from 'antd';
import CollabNavbar from './CollabNavbar';
import CompanyCard from './CompanyCard';
import AuthCard from './ColumbiaAuthPage';
import './CollaborationPage.css';


const { Content } = Layout;

const CollaborationPage: React.FC = () => {
  return (
    <Layout className="collab-page">
      <CollabNavbar />
      <Content className="collab-content">
        <section className="company-section columbia">
          <CompanyCard
            name="Columbia Sportswear"
            description="Outdoor gear innovator since 1938, helping adventurers stay warm, dry, and protected."
          />
        </section>
        <section className="company-section nike">
          <CompanyCard
            name="Nike"
            description="Global leader in athletic footwear and apparel, empowering athletes to push their limits."
          />
        </section>
        <section className="company-section patagonia">
          <CompanyCard
            name="Patagonia"
            description="Eco-conscious outdoor brand committed to sustainability and environmental activism."
          />
        </section>
        <section className="auth-section">
          <AuthCard />
        </section>
      </Content>
    </Layout>
  );
};

export default CollaborationPage;

