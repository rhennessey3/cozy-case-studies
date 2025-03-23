
import React from 'react';
import { Routes } from 'react-router-dom';
import { PublicRoutes } from './routes/PublicRoutes';

const AppRoutes: React.FC = () => {
  console.log('AppRoutes rendering...');
  
  return (
    <Routes>
      {/* Public Routes */}
      {PublicRoutes}
    </Routes>
  );
};

export default AppRoutes;
