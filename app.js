const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { Server } = require('socket.io');
const path = require('path');
const Route = require('./routes/routes');
require('dotenv').config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/', Route);

// File download route
app.get('/songs/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads/songs', filename);
  res.sendFile(filePath);
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('✅ Database Connected Successfully'))
  .catch((err) => console.log('❌ Database Connection Error:', err));

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
