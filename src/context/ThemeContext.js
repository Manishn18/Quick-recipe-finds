import { createContext, useReducer } from 'react'  // Import createContext and useReducer from React.
import React from 'react'

// Create the ThemeContext that will be used to provide and consume theme-related state.
export const ThemeContext = createContext()

// Define the reducer function for managing theme-related actions.
const themeReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_COLOR':  // If the action type is 'CHANGE_COLOR', update the color in the state.
            return { ...state, color: action.payload }  // Use action.payload to update the color.
        case 'CHANGE_MODE':  // If the action type is 'CHANGE_MODE', update the mode (like 'light' or 'dark').
            return { ...state, mode: action.payload }  // Update the mode using the value from action.payload.
        default:
            return state  // If the action type doesn't match, return the current state (no changes).
    }
}

// Define the ThemeProvider component that will wrap other components to provide theme state.
export function ThemeProvider({ children }) {  // Accept children components that will be wrapped by this provider.

    // useReducer hook initializes the theme state and handles state changes with the reducer function.
    const [state, dispatch] = useReducer(themeReducer, {
        color: '#58249c',  // Initial state with default color '#58249c'.
        mode: 'dark'  // Initial state with default mode 'dark'.
    })

    // Function to change the theme color. Dispatches a 'CHANGE_COLOR' action with the new color.
    const changeColor = (color) => {
        dispatch({ type: 'CHANGE_COLOR', payload: color })  // payload is the new color.
    }

    // Function to change the theme mode (e.g., from 'dark' to 'light'). Dispatches a 'CHANGE_MODE' action.
    const changeMode = (mode) => {
        dispatch({ type: 'CHANGE_MODE', payload: mode })  // payload is the new mode (e.g., 'light' or 'dark').
    }

    // Return the ThemeContext provider to supply the theme state and functions (changeColor, changeMode)
    // to all the children components that are wrapped by ThemeProvider.
    return (
        <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
            { children }  {/*Render the children components inside this provider. */}
        </ThemeContext.Provider>
    )
}
