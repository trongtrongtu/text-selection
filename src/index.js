import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Highlighter from './components/Highlighter';
import reportWebVitals from './reportWebVitals';

const text = '<b>Questions 1 to 3 refer to the following letter and e-mail.</b><br><br>May 5<br>Dary I Bean<br>Sun of a Beach Magazine<br>Gerrard Avenue<br>Los Angeles, CA 78665<br><br>Dear Mr. Bean, <br><br>As I mentioned on the phone earlier, I was at the Kitchener Beach Volleyball tournament yesterday and I took a few pictures that you might be interested in. They were taken during the qualifying and playoff rounds. <br>I have enclosed the pictures and have labeled each one. The labels include the names of the players and a description of the game. For your convenience I have summarized this information below in the following table: <br><br><table align ="center" width="90%" width="90%" border=1 cellspacing=0 cellpadding=10  style=border-collapse:collapse ><tr><td > <b>Photo (code)</b></td><td > <b>Description</b> </td><td > <b>Player names (left to right)</b></td></tr><tr><td > 9576 - Semi </td><td > Semi - finals-men </td><td > James Curry and Barry Lester </td></tr><tr><td >4321 - Semi </td><td > Semi – finals- women </td><td > Jenny Herth and Sarah Park </td></tr><tr><td > 2113 - Semi </td><td > Finals - men </td><td > Chris Denny and Nick Young </td></tr><tr><td > 32115 - Finals </td><td > Finals - women </td><td > Loren Smith and Lora Meany </td></tr></table><br><br>These are the best of the bunch, but I have many more if you are interested. <br>My sincerest regards, <br><br>James Hurley<br>Freelance photographer<br>hurles@beachblast.com <br><br>..............................................................................................................................................................................................................<br>To: James Hurley <Hurles@ Beachblast.corn><br>From: Daryl Bean <Beanie @sunofabeach.com><br>Date: May 8, 14:56<br><br>Dear Mr. Hurley, <br>Thank you for your photos. We really enjoyed the selection of shots you sent us but we will only use two of them. We would like to use 2113-Finals for the cover of our next issue, and 32115-Finals for the article. If you could, please send the negatives after you receive your remuneration. <br><br>In case you were not aware, our standard freelance photo fee is $300 per photo, with a $200 bonus for the cover shot. That means that we will pay you $800 minus the applicable taxes to your account this week. If you would, please come in this week so that we can work out the details. <br>Thanks again, <br><br>Daryl Bean<br>Sun of a Beach Magazine';

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
