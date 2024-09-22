import React from 'react';  // Import React, which is necessary to use JSX and create React components.
import ReactDOM from 'react-dom/client';  // Import ReactDOM to render the app into the DOM.
import './index.css';  // Import the global CSS file to apply styles.
import App from './App';  // Import the main `App` component, which will be the root component of the application.
import { ThemeProvider } from './context/ThemeContext.js';  // Import the `ThemeProvider` from the `ThemeContext` file to provide the theme context globally.

const root = ReactDOM.createRoot(document.getElementById('root'));  // Select the DOM element with id 'root' where the app will be rendered.
root.render(
  <React.StrictMode>  // Enable React's strict mode to highlight potential issues in the application.
    {/* Wrap the `App` component inside the `ThemeProvider` so that the theme context is available throughout the app. */}
    <ThemeProvider>
      <App />  {/* Render the main `App` component which serves as the root of the component tree. */}
    </ThemeProvider>  
  </React.StrictMode>
);


