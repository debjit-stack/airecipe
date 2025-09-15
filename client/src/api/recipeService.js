import axios from 'axios';

//const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/recipe';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api/recipe`;

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

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
    const response = await axios.post(`${API_URL}/save`, recipeData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error saving recipe:', error);
    throw error.response?.data?.message || 'An unexpected error occurred while saving.';
  }
};

const getHistory = async () => {
  try {
    const response = await axios.get(`${API_URL}/history`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error.response?.data?.message || 'An unexpected error occurred while fetching history.';
  }
};

const deleteRecipe = async (recipeId) => {
  try {
    const response = await axios.delete(`${API_URL}/${recipeId}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error.response?.data?.message || 'An unexpected error occurred while deleting.';
  }
};

const getRecipeById = async (recipeId) => {
  try {
    const response = await axios.get(`${API_URL}/${recipeId}`, {
      headers: getAuthHeader()
    });
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