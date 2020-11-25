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
import section3 from './data/questionsSection3.json';
import section4 from './data/questionsSection4.json';
import section5 from './data/questionsSection5.json';
import section6 from './data/questionsSection6.json';
import section7 from './data/questionsSection7.json';
import section8 from './data/questionsSection8.json';
import section9 from './data/questionsSection9.json';
import section11 from './data/questionsSection11.json';
import section12 from './data/questionsSection12.json';

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
            <Questionnaire data={section2} next={() => { history.push("/questionnaire_section3");setProgress(6);}}>
            </Questionnaire>
          </Route>
          <Route path='/questionnaire_section3'>
            <Questionnaire data={section3} next={() => { history.push("/questionnaire_section4");setProgress(6);}}>
            </Questionnaire>
          </Route>
          <Route path='/questionnaire_section4'>
            <Questionnaire data={section4} next={() => { history.push("/questionnaire_section5");setProgress(6);}}>
            </Questionnaire>
          </Route>
          <Route path='/questionnaire_section5'>
            <Questionnaire data={section5} next={() => { history.push("/questionnaire_section6");setProgress(6);}}>
            </Questionnaire>
          </Route>
          <Route path='/questionnaire_section6'>
            <Questionnaire data={section6} next={() => { history.push("/questionnaire_section7");setProgress(6);}}>
            </Questionnaire>
          </Route>
          <Route path='/questionnaire_section7'>
            <Questionnaire data={section7} next={() => { history.push("/questionnaire_section8");setProgress(6);}}>
            </Questionnaire>
          </Route>
          <Route path='/questionnaire_section8'>
            <Questionnaire data={section8} next={() => { history.push("/questionnaire_section9");setProgress(6);}}>
            </Questionnaire>
          </Route>
          <Route path='/questionnaire_section9'>
            <Questionnaire data={section9} next={() => { history.push("/questionnaire_section11");setProgress(6);}}>
            </Questionnaire>
          </Route>
          <Route path='/questionnaire_section10'>
            <Questionnaire next={() => { history.push("/questionnaire_section11");setProgress(6);}}>
            </Questionnaire>
          </Route>
          <Route path='/questionnaire_section11'>
            <Questionnaire data={section11} next={() => { history.push("/questionnaire_section12");setProgress(6);}}>
            </Questionnaire>
          </Route>
          <Route path='/questionnaire_section12'>
            <Questionnaire data={section12} next={() => { history.push("/dicegame");setProgress(6);}}>
            </Questionnaire>
          </Route>
          <Route path='/dicegame'>
            <DiceGame>
            </DiceGame>
          </Route>
      </Router>
    </div>
  );
}

export default App;