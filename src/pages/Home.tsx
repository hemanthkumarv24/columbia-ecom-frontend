
import DashboardLayout from '../components/common/DashboardLayout';

const HomePage = () => {
  return (
    <DashboardLayout>
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        https://images.columbiasportswear.com/is/image/ColumbiaSportswear/hero-image
        <div className="hero-text">
          <h1>Gear Up for the Outdoors</h1>
          <p>Explore Columbia's latest collection for hiking, skiing, and adventure.</p>
          <button className="shop-now">Shop Now</button>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          {['Men', 'Women', 'Kids', 'Footwear', 'Accessories'].map((category) => (
            <div key={category} className="category-card">
              <img src={`/images/${category.toLowerCase()}.jpg`} alt={category} />
              <h3>{category}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {[1, 2, 3, 4].map((id) => (
            <div key={id} className="product-card">
              <img src={`/images/product-${id}.jpg`} alt={`Product ${id}`} />
              <h4>Product Name {id}</h4>
              <p>$99.99</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    </div>
    </DashboardLayout>
  );
};

export default HomePage;
