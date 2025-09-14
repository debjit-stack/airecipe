import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';
import cors from 'cors';

// Import Routers
import recipeRoutes from './routes/recipeRoutes.js';
import authRoutes from './routes/authRoutes.js'; // 1. Import our new auth routes

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// --- API Routes ---
app.use('/api/recipe', recipeRoutes);
app.use('/api/auth', authRoutes); // 2. Tell the app to use the auth routes for any URL starting with /api/auth

// A simple test route to make sure the server is alive
app.get('/', (req, res) => {
  res.send('API is running successfully!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // server/server.js - DEBUG VERSION

// import express from 'express';
// import 'dotenv/config';
// import connectDB from './config/db.js';
// import cors from 'cors';
// import recipeRoutes from './routes/recipeRoutes.js';

// // Connect to the database
// connectDB();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json({ limit: '50mb' }));

// // --- API Routes ---
// app.use('/api/recipe', recipeRoutes);

// // SIMPLE TEST AUTH ROUTE - Add this temporarily to test
// app.post('/api/auth/register', (req, res) => {
//   console.log('Registration endpoint hit!', req.body);
//   res.json({ message: 'Registration endpoint is working!', data: req.body });
// });

// app.post('/api/auth/login', (req, res) => {
//   console.log('Login endpoint hit!', req.body);
//   res.json({ message: 'Login endpoint is working!', data: req.body });
// });

// // A simple test route to make sure the server is alive
// app.get('/', (req, res) => {
//   res.send('API is running successfully!');
// });

// // Add this to list all routes for debugging
// app.get('/debug/routes', (req, res) => {
//   const routes = [];

//   app._router.stack.forEach((r) => {
//     if (r.route && r.route.path && r.route.methods) {
//       const method = Object.keys(r.route.methods)[0]?.toUpperCase() || 'N/A';
//       routes.push({
//         method,
//         path: r.route.path,
//       });
//     }
//   });

//   res.json({ routes });
// });
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log('Available routes:');
//   console.log('GET  /', 'POST /api/auth/register', 'POST /api/auth/login');
// });