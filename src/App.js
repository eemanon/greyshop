import { AppBar } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import './App.css';
import HeaderBar from './HeaderBar.js'
import Button from '@material-ui/core/Button';

function App() {
  const [progressState, setProgress] = useState( 1 );
  const titles = ["Bienvenue", "Consentement", "Instructions", "Shop", "Questionnaire", "Dice Game"]


  return (
    <div className="App">
      <HeaderBar titletext={titles[progressState-1]} progress={progressState} total={titles.length}></HeaderBar>
      <Button onClick={() => {if(titles.length>progressState){setProgress(progressState+1)}}} >test
      </Button>
      <section>
      </section>

    </div>
  );
}

export default App;