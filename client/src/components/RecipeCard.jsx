import React from 'react';
import { saveRecipe } from '../api/recipeService';
import { toast } from 'react-hot-toast';

const RecipeCard = ({ recipe, showSaveButton = false }) => {
  
  const handleSave = async () => {
    try {
      await saveRecipe(recipe);
      toast.success('Recipe saved to your history!');
    } catch (error) {
      toast.error('Failed to save recipe. Please try again.');
      console.error('Save error:', error);
    }
  };

  const formatInstructions = (instructions) => {
    if (!instructions) return [];
    
    const steps = instructions.split('\n').filter(step => step.trim() !== '');
    return steps.map(step => {
      const cleanedStep = step.replace(/^\d+\.\s*/, '').trim();
      return cleanedStep;
    });
  };

  const formattedInstructions = formatInstructions(recipe.instructions);

  return (
    <div className="bg-slate-100 dark:bg-slate-700 rounded-lg shadow-xl p-4 sm:p-6 transition-colors duration-300">
      
      <div className="mb-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-emerald-500 dark:text-emerald-400 mb-2">
          {recipe.title}
        </h2>
        {recipe.description && (
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {recipe.description}
          </p>
        )}
      </div>

      <div className="mb-6">
        {recipe.imageUrl ? (
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-md mx-auto" 
            onError={(e) => { 
              e.target.onerror = null; 
              e.target.src='https://placehold.co/800x400/334155/94a3b8?text=Recipe+Image'; 
            }}
          />
        ) : (
          <div className="w-full h-64 sm:h-80 lg:h-96 bg-slate-300 dark:bg-slate-600 rounded-lg shadow-md flex items-center justify-center">
            <span className="text-slate-500 dark:text-slate-400">No Image Available</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
        
        <div>
          <h3 className="text-xl font-semibold mb-3 text-slate-700 dark:text-slate-200 border-b-2 border-emerald-500/50 pb-2">
            Ingredients
          </h3>
          {recipe.ingredients && recipe.ingredients.length > 0 ? (
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              {recipe.ingredients.map((ing, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-emerald-500 mr-2 mt-1 flex-shrink-0">✓</span>
                  <span>
                    <strong>{ing.name}:</strong> {ing.quantity}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 dark:text-slate-400">No ingredients listed</p>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-slate-700 dark:text-slate-200 border-b-2 border-emerald-500/50 pb-2">
            Instructions
          </h3>
          {formattedInstructions.length > 0 ? (
            <ol className="space-y-3 text-slate-600 dark:text-slate-300">
              {formattedInstructions.map((step, index) => (
                <li key={index} className="flex">
                  <span className="bg-emerald-500 text-white rounded-full h-6 w-6 text-sm flex items-center justify-center mr-3 flex-shrink-0 font-bold">
                    {index + 1}
                  </span>
                  <span className="flex-1">{step}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-slate-500 dark:text-slate-400">No instructions available</p>
          )}
        </div>
      </div>

      {recipe.userInput && (
        <div className="mt-6 bg-slate-200 dark:bg-slate-600 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
            Original Request:
          </h4>
          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
            {recipe.userInput.originalIngredients && (
              <p>
                <span className="font-medium">Ingredients:</span> {recipe.userInput.originalIngredients.join(', ')}
              </p>
            )}
            {recipe.userInput.originalDiet && (
              <p>
                <span className="font-medium">Diet:</span> {recipe.userInput.originalDiet}
              </p>
            )}
            {recipe.userInput.originalPreferences && (
              <p>
                <span className="font-medium">Preferences:</span> {recipe.userInput.originalPreferences}
              </p>
            )}
          </div>
        </div>
      )}

      {showSaveButton && (
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-600 text-center">
          <button 
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-md transition-all duration-200 hover:scale-105 active:scale-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            💾 Save to History
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;