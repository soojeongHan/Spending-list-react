import React from "react";
import { createGlobalStyle } from "styled-components";
import Template from "./components/Template";
import Head from "./components/Head";
import List from "./components/List";
import Create from "./components/Create";
import { Provider } from "./components/Provider";

const GlobalStyle = createGlobalStyle`
  body {
    background : #dee2e6;
  }
`;

function App() {
  return (
    <Provider>
      <GlobalStyle />
      <Template>
        <Head />
        <List />
        <Create />
      </Template>
    </Provider>
  );
}

export default App;
