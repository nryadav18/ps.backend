const express = require('express');
const http = require('http'); // For WebSockets
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { Server } = require('socket.io');
const path = require('path');
const Route = require('./routes/routes');

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// Start Server
const PORT = 9000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/",Route)

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://NRY:dd0W8B5ZUDPtxpbF@cluster0.3caki.mongodb.net/')
  .then(() => console.log('Database Connected Successfully'))
  .catch((err) => console.log('Database Connection Error:', err));

// WebSocket Connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for chat messages
  socket.on('sendMessage', (message) => {
    console.log('Received message:', message);

    // Broadcast message to all clients
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// File serving (for songs or uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/songs/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads/songs', filename);
  res.sendFile(filePath);
});


