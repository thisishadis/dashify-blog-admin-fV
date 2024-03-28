import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { useNavigate, useParams } from "react-router-dom";
import edit from "../assets/edit_icon.svg";
import { fetchProductDetails } from "../api/api";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
export default function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the product details based on the product ID
    const fetchProduct = async () => {
      try {
        const data = await fetchProductDetails(productId);
        if (data) {
          setProduct(data);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);
  if (loading) {
    // Render a loading state if the data is still being fetched
    return (
      <Layout>
        <div className="p-3 pt-40 teleflex justify-center items-center">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="p-3 flex flex-col gap-3">
        <div className="flex  gap-3">
          <h1 className="text-4xl">{product?.title}</h1>
          <img
            src={edit}
            onClick={() => {
              navigate(`/edit/${product.id}`);
            }}
          />
        </div>
        <p>{product?.category}</p>
        <p>{product?.description}</p>
        <p>price: {product?.price} $</p>
        <p>A product of {product?.brand} Co.</p>
      </div>
    </Layout>
  );
}
