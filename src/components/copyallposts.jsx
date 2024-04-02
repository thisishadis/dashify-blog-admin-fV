import { useMutation, useQuery } from "react-query";
import Layout from "../layouts/Layout";
import { useNavigate, useSearchParams } from "react-router-dom";
import VISI from "../assets/visibility_icon.svg";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { deleteProduct, fetchProducts } from "../api/api";
import Skeleton from "../common/Skeleton";
import { TablePagination } from "@mui/material";

export default function AllPosts() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [ID, setID] = useState();
  const [count , setCount] = useState(10)


  const {
    data: products,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", searchParams.get("page") || 1 , count ],
    queryFn: () =>
      fetchProducts(count, ((searchParams.get("page") || 1) - 1) * count),
  });

  const deletePost = useMutation((id) => deleteProduct(id), {
    onSuccess: () => {
      toast.success(`Product with ID ${ID} deleted successfully.`);
      refetch();
    },
    onError: (error) => {
      if (error.response) {
        toast.error(`Failed to delete product with ID ${ID}.`);
      } else {
        console.error("Error deleting product:", error.message);
      }
    },
  });

  const deleteHandler = (productId) => {
    document.getElementById("my_modal_5").showModal();
    setID(productId);
  };
  return (
    <Layout>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <h1 className="text-4xl p-3">All Products</h1>
        <div className="overflow-x-auto w-full">
        {/* table */}
          <table className="table overflow-hidden">
            {/* head */}
            <thead>
              <tr>
                <th>id</th>
                <th>title</th>
                <th>description</th>
                <th>brand</th>
                <th>price</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <Skeleton />
              ) : error ? (
                <tr>
                  <td className="text-3xl py-12">❌ Error loading data ❌</td>
                </tr>
              ) : Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="cursor-pointer hover">
                    <th>#{product.id}</th>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td>{product.brand}</td>
                    <td>{product.price}</td>
                    <td>
                      <div className="dropdown">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn rounded-full  m-1"
                        >
                          ....
                        </div>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <a
                              onClick={() => {
                                navigate(`/edit/${product.id}`);
                              }}
                            >
                              Edit
                            </a>
                          </li>
                          <li>
                            <a onClick={() => deleteHandler(product.id)}>
                              Delete
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td
                      onClick={() => {
                        navigate(`/product/${product.id}`);
                      }}
                    >
                      <img src={VISI} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No products available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <div className="join">
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="1"
              checked={searchParams.get("page") == 1}
              onChange={() => setSearchParams({ page: 1 })}
            />
            <input
              className="join-item btn btn-square"
              type="radio"
              name="options"
              aria-label="2"
              checked={searchParams.get("page") == 2}
              onChange={() => setSearchParams({ page: 2 })}
            />
          </div>
          <div className="dropdown dropdown-top">
            <div tabIndex={0} role="button" className="btn m-1">
            Rows per page:
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32 flex flex-col items-center justify-center"
            >
              <li onClick={()=>{setCount(Number(10))}}>
                <a >10</a>
              </li>
              <li onClick={()=>{setCount(Number(20))}}>
                <a>20</a>
              </li>
              <li onClick={()=>{setCount(Number(50))}}>
                <a>50</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <ToastContainer />
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Attention!</h3>
          <p className="py-4">Are you sure wanna delete this product?</p>
          <div className="modal-action">
            <form
              method="dialog"
              className="flex w-full items-center justify-between "
            >
              <button className="btn btn-outline btn-error">NO</button>
              <button
                onClick={() => {
                  console.log("clicked");
                  deletePost.mutate(ID);
                }}
                className="btn btn-primary"
              >
                YES
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </Layout>
  );
}
