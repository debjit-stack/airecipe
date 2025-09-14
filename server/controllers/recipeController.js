import Recipe from '../models/recipeModel.js';
import axios from 'axios';
import 'dotenv/config';

// --- AI Generation (Public) ---
// This function remains public and does not require a user to be logged in.
const generateRecipe = async (req, res) => {
  const { ingredients, preferences, diet } = req.body;

  // We'll capture the user's original input to save it later
  const userInput = {
    originalIngredients: ingredients,
    originalPreferences: preferences,
    originalDiet: diet,
  };

  if (!ingredients || ingredients.length === 0) {
    return res.status(400).json({ message: 'Ingredients are required.' });
  }

  try {
    const recipeTextResponse = await generateRecipeText(ingredients, preferences, diet);
    const cleanedResponse = recipeTextResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    const recipeJson = JSON.parse(cleanedResponse);
    const imageUrl = await generateRecipeImage(recipeJson.title, diet);

    const finalRecipe = {
      ...recipeJson,
      imageUrl: imageUrl,
      userInput: userInput, // Add the original user input to the final object
    };

    res.status(200).json(finalRecipe);
  } catch (error) {
    console.error('Error in generateRecipe:', error.message);
    res.status(500).json({ message: 'Failed to generate recipe. The AI chef is busy!' });
  }
};


// --- History Management (Protected Routes) ---

// @desc    Save a new recipe
// @route   POST /api/recipe
// @access  Private
const saveRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions, imageUrl, userInput } = req.body;
    const userId = req.user.userId; // ✅ comes from JWT

    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      imageUrl,
      userInput,
      user: userId, // ✅ schema requires "user"
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(400).json({ message: 'Error saving recipe' });
  }
};

// @desc    Get the logged-in user's recipe history
// @route   GET /api/recipe/my-history
// @access  Private
const getHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const recipes = await Recipe.find({ user: userId }).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
// @desc    Get a single recipe by its ID
// @route   GET /api/recipe/:id
// @access  Private
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Security Check: Ensure the recipe belongs to the logged-in user
    if (recipe.user.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'Not authorized to view this recipe' });
    }

    res.json(recipe);
  } catch (error) {
    console.error('Get Recipe By ID Error:', error);
    res.status(500).json({ message: 'Error fetching recipe' });
  }
};

// @desc    Delete a recipe from a user's history
// @route   DELETE /api/recipe/:id
// @access  Private
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (recipe) {
      // Security Check: Ensure the recipe belongs to the logged-in user
      if (recipe.user.toString() !== req.user.userId) {
        return res.status(401).json({ message: 'Not authorized to delete this recipe' });
      }
      await recipe.deleteOne();
      res.json({ message: 'Recipe removed successfully.' });
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Delete Recipe Error:', error);
    res.status(500).json({ message: 'Error deleting recipe' });
  }
};


// --- Helper Functions for AI APIs ---

const generateRecipeText = async (ingredients, preferences, diet) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
  const dietInstruction =
    diet && diet !== 'any'
      ? `The user has specified the diet is '${diet}'. You MUST NOT include any ingredients that violate this diet (e.g., no meat, fish, or eggs for vegetarian; no animal products for vegan).`
      : '';

  const prompt = `You are an expert AI chef. Create a unique recipe based on the provided ingredients and preferences. Respond ONLY with a valid JSON object. Do not include any text or markdown before or after the JSON. The JSON object must have these keys: "title", "description" (a short, one-sentence summary), "ingredients" (an array of objects, each with "name" and "quantity" keys), and "instructions" (A detailed, step-by-step guide for a beginner cook. Explain each step clearly. Separate steps with a newline character (\\n).). Ingredients available: ${ingredients.join(', ')}. User preferences: ${preferences || 'None'}. ${dietInstruction} Generate the recipe now.`;
  const payload = { contents: [{ parts: [{ text: prompt }] }] };
  const response = await axios.post(url, payload);
  return response.data.candidates[0].content.parts[0].text;
};

const generateRecipeImage = async (recipeTitle, diet) => {
  const apiKey = process.env.STABILITY_API_KEY;
  const url = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';
  const negative_prompts =
    diet === 'vegetarian' || diet === 'vegan'
      ? ['meat', 'fish', 'chicken', 'beef', 'pork', 'egg']
      : [];

  const payload = {
    text_prompts: [
      {
        text: `Photorealistic food photography of "${recipeTitle}", professional plating on a ceramic dish, bright natural lighting, high detail, delicious and appetizing, shallow depth of field.`,
      },
    ],
    cfg_scale: 7,
    height: 1024,
    width: 1024,
    steps: 30,
    samples: 1,
    negative_prompts: negative_prompts,
  };

  const response = await axios.post(url, payload, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}`, Accept: 'application/json' },
  });
  const base64Image = response.data.artifacts[0].base64;
  return `data:image/png;base64,${base64Image}`;
};

export {
  generateRecipe,
  saveRecipe,
  getHistory,
  deleteRecipe,
  getRecipeById,
};
