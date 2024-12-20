import "@/styles/globals.css";

import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
  body{
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
    <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}
