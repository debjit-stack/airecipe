import axios from 'axios';
import 'dotenv/config';

// @desc    Generate a new recipe with text and an image
// @route   POST /api/recipe/generate
// @access  Public
const generateRecipe = async (req, res) => {
  const { ingredients, preferences } = req.body;

  if (!ingredients || !ingredients.length) {
    return res.status(400).json({ message: 'Ingredients are required.' });
  }

  try {
    // Step 1: Generate the recipe text using Google Gemini
    const recipeTextResponse = await generateRecipeText(ingredients, preferences);
    
    // Clean the AI response to ensure it's valid JSON before parsing
    const cleanedResponse = recipeTextResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    const recipeJson = JSON.parse(cleanedResponse);

    // Step 2: Generate a matching image using Stability AI
    const imageUrl = await generateRecipeImage(recipeJson.title);

    // Step 3: Combine the text and image URL into a final object
    const finalRecipe = {
      ...recipeJson,
      imageUrl: imageUrl,
    };

    // Step 4: Send the complete recipe back to the user
    res.status(200).json(finalRecipe);

  } catch (error) {
    console.error('Error in generateRecipe:', error.message);
    if (error.response) {
      console.error('API Error Details:', error.response.data);
    }
    res.status(500).json({ message: 'Failed to generate recipe. The AI chef is busy!' });
  }
};


// --- Helper Functions for AI APIs ---

// Calls the Google Gemini API to generate the recipe text
const generateRecipeText = async (ingredients, preferences) => {
  const apiKey = process.env.GEMINI_API_KEY;

  // Checks if the API key is being loaded correctly from the .env file.
  console.log('Attempting to use Gemini API Key:', apiKey ? 'Loaded' : 'undefined');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  const prompt = `
    You are an expert AI chef. Create a unique recipe based on the provided ingredients and preferences.

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


// Calls the Stability AI API to generate the recipe image
const generateRecipeImage = async (recipeTitle) => {
  const apiKey = process.env.STABILITY_API_KEY;
  // --- THIS IS THE FIX ---
  // Updated the URL to use a current, available model engine.
  const url = 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image';
  // --- END FIX ---
  
  const prompt = `Photorealistic food photography of "${recipeTitle}", professional plating on a white ceramic dish, bright natural lighting, high detail, delicious and appetizing, shallow depth of field.`;

  const payload = {
    text_prompts: [{ text: prompt }],
    cfg_scale: 7,
    height: 1024, // Using 1024x1024 for the XL model
    width: 1024,
    steps: 30,
    samples: 1,
  };

  const response = await axios.post(url, payload, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
  });

  const base64Image = response.data.artifacts[0].base64;
  return `data:image/png;base64,${base64Image}`;
};


export { generateRecipe };

