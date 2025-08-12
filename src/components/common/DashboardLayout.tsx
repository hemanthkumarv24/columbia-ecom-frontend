import React, { FC, ReactNode, useEffect, useState } from 'react';
import {
  Button,
  Space,
  Layout,
  Avatar,
  Dropdown,
  // Flex,
  // Typography,
} from 'antd';

import choiceLogo from '../../assets/choice-logo.png'; // Import the logo images
import primusLogo from '../../assets/primus-logo.png';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';

import {
  // BellOutlined,
  BookOutlined,
  CaretDownOutlined,
  // ExclamationCircleOutlined,
  FundProjectionScreenOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PhoneOutlined,
  PoweroffOutlined,
  SettingOutlined,
  StarFilled,
  UnorderedListOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';


interface Props {
  children: ReactNode;
  Rec_data: any;
}

const DashboardLayout: FC<Props> = ( { children, Rec_data } ) => {
  const data = Rec_data;
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 767);

  const showDrawer = () => {
    setVisible((prev) => !prev);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div
          style={{
            border: '2px dotted #ccc',
            borderRadius: '50%',
            width: '100px',
            height: '100px',
            borderColor: '#1c5335',
            justifyContent: 'center',
            padding: '20px',
            display: 'flex',
            justifyItems: 'center',
          }}
        >
          <UserOutlined size={70} />
        </div>
      ),
    },
    {
      key: '2',
      label: (
        // <Link to='/profile'>
        <Button
          type='text'
          style={{ marginBottom: '16px', marginTop: '16px', textAlign: 'left', width: '100%'}}
          onClick={() => navigate('/profile', {state: {data}})}
          ><UserOutlined /> User Profile
        </Button>
        // </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Button
          type='text'
          style={{ marginBottom: '16px', marginTop: '16px', textAlign: 'left', width: '100%'}}
          onClick={() => navigate('', {state: {data}})} //Update the Path
          ><SettingOutlined /> Settings
        </Button>
      ),
    },
    {
      key: '4',
      label: (
        <Button
          type='text'
          style={{ marginBottom: '16px', marginTop: '16px', textAlign: 'left', width: '100%' }}
          onClick={() => navigate('/')} 
          ><PoweroffOutlined /> Sign Out
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      const currentWidth = window.innerWidth;
    const mobile = currentWidth < 767;
    setIsMobile(mobile);
    setVisible(!mobile);
    };

    window.addEventListener('resize', checkMobile);
    checkMobile();
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  console.log("isMobile:", isMobile);

  const logoStyle = isMobile ? { display: 'none' } : { width: '70%' };
  const choice_id = isMobile ? { display: 'none' } : { margin: '0 20px 0 0' };


  

  return (
    <>
      <nav className='menuBar' style={{
  display: 'flex',       // Enable flex container
  alignItems: 'center',  // Align items vertically in the center
  justifyContent: 'space-between', // Distribute extra space
  padding: '10px 20px', // Add some padding for aesthetics
}}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Button
      type='text'
      icon={React.createElement(
        visible ? MenuUnfoldOutlined : MenuFoldOutlined,
        { style: { fontSize: '25px' } } 
      )}
      onClick={showDrawer}
      style={{
        border: 'none',
        marginRight: '20px', // Adjust space between button and logos
      }}
    />
    <a href='' className='logo'>
    <Space size={0}>
        <img src={choiceLogo} alt='Choice Logo' style={logoStyle} />
        <img src={primusLogo} alt='Primus Logo' style={logoStyle} />
      </Space>

    </a>
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div className='choice_id'>
    <h3 style={choice_id} > 
      Choice Id: <span style={{ fontWeight: '800' }}>1CLJ3917</span>
    </h3>
    </div>
    <Avatar size={40} icon={<UserOutlined />} style={{ marginRight: '10px' }} />
    <Dropdown menu={{ items }} placement='bottomRight' arrow>
      <p>
        {data['first_name']} {data['last_name']}
        <CaretDownOutlined />
      </p>
    </Dropdown>
  </div>
</nav>

      <Layout>
        {visible && (
          <Sider className="hideOnMobile" style={{ backgroundColor: '#1c5335' }}>
            {/* <Link to='/dashboard'> */}
              <Button
                type='text'
                style={{ marginBottom: '16px', marginTop: '16px', textAlign: 'left', width: '100%' }}
                onClick={() => navigate('/dashboard', {state: {data}})}
              >
                <StarFilled style={{ color: 'white' }} />
                <span
                  style={{
                    fontSize: '15px',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  Dashboard
                </span>
              </Button>
            {/* </Link> */}
            {/* <Link to='/manage-family'> */}
              <Button type='text' style={{ marginBottom: '16px', textAlign: 'left', width: '100%' }}
              onClick={() => navigate('/manage-family', {state: {data}})}
              >
                <UsergroupAddOutlined style={{ color: 'white' }} />
                <span
                  style={{
                    fontSize: '15px',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  Manage your family
                </span>
              </Button>
            {/* </Link> */}
            {/* <Link to='/view-all-schemes'> */}
              <Button
                type='text'
                style={{
                  marginBottom: '16px', textAlign: 'left', width: '100%'
                }}
                onClick={() => navigate('/view-all-schemes', {state: {data}})}
              >
                <UnorderedListOutlined
                  style={{ color: 'white', width: '20px' }}
                />
                <span
                  style={{
                    fontSize: '15px',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  <div> View all schemes </div>
                </span>
              </Button>
            {/* </Link> */}
            {/* <Link to='/beneficiary-passbook'> */}
              <Button type='text' style={{ marginBottom: '16px', textAlign: 'left', width: '100%' }}
              onClick={() => navigate('/beneficiary-passbook', {state: {data}})}
              >
                <BookOutlined style={{ color: 'white' }} />
                <span
                  style={{
                    fontSize: '15px',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  Beneficary Passbook
                </span>
              </Button>
            {/* </Link> */}
            {/* <Link to='/manage-grievance'> */}
              <Button type='text' style={{ marginBottom: '16px', textAlign: 'left', width: '100%' }}
              onClick={() => navigate('/manage-grievance', {state: {data}})}
              >
                <PhoneOutlined style={{ color: 'white' }} />
                <span
                  style={{
                    fontSize: '15px',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  Manage Grievence
                </span>
              </Button>
            {/* </Link> */}
            {/* <Link to='/activities'> */}
              <Button type='text' style={{ marginBottom: '16px', textAlign: 'left', width: '100%' }} 
              onClick={() => navigate('/activities', {state: {data}})}
              >
                <FundProjectionScreenOutlined style={{ color: 'white' }} />
                <span
                  style={{
                    fontSize: '15px',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  Activities
                </span>
              </Button>
            {/* </Link> */}
          </Sider>
        )}
        <Content style={{ minHeight: '100vh', padding: 30 }}>
          {children}
        </Content>
      </Layout>
    </>
  );
};

export default DashboardLayout;