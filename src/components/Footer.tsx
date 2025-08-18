import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  return (
    <AntFooter style={{ textAlign: 'center', background: '#000', color: '#fff' }}>
      ©2025 Columbia Sportswear · Follow us on Instagram · Privacy Policy · Terms
    </AntFooter>
  );
};

export default Footer;