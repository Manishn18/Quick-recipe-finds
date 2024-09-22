import { useParams } from 'react-router-dom'; // A hook from react-router-dom that allows access to URL parameters. Here it's used to get the id of the recipe from the URL.
import { useFetch } from '../../hooks/useFetch';
import React from 'react';

// styles
import './Recipe.css';
import { useTheme } from '../../hooks/useTheme';

export default function Recipe() {
  const { id } = useParams(); // This hook retrieves the id from the URL (e.g., /recipe/123 will set id to 123). This id is then used to fetch the specific recipe data from the API.
  const url = 'http://localhost:3000/recipes/' + id; // The recipe id is appended to a base URL to fetch details for a specific recipe. In this case, the data is fetched from http://localhost:3000/recipes/123 (if id is 123).
  const { error, isPending, data: recipe } = useFetch(url);
  const { mode } = useTheme()

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>} 
      {isPending && <p className="loading">Loading...</p>}
      {/*If the data is successfully fetched (recipe exists), the recipe details are displayed.*/}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <div className="method">
            {recipe.method.split(/\d\.\s?/).map((step, index) => (
              step.trim() && <p key={index}>{index}. {step.trim()}</p>
            ))} {/*The steps are split on a regular expression /\d\.\s?/, which matches numbers followed by a dot and optional space (e.g., "1. ", "2. ").*/}
          </div>
        </>
      )}
    </div>
  );
}
