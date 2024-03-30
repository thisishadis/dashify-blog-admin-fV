import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Layout from '../layouts/Layout';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addNewProduct } from '../api/api';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().min(30, 'Description must be at least 30 characters').required('Description is required'),
  brand: Yup.string().required('Brand is required'),
  price: Yup.number().required('Price is required').positive('Price must be a positive number'),
});

export default function NewProduct() {
  const navigate = useNavigate();

  const handleAddNewProduct = (values, { setSubmitting }) => {
    addNewProduct(values, navigate, toast, setSubmitting);
  };

  return (
    <Layout>
      <div className="w-full">
        <h2 className="text-4xl p-3">Add New Product</h2>
        <Formik
          initialValues={{
            title: '',
            description: '',
            brand: '',
            price: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleAddNewProduct}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className={`mb-4 ${errors.title && touched.title ? 'input-error' : ''}`}>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className={`mt-1 p-2 border w-full border-gray-300 rounded-md ${errors.title && touched.title ? 'border-red-500' : ''}`}
                />
                <ErrorMessage name="title" component="div" className="text-red-500" />
              </div>
              <div className={`mb-4 ${errors.description && touched.description ? 'input-error' : ''}`}>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  className={`mt-1 p-2 border w-full border-gray-300 rounded-md ${errors.description && touched.description ? 'border-red-500' : ''}`}
                />
                <ErrorMessage name="description" component="div" className="text-red-500" />
              </div>
              <div className={`mb-4 ${errors.brand && touched.brand ? 'input-error' : ''}`}>
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                  Brand
                </label>
                <Field
                  type="text"
                  id="brand"
                  name="brand"
                  className={`mt-1 p-2 border w-full border-gray-300 rounded-md ${errors.brand && touched.brand ? 'border-red-500' : ''}`}
                />
                <ErrorMessage name="brand" component="div" className="text-red-500" />
              </div>
              <div className={`mb-4 ${errors.price && touched.price ? 'input-error' : ''}`}>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <Field
                  type="number"
                  id="price"
                  name="price"
                  className={`mt-1 p-2 border w-full border-gray-300 rounded-md ${errors.price && touched.price ? 'border-red-500' : ''}`}
                />
                <ErrorMessage name="price" component="div" className="text-red-500" />
              </div>

              <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded">
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </Layout>
  );
}


// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import Layout from '../layouts/Layout';
// import { ToastContainer, toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { addNewProduct } from '../api/api';

// const validationSchema = Yup.object().shape({
//   title: Yup.string().required('Title is required'),
//   description: Yup.string().min(30, 'Description must be at least 30 characters').required('Description is required'),
//   brand: Yup.string().required('Brand is required'),
//   price: Yup.number().required('Price is required').positive('Price must be a positive number'),
// });

// export default function NewProduct() {
//   const navigate = useNavigate();

//   const handleAddNewProduct = (values, { setSubmitting }) => {
//     addNewProduct(values, navigate, toast, setSubmitting);
//   };

//   return (
//     <Layout>
//       <div className="w-full">
//         <h2 className="text-4xl p-3">Add New Product</h2>
//         <Formik
//           initialValues={{
//             title: '',
//             description: '',
//             brand: '',
//             price: '',
//           }}
//           validationSchema={validationSchema}
//           onSubmit={handleAddNewProduct}
//         >
//           {({ isSubmitting, errors, touched }) => (
//             <Form>
//               <div className={`mb-4 ${errors.title && touched.title ? 'input-error' : ''}`}>
//                 <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//                   Title
//                 </label>
//                 <Field
//                   type="text"
//                   id="title"
//                   name="title"
//                   className={`mt-1 p-2 border w-full border-gray-300 rounded-md ${errors.title ? 'input-error' : ''}`}
//                 />
//                 <ErrorMessage name="title" component="div" className="text-red-500" />
//               </div>
//               <div className={`mb-4 ${errors.description && touched.description ? 'input-error' : ''}`}>
//                 <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//                   Description
//                 </label>
//                 <Field
//                   as="textarea"
//                   id="description"
//                   name="description"
//                   className={`mt-1 p-2 border w-full border-gray-300 rounded-md ${errors.description ? 'input-error' : ''}`}
//                 />
//                 <ErrorMessage name="description" component="div" className="text-red-500" />
//               </div>
//               <div className={`mb-4 ${errors.brand && touched.brand ? 'input-error' : ''}`}>
//                 <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
//                   Brand
//                 </label>
//                 <Field
//                   type="text"
//                   id="brand"
//                   name="brand"
//                   className={`mt-1 p-2 border w-full border-gray-300 rounded-md ${errors.brand ? 'input-error' : ''}`}
//                 />
//                 <ErrorMessage name="brand" component="div" className="text-red-500" />
//               </div>
//               <div className={`mb-4 ${errors.price && touched.price ? 'input-error' : ''}`}>
//                 <label htmlFor="price" className="block text-sm font-medium text-gray-700">
//                   Price
//                 </label>
//                 <Field
//                   type="text"
//                   id="price"
//                   name="price"
//                   className={`mt-1 p-2 border w-full border-gray-300 rounded-md ${errors.price ? 'input-error' : ''}`}
//                 />
//                 <ErrorMessage name="price" component="div" className="text-red-500" />
//               </div>

//               <button type="submit" disabled={isSubmitting} className="bg-blue-500 text-white px-4 py-2 rounded">
//                 {isSubmitting ? 'Submitting...' : 'Submit'}
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//       <ToastContainer />
//     </Layout>
//   );
// }
