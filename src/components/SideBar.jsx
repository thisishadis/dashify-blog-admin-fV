import React from "react";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();
  const handleAllProductsClick = () => {
    navigate("/posts");
  };const handleNewProductsClick = () => {
    navigate("/new");
  };
  return (
    <div className="fixed bg-blue-500 col-span-1  flex flex-col gap-4 h-screen w-60 text-white">
      <h1 className="text-2xl p-2">Products</h1>
      <div className="w-full">
        <div className="btn-ghost p-3 m-0" onClick={handleAllProductsClick}>
          All Products
        </div>
        <div className="btn-ghost p-3 m-0" onClick={handleNewProductsClick}>New Product</div>
      </div>
    </div>
  );
}
