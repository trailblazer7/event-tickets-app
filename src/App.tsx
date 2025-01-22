import { useMemo, useState } from 'react';
import {
  Container,
  RadioGroup,
  SearchBar,
  TicketGrid,
  TicketList,
} from './components';
import { Loader2 } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import NoResults from './components/no-results';
import { SEARCH_INPUT_DEBOUNCE_TIME } from './constants';
import { useTickets } from './hooks/useTickets';
import { UserType } from './types';
import { useQuery } from 'react-query';
import { fetchUserTypes } from './api/users';

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm] = useDebounce<string>(
    searchTerm,
    SEARCH_INPUT_DEBOUNCE_TIME
  );
  const [userType, setUserType] = useState<UserType>('local');
  const { data: userTypesData } = useQuery(['userTypes'], () =>
    fetchUserTypes()
  );
  const { tickets, isLoading, isFetching, hasMore, inViewRef } = useTickets({
    searchTerm,
    debouncedSearchTerm,
    userType,
  });

  const TicketComponent = useMemo(
    () =>
      !tickets.length
        ? NoResults
        : userType === 'local'
          ? TicketGrid
          : TicketList,
    [tickets.length, userType]
  );

  return (
    <Container>
      <h2 className="font-extrabold text-[32px] text-center pb-4 pt-12">
        Event Tickets Manager
      </h2>
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      {userTypesData && (
        <RadioGroup
          name="userType"
          options={userTypesData.userTypes.map((userType) => ({
            label: userType.title,
            value: userType.value,
          }))}
          selectedValue={userType}
          onChange={(value) => setUserType(value as UserType)}
        />
      )}

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
