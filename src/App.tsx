import { useState } from 'react';
import { Container, SearchBar, TicketGrid, TicketList } from './components';
import { Loader2 } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import NoResults from './components/no-results';
import { SEARCH_INPUT_DEBOUNCE_TIME, USER_TYPE } from './constants';
import { useTickets } from './hooks/useTickets';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm] = useDebounce<string>(
    searchTerm,
    SEARCH_INPUT_DEBOUNCE_TIME
  );
  const { tickets, isLoading, isFetching, hasMore, inViewRef } = useTickets({
    searchTerm,
    debouncedSearchTerm,
  });

  const TicketComponent = !tickets.length
    ? NoResults
    : USER_TYPE === 'local'
      ? TicketGrid
      : TicketList;

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
            <div ref={inViewRef} className="flex justify-center py-8">
              {isFetching && <Loader2 className="animate-spin" size={32} />}
            </div>
          )}
        </>
      )}
    </Container>
  );
}

export default App;
