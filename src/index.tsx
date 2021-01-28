import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, HashRouter} from "react-router-dom";
import {ApolloProvider} from "@apollo/client";
import {client} from "./api/client";
import AppContainer from "./AppContainer";

ReactDOM.render(
  <React.StrictMode>
    {/*Temporary solution for GH Pages*/}
      <HashRouter>
          <ApolloProvider client={client}>
    <AppContainer />
          </ApolloProvider>
      </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
