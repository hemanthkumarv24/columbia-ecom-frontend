
import DashboardLayout from '../components/common/DashboardLayout';
import ProductPage from './ProductPage';

const HomePage = () => {
  return (
    <DashboardLayout>
    <div className="homepage">
      <ProductPage /> 
    </div>
    </DashboardLayout>
  );
};

export default HomePage;
