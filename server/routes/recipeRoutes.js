import express from 'express';
// 1. Import all the new controller functions
import { 
  generateRecipe, 
  saveRecipe, 
  getHistory, 
  deleteRecipe,
  getRecipeById 
} from '../controllers/recipeController.js';

const router = express.Router();

// --- Define API Routes ---

// POST /api/recipe/generate -> For generating a new recipe
router.post('/generate', generateRecipe);

// POST /api/recipe/save -> For saving a recipe to the database
router.post('/save', saveRecipe);

// GET /api/recipe/history/:userId -> For fetching all recipes for a user
router.get('/history/:userId', getHistory);

// DELETE /api/recipe/:id -> For deleting a specific recipe by its database ID
router.delete('/:id', deleteRecipe);
router.get('/:id', getRecipeById); // 2. Add the new route

export default router;

