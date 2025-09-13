import React from 'react';
import { saveRecipe } from '../api/recipeService';
import { toast } from 'react-hot-toast';

const RecipeCard = ({ recipe, userId, showSaveButton = false }) => {
  
  const handleSave = async () => {
    try {
      const payload = { ...recipe, userId };
      await saveRecipe(payload);
      toast.success('Recipe saved to your history!');
    } catch (error) {
      toast.error('Failed to save recipe. Perhaps it is already saved?');
      console.error('Save error:', error);
    }
  };

  const formattedInstructions = recipe.instructions.split('\n').filter(step => step.trim() !== '');

  return (
    <div className="bg-slate-100 dark:bg-slate-700 rounded-lg shadow-xl p-4 sm:p-6 transition-colors duration-300 animate-fade-in">
      
      {/* --- HEADER: Title and Description --- */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-emerald-500 dark:text-emerald-400 mb-2">{recipe.title}</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">{recipe.description}</p>
      </div>

      {/* --- MAIN CONTENT: Two-column layout --- */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 xl:gap-8">
        
        {/* Left Column (takes up 2/5 of the space): Image */}
        <div className="lg:col-span-2 w-full">
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="w-full h-auto object-cover rounded-lg shadow-md aspect-square" 
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/334155/94a3b8?text=Image+Not+Available'; }}
          />
        </div>

        {/* Right Column (takes up 3/5 of the space): Ingredients & Instructions */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* Ingredients Section */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-slate-700 dark:text-slate-200 border-b-2 border-emerald-500/50 pb-2">Ingredients</h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-300">
              {recipe.ingredients.map((ing, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-emerald-500 mr-2 mt-1">✓</span>
                  <span><strong>{ing.name}:</strong> {ing.quantity}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions Section */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-slate-700 dark:text-slate-200 border-b-2 border-emerald-500/50 pb-2">Instructions</h3>
            <ol className="space-y-3 text-slate-600 dark:text-slate-300">
              {formattedInstructions.map((step, index) => (
                <li key={index} className="flex">
                    <span className="bg-emerald-500 text-white rounded-full h-6 w-6 text-sm flex items-center justify-center mr-3 flex-shrink-0 font-bold">{index + 1}</span>
                    {step.substring(step.indexOf('.') + 1).trim()}
                </li>
              ))}
            </ol>
          </div>

        </div>
      </div>

      {/* --- FOOTER: Conditional Save Button --- */}
      {showSaveButton && (
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-600 text-center">
          <button 
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-md transition-transform duration-200 hover:scale-105 active:scale-100"
          >
            Save to History
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
