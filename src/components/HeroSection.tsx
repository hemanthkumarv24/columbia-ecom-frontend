import React from 'react';
import { Button } from 'antd';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <div style={{
      backgroundImage: 'url(https://media.cntraveler.com/photos/57c703d7523900e805f2e386/16:9/w_2560%2Cc_limit/columbia-director-of-toughness-cr-courtesy.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      textAlign: 'center',
      width: '100%',
      padding: 0,
      margin: 0,

    }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold' , color:'#000' }}>Built for Movement</h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>
          Premium sportswear for every athlete.
        </p>
        <Button type="primary" size="large">Shop Now</Button>
      </motion.div>
    </div>
  );
};

export default HeroSection;