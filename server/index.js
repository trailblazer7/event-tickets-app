import express from 'express';
import cors from 'cors';
import { ticketsData, userTypesData } from './data.js';

const app = express();
const port = 3000;

app.use(cors());

app.get('/api/user-types', (req, res) => {
  res.json({ userTypes: userTypesData });
});

app.get('/api/tickets', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search?.toLowerCase() || '';
  const userType = req.query.userType?.toLowerCase() || 'local';

  let filteredTickets = ticketsData.filter(
    (ticket) =>
      (ticket.title.toLowerCase().includes(search) ||
        ticket.description.toLowerCase().includes(search)) &&
      ticket.userType.value === userType
  );

  // If the user is a tourist, we only want to show the first sentence of the description
  if (userType === 'tourist') {
    filteredTickets = filteredTickets.map((ticket) => {
      return {
        ...ticket,
        description: ticket.description.split('.')[0] + '.',
      };
    });
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedTickets = filteredTickets.slice(startIndex, endIndex);

  res.json({
    tickets: paginatedTickets,
    hasMore: endIndex < filteredTickets.length,
    total: filteredTickets.length,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
