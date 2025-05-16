// routes/index.js
import userRoutes from './userRoutes';
import superadminRoutes from './superadminRoutes';

// Get user role from localStorage
const userRole = localStorage.getItem('role');
console.log('User Role retrieved in routes/index.js:', userRole); // Check retrieved role

// Combine routes based on user role
const routes = userRole === 'superadmin'
  ? superadminRoutes
  : userRole === 'user'
    ? userRoutes
    : []; // Handle case where role is not set


export default routes;
