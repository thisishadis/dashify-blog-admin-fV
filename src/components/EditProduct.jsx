import React, { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { fetchProductDetails, updateProduct } from "../api/api";

export default function EditProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchProductDetails(productId);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const validationSchema = Yup.object().shape({
    newTitle: Yup.string().required('Title cannot be empty'),
    newDescription: Yup.string().required('Description cannot be empty').min(30, 'Description must be at least 30 characters'),
    newBrand: Yup.string().required('Brand cannot be empty'),
    newPrice: Yup.number().required('Price cannot be empty').positive('Price must be a valid positive number'),
  });

  const updateProductMutation = useMutation((newData) => updateProduct(productId, newData), {
    onSuccess: () => {
      toast.success(`Product with ID ${productId} updated successfully. Transferring to the main page...`);
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      toast.error(`Error updating product: ${error.message}`);
    }
  });

  return (
    <Layout>
      {loading ? (
        <div className="px-12 flex flex-col gap-4 w-96">
        <h1 className="text-4xl p-3">Edit Product</h1>
        <div>
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <div className="skeleton w-full h-12"></div>
        </div>
        <div>
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <div className="skeleton w-full h-12"></div>
        </div>
        <div>
          <div className="label">
            <span className="label-text">Brand</span>
          </div>
          <div className="skeleton w-full h-12"></div></div>
        <div>
          <div className="label">
            <span className="label-text">Price</span>
          </div>
          <div className="skeleton w-full h-12"></div></div>
        <button className="btn btn-primary">Update Product</button>
      </div>
      ) : (
        <div className="px-12 flex flex-col gap-4 w-96">
          <h1 className="text-4xl p-3">Edit Product</h1>
          <Formik
            initialValues={{
              newTitle: product.title || '',
              newDescription: product.description || '',
              newBrand: product.brand || '',
              newPrice: product.price || '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              updateProductMutation.mutate(values);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="flex flex-col gap-4 ">
                <div className={`mb-4 ${errors.newTitle && touched.newTitle ? 'input-error' : ''}`}>
                  <div className="label">
                    <span className="label-text">Title</span>
                  </div>
                  <Field
                    type="text"
                    name="newTitle"
                    className={`input input-bordered w-full max-w-xs ${errors.newTitle && touched.newTitle ? 'input-error' : ''}`}
                  />
                  <ErrorMessage name="newTitle" component="p" className="text-red-500 mt-1" />
                </div>
                <div className={`mb-4 ${errors.newDescription && touched.newDescription ? 'input-error' : ''}`}>
                  <div className="label">
                    <span className="label-text">Description</span>
                  </div>
                  <Field
                    type="text"
                    name="newDescription"
                    className={`input input-bordered w-full max-w-xs ${errors.newDescription && touched.newDescription ? 'input-error' : ''}`}
                  />
                  <ErrorMessage name="newDescription" component="p" className="text-red-500 mt-1" />
                </div>
                <div className={`mb-4 ${errors.newBrand && touched.newBrand ? 'input-error' : ''}`}>
                  <div className="label">
                    <span className="label-text">Brand</span>
                  </div>
                  <Field
                    type="text"
                    name="newBrand"
                    className={`input input-bordered w-full max-w-xs ${errors.newBrand && touched.newBrand ? 'input-error' : ''}`}
                  />
                  <ErrorMessage name="newBrand" component="p" className="text-red-500 mt-1" />
                </div>
                <div className={`mb-4 ${errors.newPrice && touched.newPrice ? 'input-error' : ''}`}>
                  <div className="label">
                    <span className="label-text">Price</span>
                  </div>
                  <Field
                    type="number"
                    name="newPrice"
                    className={`input input-bordered w-full max-w-xs ${errors.newPrice && touched.newPrice ? 'input-error' : ''}`}
                  />
                  <ErrorMessage name="newPrice" component="p" className="text-red-500 mt-1" />
                </div>
                <button
                  type="submit"
                  className={`btn btn-primary ${
                    updateProductMutation.isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={updateProductMutation.isLoading || isSubmitting}
                >
                  {updateProductMutation.isLoading ? "Updating..." : "Update Product"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}
      <ToastContainer />
    </Layout>
  );
}
