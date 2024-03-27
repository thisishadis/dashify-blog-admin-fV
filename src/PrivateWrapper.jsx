// PrivateWrapper.jsx

import React from 'react';

const PrivateWrapper = ({ children}) => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  return isAuthenticated ? (
    <RouterProvider router={router}>
      {children}
    </RouterProvider>
  ) : (
    <Login />
  );
};

export default PrivateWrapper;
