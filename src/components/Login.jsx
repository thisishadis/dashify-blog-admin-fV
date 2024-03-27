
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../api/api";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 
  const [initialCheckDone, setInitialCheckDone] = useState(false); // Track if initial check is done

  useEffect(() => {
    const checkLoggedIn = async () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        navigate("/posts");
      } else {
        setLoading(false); // Set loading to false after initial check
        setInitialCheckDone(true); // Set initial check done
      }
    };
    checkLoggedIn();
  }, [navigate]);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Please enter your username.'),
    password: Yup.string().required('Please enter your password.'),
  });

  const handleLogin = async (values) => {
    const { username, password } = values;
    try {
      setLoading(true);
      const data = await loginUser(username, password);
      console.log("Response data:", data);
      toast.success("Login successful!");
      localStorage.setItem("isLoggedIn", "true");
      navigate("/posts");
    } catch (error) {
      console.error(error.message);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Render nothing until initial check is done
  if (!initialCheckDone) {
    return null;
  }

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <div className="w-80 flex flex-col justify-center items-center gap-3 p-4 bg-gray-100">
        <h3 className="text-3xl text-gray-500">LOGIN</h3>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleLogin(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Username</span>
                </div>
                <Field type="text" name="username" className={`input input-bordered w-full max-w-xs ${errors.username && touched.username && 'input-error'}`} />
                <ErrorMessage name="username" component="span" className="text-red-500" />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <Field type="password" name="password" className={`input input-bordered w-full max-w-xs ${errors.password && touched.password && 'input-error'}`} />
                <ErrorMessage name="password" component="span" className="text-red-500" />
              </label>
              <button className="btn w-full btn-primary btn-sm mt-2" type="submit" disabled={loading || isSubmitting}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
        <div className="flex gap-3 text-xs w-full">
          <p>Don't have an account?</p>
          <button
            className="font-bold"
            onClick={() => {
              navigate("/");
            }}
          >
            Register now
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

