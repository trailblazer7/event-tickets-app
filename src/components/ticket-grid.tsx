import React from 'react';
import { Calendar, MapPin, Ticket as TicketIcon } from 'lucide-react';
import { Ticket } from '../types';

interface TicketGridProps {
  tickets: Ticket[];
}

const TicketGrid: React.FC<TicketGridProps> = ({ tickets }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <img
            src={ticket.imageUrl}
            alt={ticket.title}
            className="w-full h-48 object-cover"
          />
          <div className="flex flex-col justify-between flex-1 p-6">
            <div>
              <h3 className="text-xl font-bold mb-2">{ticket.title}</h3>
              <p className="text-gray-600 mb-4">{ticket.description}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Calendar size={18} />
                <span>{new Date(ticket.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <MapPin size={18} />
                <span>{ticket.location}</span>
              </div>
              <div className="flex justify-between flex-wrap items-center">
                <span className="text-2xl font-bold text-indigo-600">
                  {ticket.price}
                </span>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-nowrap">
                  <TicketIcon size={18} />
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

export default TicketGrid;
