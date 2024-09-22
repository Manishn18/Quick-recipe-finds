import { BrowserRouter, Switch, Route } from 'react-router-dom'

// page components
import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Search from './pages/search/Search'
import Recipe from './pages/recipe/Recipe'
import React from 'react'
import ThemeSelector from './components/ThemeSelector'


// styles
import './App.css'
import { useTheme } from './hooks/useTheme'

/*
Each <Route> component specifies a path and renders a corresponding page component (Home, Create, Search, or Recipe) when that path is matched.
*/


function App() {
  const { mode } = useTheme()

    
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter> 
        <Navbar />
        <ThemeSelector />
        <Switch>
          {/* Home page */}
          <Route exact path="/">
            <Home />
          </Route>
          {/* Create page */}
          <Route path="/create">
            <Create />
          </Route>
          {/* Search page */}
          <Route path="/search">
            <Search />
          </Route>
          {/* Recipe page */}

          {/* The Recipe component will receive the id parameter as a prop, and can use it to fetch or display the corresponding recipe data. For example: /recipes/123, recipes/abc, recipes/xyz/ */}
          
          <Route path="/recipes/:id">
            <Recipe />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App
