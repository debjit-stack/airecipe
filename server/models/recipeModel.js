import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema(
  {
    // A unique ID to link this recipe to a specific user's history,
    // even if they are anonymous.
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    // We store the ingredients as a flexible array of objects.
    ingredients: [
      {
        name: String,
        quantity: String,
      },
    ],
    instructions: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    // We also store the original user input for context.
    userInput: {
      originalIngredients: [String],
      originalPreferences: String,
      originalDiet: String,
    },
  },
  {
    // This automatically adds `createdAt` and `updatedAt` fields.
    timestamps: true,
  }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
