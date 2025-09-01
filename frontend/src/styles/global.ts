
import { createGlobalStyle } from "styled-components";

import { colors } from "./colors";

export const GlobalStyle = createGlobalStyle`
  html{
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
  }

  input:focus, select:focus {
    outline: none !important;
    border: 1px solid ${colors.primary00} !important;
  }

  input:hover, select:hover {
    outline: none !important;
    border: 1px solid ${colors.neutral90} !important;
  }

  input[type="checkbox"] {
    border-radius: 0;
    width: 14px;
    height: 14px;
  }
  input[type="checkbox"]:checked {
    background-color: ${colors.primary00};
    accent-color: ${colors.primary00};
    border-radius: 0;
  }
`;