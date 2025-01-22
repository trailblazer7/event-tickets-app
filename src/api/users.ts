import axios from 'axios';
import { UserTypesResponse } from '../types';

export const fetchUserTypes = async () => {
  try {
    const response = await axios.get<UserTypesResponse>(
      `${import.meta.env.VITE_API_URL}/api/user-types`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        throw new Error(
          'Network error - Please check if the API server availible.'
        );
      }
      throw new Error(
        error.response.data?.message ||
          'An error occurred while fetching user types'
      );
    }
    throw error;
  }
};
