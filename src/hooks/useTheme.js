import { useContext } from 'react'            // Import the useContext hook from React.
import { ThemeContext } from '../context/ThemeContext'  // Import ThemeContext .

export const useTheme = () => {              // Define a custom hook called useTheme.
    const context = useContext(ThemeContext)  // Access the value of ThemeContext using the useContext hook.
    
    // If the hook is used outside of a ThemeProvider (the context provider), throw an error.
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }

    return context;  // If the context is valid (not undefined), return the context value.
}