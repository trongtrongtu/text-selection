import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Highlighter from './components/Highlighter';
import reportWebVitals from './reportWebVitals';

const text = "Let there be light, let there be Sun.";

ReactDOM.render(
  <React.StrictMode>
    <Highlighter text={text} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
