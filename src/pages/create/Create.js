import { useState, useRef, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useHistory } from 'react-router-dom'
import React from 'react'

// styles
import './Create.css'

export default function Create() {  
  const [title, setTitle] = useState('') // the title of the recipe
  const [method, setMethod] = useState('') // the method of preparing the recipe 
  const [cookingTime, setCookingTime] = useState('') // the time it takes to cook the recipe
  const [newIngredient, setNewIngredient] = useState('') // the new ingredient added to the recipe
  const [ingredients, setIngredients] = useState([]) // State to store all added ingredients

  // useRef to reference the input field so we can focus on it after adding an ingredient
  const ingredientInput = useRef(null)

  // useFetch is a custom hook to make POST requests to an API, returning a function (postData) to send data and the response data 
  const { postData, data } = useFetch('http://localhost:3000/recipes', 'POST')

  // useHistory is used to programmatically navigate to another route after the form submission
  const history = useHistory()
  
  const handleSubmit = (e) => {
    e.preventDefault()  // Prevent default form submit behavior (which would refresh the page)

    // Submit the form data using postData
    postData(
        { title, 
          ingredients, 
          method, 
          cookingTime: cookingTime + ' minutes' 
        }
      ) 
  }

  // Function to handle adding an ingredient
  const handleAdd = (e) => {
    e.preventDefault() // Prevent default form submit behavior (which would refresh the page)
    const ing = newIngredient.trim() // Trim white spaces from the ingredient input

    // Add the new ingredient to the list if it's non-empty and not already in the list
    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }
    setNewIngredient('') // Clear the input field after adding the ingredient
    ingredientInput.current.focus() // Refocus the input field for adding the next ingredient
  }

  // useEffect to redirect the user to the homepage once the form data has been successfully posted (when `data` changes)
  useEffect(() => {
    if (data) {
      history.push('/') // Redirect the user to the homepage once the POST request is successful
    }
  }, [data, history]) // The effect runs whenever 'data' or 'history' changes

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>

        <label>
          <span>Recipe title:</span>
          <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input 
              type="text" 
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput} // Link this input field to ingredientInput ref to focus it programmatically
            />
            <button onClick={handleAdd} className="btn">add</button>
          </div>
        </label>

        {/* Display the list of currently added ingredients */}
        <p>Current ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>

        <label>
          <span>Recipe Method:</span>
          <textarea 
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input 
            type="number" 
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required 
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  )
}