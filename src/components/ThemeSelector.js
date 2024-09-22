import { useTheme } from '../hooks/useTheme'  // Import the custom hook `useTheme` to access theme-related state and functions.
import React from 'react'
import modeIcon from '../assets/mode-icon.svg'  // Import an icon (SVG) for toggling between dark and light modes.

// styles
import './ThemeSelector.css'  // Import the CSS for styling this component.

// Define an array of theme colors that users can choose from.
const themeColors = ['#58249c', '#249c6b', '#b70233']  // These are example color codes for theme selection.

export default function ThemeSelector() {
    // Destructure `changeColor`, `changeMode`, and `mode` from the `useTheme` hook.
    // `changeColor`: Function to change the theme color.
    // `changeMode`: Function to change the theme mode (light or dark).
    // `mode`: Current mode (either 'light' or 'dark').
    const { changeColor, changeMode, mode } = useTheme()

    // Function to toggle between light and dark modes.
    const toggleMode = () => {
        changeMode('light' === mode ? 'dark' : 'light')  // If the current mode is 'light', change to 'dark', otherwise switch to 'light'.
    }

    return (
        <div className="theme-selector">
            {/* Mode Toggle Section */}
            <div className="mode-toggle">
                {/* Render an image (mode icon) that toggles between light/dark mode when clicked. */}
                <img 
                    onClick={toggleMode}  // Call `toggleMode` when the icon is clicked.
                    src={modeIcon}  // Display the mode icon (light/dark toggle image).
                    alt='dark/light toggle icon'  // Provide alt text for accessibility.
                    style={{
                        // Apply a filter to the icon based on the current mode.
                        // If the mode is 'dark', invert the colors (makes it white); otherwise, use a slight invert.
                        filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)'
                    }}
                />
            </div>

            {/* Theme Color Selection Buttons */}
            <div className="theme-buttons">
                {/* Loop through the `themeColors` array and create a button for each color. */}
                {themeColors.map(color => (
                    <div
                        key={color}  // Assign a unique key to each color for React's reconciliation process.
                        onClick={() => changeColor(color)}  // When a color button is clicked, change the theme color to the selected one.
                        style={{ background: color }}  // Set the background color of the button to the respective color.
                    />
                ))}
            </div>
        </div>
    )
}
