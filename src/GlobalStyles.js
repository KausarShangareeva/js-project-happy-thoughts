import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

  
  *, *::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
  font-family: "Montserrat", sans-serif;
  color: #323232ff;
  font-size: 16px; 
  margin: 0 auto;
  min-height: 100vh; 
}

body {
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
}

#root {
  width: 100%;
}

 

  a {
    text-decoration: none;
    color: inherit;
  }

  :root {
  /* Цвета фона */
  --bg-form: #dee2e6;
  --bg-quote: #f8f9fa;
  --bg-like: #dee2e6;
  --bg-active: #ff8787;
  --bg-active-hover:  #fa5252;
  --color-font: #323232ff;

  --h1-size: 20px;
  --h2-size: 16px;
  --h3-size: 18px;
  --p-size: 16px;

  --radius: 10px;
  --radius-button: 30px;
  --radius-circle: 50%;
  --radius-input: 8px;

  --shadow: 15px 15px 0 #343a40;
}

`;
