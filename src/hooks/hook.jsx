import axios from 'axios';
import { useMutation } from 'react-query';

const API_BASE_URL = 'https://dummyjson.com';

// Function to delete a product by ID
export const useDeleteProduct = () => {
  return useMutation((id) => {
    return axios.delete(`${API_BASE_URL}/products/${id}`);
  });
};