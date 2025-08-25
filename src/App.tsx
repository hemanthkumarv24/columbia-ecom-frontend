
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import Login from './pages/LoginPage';
import EmployeeList from './pages/UserList';
import { Provider } from 'react-redux';
import store from './store/store';

import ProtectedRoute from './store/ProtectedRoute';


import ResetPassword from './pages/ResetPassword';
import HomePage from './pages/Home';
import ProductDetailPage from './components/products/ProductDetailPage';
import ProductForm from './pages/ProductForm';
import { CartProvider } from './context/CartContext';   
import CartPage from './pages/CartPage';
import DeleteProduct from './pages/DeleteProduct';
import ProductPage from './pages/ProductPage';
import AdminPage from './pages/AdminPage';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <CartProvider> {/* ✅ Wrap your app with CartProvider */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />




          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/employeedetails" element={<EmployeeList />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/createproduct" element={<ProductForm />} />
            <Route path="/cart" element={<CartPage />} />
            {/* Add your CartPage route here if needed */}

            <Route path="/deleteproduct" element={<DeleteProduct />} />
            <Route path="/viewproducts" element={<ProductPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>
        </Routes>
         </CartProvider> 
    </Provider>
      </BrowserRouter>

  );
}

export default App;
