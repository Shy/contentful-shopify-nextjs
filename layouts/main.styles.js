import css from "styled-jsx/css";

export default css.global`
  :root {
    --blue #02548c;
    --charcoal: #404953;
    --white: #ffffff;
    --font-family-main: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  html {
    font-family: var(--font-family-main);
    font-size: 100%;
    background-color: var(--white);
  }

  body {
    font-size: 1rem;
    margin: 0;
  }

  * {
    margin: 0;
    box-sizing: border-box;
  }
`;
