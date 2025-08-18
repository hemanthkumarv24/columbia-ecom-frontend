import React from 'react';
import { Row, Col, Card } from 'antd';
import { motion } from 'framer-motion';

const categories = [
  { title: 'Clothing', image: 'https://s.yimg.com/ny/api/res/1.2/Fp2QU39oQ_casko6M4zxXQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://media.zenfs.com/en/wwd_finance_675/2fbf65bf41d8f6a1019a727b09dbe0bb' },
  { title: 'Shoes', image: 'https://www.grough.co.uk/lib/img/editorial/Columbia-Trient-Outdry-4-1200.jpg' },
  { title: 'Gear', image: 'https://www.powder.com/.image/t_share/MjEwNDAxMTk1NjY2MTg4MTEz/f24_sun_valley_ski_pr_mg_0244.jpg' },
];

const FeaturedCategories: React.FC = () => {
  return (
    <div style={{ padding: '60px 50px', background: '#f0f2f5' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Explore Categories</h2>
      <Row gutter={[24, 24]} justify="center">
        {categories.map((cat, index) => (
          <Col key={cat.title} xs={24} sm={12} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card
                hoverable
                cover={<img alt={cat.title} src={cat.image} />}
              >
                <Card.Meta title={cat.title} />
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturedCategories;