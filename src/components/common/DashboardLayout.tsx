import React  from 'react';
import type { ReactNode } from 'react'
import NavBar from '../navbar/NavBar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <NavBar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
