import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import ProtectedRoute from "./store/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/LoginPage";
import EmployeeList from "./pages/UserList";
import ResetPassword from "./pages/ResetPassword";
import HomePage from "./pages/Home";
import ProductDetailPage from "./components/products/ProductDetailPage";
import ProductForm from "./pages/ProductForm";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          
          <Route element={<ProtectedRoute />}>
            <Route path="/employeedetails" element={<EmployeeList />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/createproduct" element={<ProductForm />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;