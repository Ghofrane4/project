import React from "react";
import ProductList from 'views/admin/tables/index'; // List of products
import ProductDetails from 'views/admin/tables/ProductDetails'; // Product details page
import UpdateProduct from 'views/admin/tables/UpdateProduct'; // Product update page
import AddProduct from 'views/admin/tables/AddProduct'; // Add product page

const productRoutes = [
  {
    path: 'products/list',
    name: 'Product List',
    component: <ProductList />, // Use JSX element
    layout: '/product'
  },
  {
    path: 'products/product/:id',
    name: 'Product Details',
    component: <ProductDetails />, // Use JSX element
    layout: '/product'
  },
  {
    path: 'products/update/:id',
    name: 'Update Product',
    component: <UpdateProduct />, // Use JSX element
    layout: '/product'
  },
  {
    path: 'products/add',
    name: 'Add Product',
    component: <AddProduct />, // Use JSX element
    layout: '/product'
  }
];

export default productRoutes;
