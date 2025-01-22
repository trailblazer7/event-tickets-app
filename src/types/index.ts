export interface Ticket {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl: string;
  price: string;
  userType: UserTypeResponseData;
}

export type UserType = 'local' | 'tourist';

export type UserTypeResponseData = {
  title: string;
  value: UserType;
};

export interface TicketResponse {
  tickets: Ticket[];
  hasMore: boolean;
  total: number;
}

export interface UserTypesResponse {
  userTypes: UserTypeResponseData[];
}
