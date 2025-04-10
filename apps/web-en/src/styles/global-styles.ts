import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Medium.woff') format('woff');
  }
  @font-face {
      font-family: 'Pretendard';
      font-weight: 600;
      font-style: normal;
      src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-SemiBold.woff') format('woff');
  }
  @font-face {
      font-family: 'Pretendard';
      font-weight: 700;
      font-style: normal;
      src: url('https://cdn.jsdelivr.net/gh/webfontworld/pretendard/Pretendard-Bold.woff') format('woff');
  }
  @supports (font: -apple-system-body) and (-webkit-appearance: none) { img[loading="lazy"] { clip-path: inset(0.6px) } }
  body {
    font-family: "Pretendard", "Segoe UI", "Tahoma", "Arial", "Helvetica Neue",sans-serif !important; 
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
    font-family: "Pretendard", "Segoe UI", "Tahoma", "Arial", "Helvetica Neue",sans-serif !important; 
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
  .pc-hide {
    display: none !important;
  }
  @media screen and (max-width: 800px) {
    .mobile-hide {
      display: none !important;
    }
    .pc-hide {
      display: block !important;
    }
  }
`;

export default GlobalStyles;
