export default `

  html, body {
    overflow-y: auto !important;
  }
  
  [aria-label="Back"] {
    display: none !important;
  }
  
  [role="banner"]{
    opacity: 0;
  }

  .show-arrow [aria-label="Back"] {
    display: flex !important;
  }
`;
