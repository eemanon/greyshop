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

//data for questionnaire
import section1 from './data/questionsSection1.json';
import section2 from './data/questionsSection2.json';

function App() {
  const [progressState, setProgress] = useState( 1 );
  const titles = ["Bienvenue", "Consentement", "Instructions", "Shop", "Questionnaire", "Dice Game"];
  const drawerWidth = 240;
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
            <Store next={() => { history.push("/questionnaire_section1");setProgress(5);}}>
            </Store>
          </Route>
          <Route path='/questionnaire_section1'>
            <Questionnaire data={section1} next={() => { history.push("/questionnaire_section2");setProgress(6);}}>
            </Questionnaire>
          </Route>
          <Route path='/questionnaire_section2'>
            <Questionnaire data={section2} next={() => { history.push("/dicegame");setProgress(6);}}>
            </Questionnaire>
          </Route>
          {/* <Route path='/questionnaire_section3'>
            <Questionnaire next={() => { history.push("/questionnaire_section4");setProgress(6);}}>
            </Questionnaire>
          </Route>
          <Route path='/questionnaire_section4'>
            <Questionnaire next={() => { history.push("/questionnaire_section5");setProgress(6);}}>
            </Questionnaire>
          </Route>
          <Route path='/questionnaire_section5'>
            <Questionnaire next={() => { history.push("/questionnaire_section6");setProgress(6);}}>
            </Questionnaire>
          </Route>
          <Route path='/questionnaire_section6'>
            <Questionnaire next={() => { history.push("/questionnaire_section7");setProgress(6);}}>
            </Questionnaire>
          </Route>
          <Route path='/questionnaire_section7'>
            <Questionnaire next={() => { history.push("/questionnaire_section8");setProgress(6);}}>
            </Questionnaire>
          </Route>
          <Route path='/questionnaire_section8'>
            <Questionnaire next={() => { history.push("/questionnaire_section9");setProgress(6);}}>
            </Questionnaire>
          </Route>
          <Route path='/questionnaire_section9'>
            <Questionnaire next={() => { history.push("/questionnaire_section10");setProgress(6);}}>
            </Questionnaire>
          </Route>
          <Route path='/questionnaire_section10'>
            <Questionnaire next={() => { history.push("/questionnaire_section11");setProgress(6);}}>
            </Questionnaire>
          </Route>
          <Route path='/questionnaire_section11'>
            <Questionnaire next={() => { history.push("/dicegame");setProgress(6);}}>
            </Questionnaire>
          </Route> */}
          <Route path='/dicegame'>
            <DiceGame>
            </DiceGame>
          </Route>
      </Router>
    </div>
  );
}

export default App;