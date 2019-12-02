export default `

  body {
    overflow-y: auto !important;
  }

  nav {
    display: none !important;
  }

  header {
    opacity: 0 !important;
    height: 0;
    width: 0 !important;
    pointer-events: none;
    max-height: 0;
  }

  [role="banner"]{
    opacity: 0;
  }

  [aria-label="More"] {
    opacity: 0 !important;
    pointer-events: none !important;
  }

  [data-testid="sidebarColumn"] {
    display: none !important;
  }

  [data-testid="fab-tweet"] {
    display: none !important;
  }

  div[role="menu"] {
    visibility: hidden;
  }
  @media (max-width: 1000px) {
    header {
      display: flex !important;
    }
  }

  [href="/settings/safety"] {
    display: none;
  }

  .hide-arrow [aria-label="Back"] {
    display: none !important;
  }

`;
