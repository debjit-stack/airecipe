import Recipe from '../models/recipeModel.js';
import axios from 'axios';
import 'dotenv/config';

// @desc    Generate a new recipe with text and an image
// @route   POST /api/recipe/generate
// @access  Public
const generateRecipe = async (req, res) => {
  const { ingredients, preferences, diet } = req.body;

  if (!ingredients || ingredients.length === 0) {
    return res.status(400).json({ message: 'Ingredients are required.' });
  }
  
  console.log('Attempting to use Gemini API Key:', process.env.GEMINI_API_KEY ? 'Loaded' : 'Undefined');

  try {
    const recipeTextResponse = await generateRecipeText(ingredients, preferences, diet);
    const cleanedResponse = recipeTextResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    const recipeJson = JSON.parse(cleanedResponse);

    const imageUrl = await generateRecipeImage(recipeJson.title, diet);

    const finalRecipe = {
      ...recipeJson,
      imageUrl: imageUrl,
      userInput: {
        originalIngredients: ingredients,
        originalPreferences: preferences,
        originalDiet: diet,
      }
    };

    res.status(200).json(finalRecipe);

  } catch (error) {
    console.error('Error in generateRecipe:', error.message);
    if (error.response) {
      console.error('API Error Details:', error.response.data);
    }
    res.status(500).json({ message: 'Failed to generate recipe. The AI chef is busy!' });
  }
};

// @desc    Save a generated recipe
// @route   POST /api/recipe/save
// @access  Public
const saveRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions, imageUrl, userInput, userId } = req.body;
    const newRecipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      imageUrl,
      userInput,
      userId,
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(400).json({ message: 'Error saving recipe' });
  }
};

// @desc    Get all recipes for a user
// @route   GET /api/recipe/history/:userId
// @access  Public
const getHistory = async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.params.userId });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Delete a recipe
// @route   DELETE /api/recipe/:id
// @access  Public
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      await recipe.deleteOne();
      res.json({ message: 'Recipe removed successfully.' });
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single recipe by its ID
// @route   GET /api/recipe/:id
// @access  Public
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


// --- Helper Functions ---
const generateRecipeText = async (ingredients, preferences, diet) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  let dietInstruction = '';
  if (diet === 'vegetarian') {
    dietInstruction = 'This is a vegetarian dish. You MUST NOT include any meat, fish, or eggs.';
  } else if (diet === 'vegan') {
    dietInstruction = 'This is a vegan dish. You MUST NOT include any meat, fish, eggs, dairy, or honey.';
  }

  const prompt = `
    You are an expert AI chef. Create a unique recipe based on the provided ingredients and preferences.
    ${dietInstruction}
    Provide a detailed, step-by-step guide for a beginner cook. Explain each step clearly.

    Respond ONLY with a valid JSON object. Do not include any text or markdown before or after the JSON.

    The JSON object must have these keys:
    - "title": A creative recipe title.
    - "description": A short, one-sentence summary.
    - "ingredients": An array of objects, each with "name" and "quantity" keys.
    - "instructions": A single string with numbered steps separated by a newline character (\\n).

    Ingredients available: ${ingredients.join(', ')}
    User preferences: ${preferences || 'None'}

    Generate the recipe now.
  `;

  const payload = { contents: [{ parts: [{ text: prompt }] }] };

  const response = await axios.post(url, payload);
  return response.data.candidates[0].content.parts[0].text;
};

const generateRecipeImage = async (recipeTitle, diet) => {
  const apiKey = process.env.STABILITY_API_KEY;
  const url = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';
  
  let negative_prompts = ["blurry, bad quality"];
  if (diet === 'vegetarian' || diet === 'vegan') {
    negative_prompts.push("egg", "meat", "fish", "chicken", "beef", "pork");
  }
  if (diet === 'vegan') {
      negative_prompts.push("cheese", "dairy", "honey");
  }

  const prompt = `Photorealistic food photography of "${recipeTitle}", professional plating on a ceramic dish, bright natural lighting, high detail, delicious and appetizing, shallow depth of field.`;

  const payload = {
    text_prompts: [{ text: prompt }],
    cfg_scale: 7,
    height: 1024,
    width: 1024,
    steps: 30,
    samples: 1,
    negative_prompts: negative_prompts,
  };

  const response = await axios.post(url, payload, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
  });

  const base64Image = response.data.artifacts[0].base64;
  return `data:image/png;base64,${base64Image}`;
};


export { 
  generateRecipe, 
  saveRecipe, 
  getHistory, 
  deleteRecipe,
  getRecipeById
};