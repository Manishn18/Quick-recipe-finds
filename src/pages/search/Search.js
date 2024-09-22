import { useFetch } from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import RecipeList from "../../components/RecipeList";
import "./Search.css";
import React from 'react'

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q');
  
  // Define the URL to fetch recipes based on the search query (e.g., 'http://localhost:3000/recipes?q=pizza')
  const url = `http://localhost:3000/recipes?q=${query}`;

  // Use the `useFetch` custom hook to fetch data from the API.
  // The hook returns an object with `error`, `isPending` (loading state), and `data` (fetched recipes).
  const { error, isPending, data } = useFetch(url);

  // Filter the fetched data based on the search query to match the recipe title.
  const filteredData = data && data.filter(recipe =>
    recipe.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h2 className="page-title">Recipes including "{query}"</h2>

      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      
      {/* If there is filtered data (recipes), pass it to the RecipeList component to display */}
      {filteredData && <RecipeList recipes={filteredData} />}
    </div>
  );
}

