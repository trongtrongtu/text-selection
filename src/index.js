import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Highlighter from './components/Highlighter';
import reportWebVitals from './reportWebVitals';

const text = 'It wasn’t just the rules that had changed. The statistical revolution that swept into Major League Baseball shortly after the turn of the twenty-first century had arrived, with a few years’ delay, in the N.B.A., bringing a greater emphasis on three-point shooting from the corners and on finding openings near the basket, for high-percentage attempts. As a result, teams were reshuffling their depth charts in favor of mobility over size. “Small ball,” Bryant (and others) called it. The kind of versatile player, like Bryant, who could shoot well from anywhere on the court was no longer so highly prized, because twenty-foot jumpers were a low-percentage gamble, by definition. “I’ve always been more interested in the creative side of the game, like how things happen, why things happen, as opposed to just the numbers,” Bryant told me. “Numbers have never felt fun to me.<span class="custom-class"></span>”';

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
