require('dotenv').config();
const http     = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const app      = require('./app');

const PORT = process.env.PORT || 3000;

// create an HTTP server from the express app
// (needed so Socket.io can share the same port)
const server = http.createServer(app);

// attach Socket.io to the server
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

// make io available inside route handlers via req.app.get('io')
app.set('io', io);

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// connect to MongoDB, then start the server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => {
      console.log('Backend running on http://localhost:' + PORT);
    });
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
