import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Ticket } from '../types';

interface TicketListProps {
  tickets: Ticket[];
}

const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
  return (
    <div className="space-y-6 p-6">
      {tickets.map((ticket) => (
        <div
          key={ticket.id + ticket.title.split(' ').join('-')}
          className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <img
            src={ticket.imageUrl}
            alt={ticket.title}
            className="w-full md:w-56 h-36 md:h-auto object-cover"
          />
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">{ticket.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {ticket.description}
              </p>
            </div>
            <div>
              <div className="flex flex-col md:flex-row md:items-center gap-x-6">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar size={18} />
                  <span>{new Date(ticket.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin size={18} />
                  <span>{ticket.location}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 md:mt-0">
                <span className="text-2xl font-bold text-indigo-600">
                  {ticket.price}
                </span>
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
