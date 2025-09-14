import mongoose from 'mongoose';

const recipeSchema = mongoose.Schema(
  {
    // This is the key change. We are now linking to a User document.
    user: {
      type: mongoose.Schema.Types.ObjectId, // This stores the unique ID of a user document
      required: true,
      ref: 'User', // This creates a formal reference to our 'User' model
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
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
    userInput: {
      originalIngredients: [String],
      originalPreferences: String,
      originalDiet: String,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;

