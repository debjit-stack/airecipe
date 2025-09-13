// server/routes/recipeRoutes.js

import express from 'express';
import { generateRecipe } from '../controllers/recipeController.js';

const router = express.Router();

// This line creates a new POST route at the path '/generate'.
// When a request hits this route, it will run the 'generateRecipe' function.
router.post('/generate', generateRecipe);

export default router;