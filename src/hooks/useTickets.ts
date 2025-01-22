import { useEffect, useRef, useState } from 'react';
import { Ticket } from '../types';
import { useQuery } from 'react-query';
import { fetchTickets } from '../api/tickets';
import { useInView } from 'react-intersection-observer';
import { INVIEW_ELEMENT_THRESHOLD } from '../constants';

interface UseTicketsProps {
  searchTerm: string;
  debouncedSearchTerm: string;
}

export const useTickets = ({
  searchTerm,
  debouncedSearchTerm,
}: UseTicketsProps) => {
  const [page, setPage] = useState<number>(1);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const skipInView = useRef<boolean>(false);
  const skipTicketsFetch = useRef<boolean>(false);
  const { ref: inViewRef, inView } = useInView({
    threshold: INVIEW_ELEMENT_THRESHOLD,
  });

  // Fetch tickets on page change
  const { data, isLoading, isFetching } = useQuery(
    ['tickets', page, debouncedSearchTerm],
    () => fetchTickets({ pageParam: page, serachTerm: debouncedSearchTerm }),
    {
      keepPreviousData: true,
      enabled: !skipTicketsFetch.current,
    }
  );

  // Set tickets and hasMore when data changes
  useEffect(() => {
    if (data) {
      if (page === 1) {
        setTickets(data.tickets);
      } else {
        setTickets((prev) => [...prev, ...data.tickets]);
      }
      setHasMore(data.hasMore);
    }
  }, [data]);

  // Reset skipInView after timeout when tickets change to prevent multiple page changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      skipInView.current = false;
    }, 700);
    return () => clearTimeout(timeout);
  }, [tickets]);

  // Skip fetch when searchTerm changes
  useEffect(() => {
    if (searchTerm !== debouncedSearchTerm) {
      skipTicketsFetch.current = true;
    } else {
      skipTicketsFetch.current = false;
    }
  }, [searchTerm, debouncedSearchTerm]);

  // Reset tickets on searchTerm change and set page to 1
  useEffect(() => {
    skipInView.current = true;
    setPage(1);
    setTickets([]);
  }, [debouncedSearchTerm]);

  // If hasMore tickets and user scrolled down to the bottom then set next page
  useEffect(() => {
    if (inView && hasMore && !isFetching && !skipInView.current) {
      skipInView.current = true;
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, isFetching]);

  return {
    tickets,
    hasMore,
    isLoading,
    isFetching,
    inViewRef,
  };
};
