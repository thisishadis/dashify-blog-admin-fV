// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import { ToastContainer } from "react-toastify";
import AllPosts from "./components/AllPosts.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import EditProduct from "./components/EditProduct.jsx";
import NewProduct from "./components/NewProduct.jsx";
import Product from "./components/Product.jsx";
const queryClient = new QueryClient();
const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Register />,
  // },
  {
    path: "/",
    element: <Login />,
  },
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
  },{
    path: "/product/:productId",
    element: <Product />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <RouterProvider router={router}>
        {/* <Route path="/" element={<App />} /> */}
      </RouterProvider>
      <ToastContainer />
    </React.StrictMode>
  </QueryClientProvider>
);
