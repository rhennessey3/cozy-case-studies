
import React from 'react';
import { Routes } from 'react-router-dom';
import { AdminRoutes } from './routes/AdminRoutes';
import { PublicRoutes } from './routes/PublicRoutes';

const AppRoutes: React.FC = () => {
  console.log('AppRoutes rendering...');
  
  return (
    <Routes>
      {/* Admin Routes */}
      {AdminRoutes}
      
      {/* Public Routes */}
      {PublicRoutes}
    </Routes>
  );
};

export default AppRoutes;
