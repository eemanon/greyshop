import React, { useRef, useState } from 'react';
import './App.css';
import HeaderBar from './HeaderBar.js'
import {Router}  from 'react-router-dom';
import {Route} from 'react-router-dom';
import history from './history';

import StudentLogin from './StudentLogin.js'
import Terms from './Terms.js'
import Instructions from './Instructions.js'
import Store from './Store.js'
import DiceGame from './DiceGame.js'
import Questionnaire from './Questionnaire.js'

function App() {
  const [progressState, setProgress] = useState( 1 );
  const titles = ["Bienvenue", "Consentement", "Instructions", "Shop", "Questionnaire", "Dice Game"];


  return (
    <div className="App">
      <HeaderBar titletext={titles[progressState-1]} progress={progressState} total={titles.length}></HeaderBar>
      <Router history={history}>
          <Route exact path='/'>
            <StudentLogin next={() => { history.push("/consent");setProgress(2);}}>
            </StudentLogin>
          </Route>
          <Route path='/consent'>
            <Terms next={() => { history.push("/instructions");setProgress(3);}}>
            </Terms>
          </Route>
          <Route path='/instructions'>
            <Instructions next={() => { history.push("/store");setProgress(4);}}>
            </Instructions>
          </Route>
          <Route path='/store'>
            <Store next={() => { history.push("/questionnaire");setProgress(5);}}>
            </Store>
          </Route>
          <Route path='/questionnaire'>
            <Questionnaire next={() => { history.push("/dicegame");setProgress(6);}}>
            </Questionnaire>
          </Route>
          <Route path='/dicegame'>
            <DiceGame next={() => { history.push("/questionnaire");setProgress(7);}}>
            </DiceGame>
          </Route>
      </Router>
    </div>
  );
}

export default App;