// server/server.js

import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';
import cors from 'cors';
import recipeRoutes from './routes/recipeRoutes.js'; // 1. Import our new recipe routes

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allows requests from our frontend on a different port
app.use(express.json()); // Allows our server to accept JSON data in the request body

// --- API Routes ---
// This tells the app that any request starting with '/api/recipe'
// should be handled by the 'recipeRoutes' file we created.
app.use('/api/recipe', recipeRoutes); // 2. Tell the app to use the routes

// A simple test route to make sure the server is alive
app.get('/', (req, res) => {
  res.send('API is running successfully!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));