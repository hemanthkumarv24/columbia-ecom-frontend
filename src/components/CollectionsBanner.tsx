import React from 'react';
import { Button } from 'antd';
import { motion } from 'framer-motion';

const CollectionsBanner: React.FC = () => {
  return (
    <div style={{
      background: '#000',
      color: '#fff',
      padding: '80px 50px',
      textAlign: 'center',
    }}>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ fontSize: '2.5rem', marginBottom: '20px' }}
      >
        Summer Drop 2025
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ fontSize: '1.2rem', marginBottom: '30px' }}
      >
        Discover the latest in performance and style.
      </motion.p>
      <Button type="primary" size="large">Explore Collection</Button>
    </div>
  );
};

export default CollectionsBanner;