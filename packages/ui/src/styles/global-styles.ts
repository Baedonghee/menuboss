import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  @supports (font: -apple-system-body) and (-webkit-appearance: none) { img[loading="lazy"] { clip-path: inset(0.6px) } }
  body {
    font-family: "Manrope", "Segoe UI", "Tahoma", "Arial", "Helvetica Neue",sans-serif !important; 
    -ms-text-size-adjust:100%;
    -webkit-text-size-adjust:100%;
    font-weight:500;
    background:#fff;
    -webkit-box-sizing:border-box;
    -moz-box-sizing:border-box;
    box-sizing:border-box;
    line-height: normal;
  }
  * {
    font-family: "Manrope", "Segoe UI", "Tahoma", "Arial", "Helvetica Neue",sans-serif !important; 
    box-sizing:border-box;
  }
  a{
    text-decoration: none;
    color: inherit; 
  }         
  *{    
    box-sizing: border-box;
  }
  input, textarea {
    -moz-user-select: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;  
    user-select: auto;
  }
  input:focus {
    outline: none;  
  }   

  button {
    border: none;
    background: none;   
    padding: 0;
    cursor: pointer;
  }
  ul {
    list-style: none;
  }
  .visually-hidden {
    display: none;
  }
  .underline:hover {
    text-decoration: underline;
  }
  .Toastify__toast-container {
    padding: 0 !important;
    min-width: 342px !important;
    max-width: 400px !important;
    width: auto !important
  }
`;

export default GlobalStyles;
