import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

interface CompanyCardProps {
  name: string;
  description: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ name, description }) => (
  <Card className="company-card" bordered={false}>
    <Title level={4}>{name}</Title>
    <Paragraph>{description}</Paragraph>
  </Card>
);

export default CompanyCard;
