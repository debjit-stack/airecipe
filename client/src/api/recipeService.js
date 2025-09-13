// client/src/api/recipeService.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/recipe';

const generateRecipe = async (ingredients, preferences) => {
  try {
    const response = await axios.post(`${API_URL}/generate`, {
      ingredients,
      preferences,
    });
    return response.data;
  } catch (error) {
    console.error('Error generating recipe:', error);
    // Re-throw the error to be handled by the component
    throw error.response.data.message || 'An unexpected error occurred.';
  }
};

export { generateRecipe };