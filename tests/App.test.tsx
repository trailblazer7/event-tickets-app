/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from '../src/App';
import { fetchTickets } from '../src/api/tickets';
import { describe, it, expect, beforeEach, Mock, vi } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('../src/api/tickets', () => ({
  fetchTickets: vi.fn(),
}));

const mockFetchTickets = fetchTickets as Mock;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('App Component', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('renders the title and search bar', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    expect(
      screen.getByText('Event Tickets Manager', { exact: false })
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays tickets when data is fetched', async () => {
    mockFetchTickets.mockResolvedValue({
      tickets: [
        {
          id: 1,
          title: 'The Heart of the Matter',
          date: '2025-03-29T21:27:06.863Z',
        },
        {
          id: 2,
          title: 'A Tale of Two Cities',
          date: '2025-04-29T18:27:06.863Z',
        },
        ,
      ],
      hasMore: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('The Heart of the Matter')).toBeInTheDocument();
      expect(screen.getByText('A Tale of Two Cities')).toBeInTheDocument();
    });
  });

  it('displays no results message when no tickets are found', async () => {
    mockFetchTickets.mockResolvedValue({ tickets: [], hasMore: false });

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText('There are no results for this request.', {
          exact: false,
        })
      ).toBeInTheDocument();
    });
  });
});
