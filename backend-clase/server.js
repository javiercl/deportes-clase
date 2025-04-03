const express = require('express');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Node.js Backend Sport Amateurs API' });
});

// Example route
app.get('/api/items', (req, res) => {
  res.json([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ]);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});