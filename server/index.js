import express from 'express';
import cors from 'cors';
import { tickets } from './data.js';

const app = express();
const port = 3000;

app.use(cors());

app.get('/api/tickets', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search?.toLowerCase() || '';

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(search) ||
      ticket.description.toLowerCase().includes(search)
  );

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
  console.log(`Server running at http://localhost:${port}`);
});
