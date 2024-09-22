import { Link } from 'react-router-dom'
import React from 'react';
import { useTheme } from '../hooks/useTheme';

// styles
import './RecipeList.css'

export default function RecipeList({ recipes }) // destructuring the props recipes passed from Home component
{
  const { mode } = useTheme();

  // If there are no recipes, display an error message.
  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>
  }

  return (
    <div className="recipe-list">
      {/* Loop through the recipes array and render a card for each one. */}
      {recipes.map(recipe => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to cook <span role="img" aria-label="cutlery">🍴</span>.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
        </div>
      ))}
    </div>
  )
}