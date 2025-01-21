export interface Ticket {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl: string;
  price: string;
}

export type UserType = 'local' | 'tourist';

export interface TicketResponse {
  tickets: Ticket[];
  hasMore: boolean;
  total: number;
}
