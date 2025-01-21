import axios from 'axios';
import { TicketResponse } from '../types';
import { ITEMS_PER_PAGE } from '../constants';

interface FetchTicketsProps {
  pageParam: number;
  serachTerm: string;
}

export const fetchTickets = async ({
  pageParam = 1,
  serachTerm,
}: FetchTicketsProps) => {
  try {
    const response = await axios.get<TicketResponse>(
      `${import.meta.env.VITE_API_KEY}/api/tickets`,
      {
        params: {
          page: pageParam,
          limit: ITEMS_PER_PAGE,
          search: serachTerm,
        },
      }
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
          'An error occurred while fetching tickets'
      );
    }
    throw error;
  }
};
