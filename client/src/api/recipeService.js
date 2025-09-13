import axios from 'axios';

// Use environment variables for the API URL, with a fallback for local development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/recipe';

const generateRecipe = async (ingredients, preferences, diet) => {
  try {
    const response = await axios.post(`${API_URL}/generate`, {
      ingredients,
      preferences,
      diet,
    });
    return response.data;
  } catch (error) {
    console.error('Error generating recipe:', error);
    throw error.response?.data?.message || 'An unexpected error occurred during recipe generation.';
  }
};

const saveRecipe = async (recipeData) => {
  try {
    const response = await axios.post(`${API_URL}/save`, recipeData);
    return response.data;
  } catch (error) {
    console.error('Error saving recipe:', error);
    throw error.response?.data?.message || 'An unexpected error occurred while saving.';
  }
};

const getHistory = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/history/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error.response?.data?.message || 'An unexpected error occurred while fetching history.';
  }
};

const deleteRecipe = async (recipeId) => {
  try {
    const response = await axios.delete(`${API_URL}/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error.response?.data?.message || 'An unexpected error occurred while deleting.';
  }
};

const getRecipeById = async (recipeId) => {
  try {
    const response = await axios.get(`${API_URL}/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    throw error.response?.data?.message || 'An unexpected error occurred while fetching the recipe.';
  }
};


export { 
  generateRecipe, 
  saveRecipe, 
  getHistory, 
  deleteRecipe,
  getRecipeById
};