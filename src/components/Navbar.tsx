import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <div style={{
      background: '#000',
      padding: '0 50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      width:'100%',
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>

    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Columbia_Sportswear_Co_logo.svg/2560px-Columbia_Sportswear_Co_logo.svg.png"
      alt="Sportify Logo"
      style={{ height: '40px' }}
    />
  
</div>
       <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/login" style={linkStyle}>Login</Link>
        <Link to="/" style={linkStyle}>Register</Link>
      </div>


    </div>
  );
};
const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '16px',
};


export default Navbar;