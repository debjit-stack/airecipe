import React, { useState, useEffect } from "react";
import { generateRecipe } from "../api/recipeService";
import RecipeCard from "../components/RecipeCard";
import { toast, Toaster } from "react-hot-toast";

const HomePage = () => {
  const [ingredients, setIngredients] = useState("");
  const [preferences, setPreferences] = useState("");
  const [diet, setDiet] = useState("any"); // State for the diet dropdown
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get the user ID from local storage when the component mounts
    const storedUserId = localStorage.getItem("recipeRemixerUserId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);


  const handleGenerateRecipe = async (e) => {
    e.preventDefault();
    if (!ingredients) {
      toast.error("Please enter some ingredients.");
      return;
    }

    setError("");
    setRecipe(null);
    setIsLoading(true);
    const loadingToast = toast.loading('Remixing your recipe...');

    const ingredientsArray = ingredients.split(",").map((item) => item.trim());

    try {
      const data = await generateRecipe(ingredientsArray, preferences, diet);
      setRecipe(data);
      toast.success('Your recipe is ready!', { id: loadingToast });
    } catch (err) {
      const errorMessage = String(err.message || err);
      setError(errorMessage);
      toast.error(errorMessage, { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#334155', // slate-700
            color: '#fff',
          },
        }}
      />
      <div className="min-h-screen bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-4 sm:p-8 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-emerald-500 dark:text-emerald-400">
              AI Recipe Remixer
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Turn your pantry into a cookbook. Let the AI chef work its magic!
            </p>
          </header>

          <form onSubmit={handleGenerateRecipe} className="bg-slate-100 dark:bg-slate-700 p-6 rounded-lg shadow-lg mb-8 transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="ingredients" className="block text-slate-600 dark:text-slate-300 font-medium mb-2">
                  Ingredients (comma-separated)
                </label>
                <input
                  type="text"
                  id="ingredients"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="e.g., chicken breast, broccoli, garlic"
                  required
                />
              </div>
              <div>
                <label htmlFor="diet" className="block text-slate-600 dark:text-slate-300 font-medium mb-2">
                  Dietary Type
                </label>
                <select 
                  id="diet"
                  value={diet}
                  onChange={(e) => setDiet(e.target.value)}
                  className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="any">Any</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>
            </div>
             <div className="mb-4">
              <label htmlFor="preferences" className="block text-slate-600 dark:text-slate-300 font-medium mb-2">
                Other Preferences (optional)
              </label>
              <input
                type="text"
                id="preferences"
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="e.g., spicy, gluten-free, Italian"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-md transition-transform duration-200 hover:scale-105 active:scale-100 disabled:bg-slate-500 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Remixing...' : 'Remix my Recipe!'}
            </button>
          </form>

          <div className="mt-8">
            {error && !isLoading && <p className="text-center text-red-400 bg-red-900/50 p-4 rounded-md">{`Error: ${error}`}</p>}
            
            {isLoading && (
              <div className="text-center text-lg text-slate-500 dark:text-slate-400">
                <p>Asking the AI chef, please wait...</p>
                {/* Optional: Add a spinner component here */}
              </div>
            )}
            
            {recipe && <RecipeCard recipe={recipe} userId={userId} showSaveButton={true} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

