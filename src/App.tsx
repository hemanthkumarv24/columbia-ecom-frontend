
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import Login from './pages/LoginPage';
import EmployeeList from './pages/UserList';
import { Provider } from 'react-redux';
import store from './store/store';
import ResetPassword from './pages/ResetPassword';
import HomePage from './pages/Home';
import ProductDetailPage from './components/products/ProductDetailPage';
import ProductForm from './pages/ProductForm';
import { CartProvider } from './context/CartContext';   
import CartPage from './pages/CartPage';


function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <CartProvider> {/* ✅ Wrap your app with CartProvider */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/employeedetails" element={<EmployeeList />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/createproduct" element={<ProductForm />} />
            <Route path="/cart" element={<CartPage />} />
            {/* Add your CartPage route here if needed */}
          </Routes>
        </CartProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
