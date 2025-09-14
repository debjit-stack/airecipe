import express from 'express';
import {
  generateRecipe,
  saveRecipe,
  getHistory,
  getRecipeById,
  deleteRecipe,
} from '../controllers/recipeController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// --- Public Route ---
// Generate a recipe (AI, no login required)
router.post('/generate', generateRecipe);

// --- Protected Routes ---
// Save a recipe to the logged-in user's history
router.post('/save', authMiddleware, saveRecipe);

// Get the logged-in user's recipe history (alias route for compatibility)
router.get('/history', authMiddleware, getHistory);
router.get('/my-history', authMiddleware, getHistory);


// Get a single recipe by its ID (must belong to the logged-in user)
router.get('/:id', authMiddleware, getRecipeById);

// Delete a recipe by its ID (must belong to the logged-in user)
router.delete('/:id', authMiddleware, deleteRecipe);

export default router;
