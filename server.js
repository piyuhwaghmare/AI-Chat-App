const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const messageRoutes = require('./routes/messageRoutes');
require('dotenv').config();

const app = express();

connectDB();

const allowedOrigins = [
  'https://chat-saver.netlify.app',
  'http://localhost:5173' // So you can still test locally
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());

app.use('/api', messageRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

