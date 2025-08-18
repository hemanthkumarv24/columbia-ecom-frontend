import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import Login from './pages/LoginPage'
import EmployeeList from './pages/UserList'
import { Provider } from 'react-redux'
import store from './store/store'
import ResetPassword from './pages/ResetPassword'
import HomePage from './pages/Home'
function App() {
  

  return (
    <>
    <BrowserRouter>
      <Provider store={store}>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employeedetails" element={<EmployeeList />} />
        <Route path="/ResetPassword" element={<ResetPassword/>}/>
        <Route path="/home" element={<HomePage/>}/>



        
      </Routes>
      </Provider>

    </BrowserRouter>
    </>
  )
}

export default App
