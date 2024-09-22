import { useFetch } from '../../hooks/useFetch'
import RecipeList from '../../components/RecipeList'
import React from 'react'

// styles
import './Home.css'

export default function Home() {
  const { data, isPending, error } = useFetch('http://localhost:3000/recipes')

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />} {/*If data is available (meaning the request has successfully fetched data), the RecipeList component is rendered. It passes the fetched data as a prop (recipes={data}) to the RecipeList component. The RecipeList component will be responsible for rendering each recipe item. */}
    </div>
  )
}