import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import React from 'react'

// styles
import './Navbar.css'

// components
import Searchbar from './SearchBar'

export default function Navbar() {
  const { color } = useTheme()

  return (
    <div className="navbar" style = {{ background: color}}>
      <nav>
        <Link to="/" className="brand">
          <h1>Cooking Ninja</h1>
        </Link>
        <Searchbar />
        <Link to="/create">Create Recipe</Link> {/* When you click on the "Create Recipe" link, you will be redirected to the /create URL without reloading the page, thanks to React Router's client-side navigation. */}
      </nav>
    </div>
  )
}