import { useEffect, useMemo, useRef, useState } from 'react';
import { Ticket } from './types';
import { useInView } from 'react-intersection-observer';
import { useQuery } from 'react-query';
import {
  Container,
  SearchBar,
  TicketGrid,
  TicketList,
  Footer,
} from './components';
import { Loader2 } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import NoResults from './components/no-results';
import {
  SEARCH_INPUT_DEBOUNCE_TIME,
  INVIEW_ELEMENT_THRESHOLD,
  USER_TYPE,
} from './constants';
import { fetchTickets } from './api/tickets';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm] = useDebounce<string>(
    searchTerm,
    SEARCH_INPUT_DEBOUNCE_TIME
  );
  const [page, setPage] = useState<number>(1);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const skipInView = useRef<boolean>(false);
  const skipTicketsFetch = useRef<boolean>(false);
  const { ref, inView } = useInView({
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

  const TicketComponent = useMemo(() => {
    return !tickets.length
      ? NoResults
      : USER_TYPE === 'local'
        ? TicketGrid
        : TicketList;
  }, [tickets.length, USER_TYPE]);

  return (
    <Container>
      <h2 className="font-extrabold text-[32px] text-center pb-4 pt-6">
        Event Tickets Manager
      </h2>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin" size={48} />
        </div>
      ) : (
        <>
          <TicketComponent tickets={tickets} />
          {hasMore && (
            <div ref={ref} className="flex justify-center py-8">
              {isFetching && <Loader2 className="animate-spin" size={32} />}
            </div>
          )}
        </>
      )}
      <Footer />
    </Container>
  );
}

export default App;
