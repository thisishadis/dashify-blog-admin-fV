// PrivateWrapper.jsx

import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import AllPosts from "./components/AllPosts";
import EditProduct from "./components/EditProduct";
import NewProduct from "./components/NewProduct";
import Product from "./components/Product";

const publicRoutes = [
  {
    path: "/",
    element: <Login />,
  },
];

const privateRoutes = [
  {
    path: "/posts",
    element: <AllPosts />,
  },
  {
    path: "/edit/:productId", // Add the parameter here
    element: <EditProduct />,
  },
  {
    path: "/new",
    element: <NewProduct />,
  },
  {
    path: "/product/:productId",
    element: <Product />,
  },
];

const sharedRoutes = [
  {
    path: "/shared",
    element: <Login />,
  },
];


const PrivateWrapper = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  //   <RouterProvider router={router}>
  //   {/* <Route path="/" element={<App />} /> */}
  // </RouterProvider>

  const routes = createBrowserRouter(
    isAuthenticated ? privateRoutes : publicRoutes
  );

  return <RouterProvider router={routes} />;
};

export default PrivateWrapper;
