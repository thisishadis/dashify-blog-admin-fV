import axios from 'axios';
const API_BASE_URL = 'https://dummyjson.com';

//login
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username: username,
      password: password,
    },{
      headers: { "Content-Type": "application/json" }
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    throw new Error(`Error during login: ${error.message}`);
  }
};

//posts
// Function to fetch all products
export const fetchProducts = async (limit, skip) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products?limit=${limit}&skip=${skip}&select=title,price,description,brand`);
    if (response.data && Array.isArray(response.data.products)) {
      return response.data.products;
    } else {
      throw new Error("Invalid data format");
    }
  } catch (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
};


// Function to delete a product by ID
export async function deleteProduct(id) {
  try {
    await axios.delete(`https://dummyjson.com/products/${id}`);
    return true; // Indicates successful deletion
  } catch (error) {
    throw error; // Throw the error for handling in the component
  }
}


//EDIT POST
export const fetchProductDetails = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
export async function updateProduct(productId, newData) {
  try {
    const response = await axios.put(`${API_BASE_URL}/products/${productId}`, newData, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error updating product');
  }
}
// Update product details based on the product ID
export const updateProductDetails = async (productId, newData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/products/${productId}`, newData, {
      headers: { "Content-Type": "application/json" }
    });

    if (response.status === 200) {
      return true;
    } else {
      console.error("Failed to update product:", response.statusText);
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

//new product
export const addNewProduct = (productData, navigate, toast, setLoading) => {
  axios.post(`${API_BASE_URL}/products/add`, productData, {
    headers: { 'Content-Type': 'application/json' },
  })
  .then((res) => {
    console.log('Newly Created Product:', res.data);
    toast.success('Product added successfully. transferring to the main page...');
    setTimeout(() => {
        navigate(-1);
      }, 3000);
  })
  .catch((error) => {
    console.error('Error adding new product:', error);
    toast.error('Error adding new product.');
  }).finally(() => {
    setLoading(false);
  });
};

