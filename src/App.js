import React, { useRef, useState } from 'react';
import './App.css';
import HeaderBar from './HeaderBar.js'
import { Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import history from './history';

import StudentLogin from './StudentLogin.js'
import Terms from './Terms.js'
import Instructions from './Instructions.js'
import Store from './Store.js'
import DiceGame from './DiceGame.js'
import SurveySection from './SurveySection.js'

//data for questionnaire
import regularQuestions from './data/questionnary.json';

import Products from './DataLoader';
import Co2questionids from './data/productIdsForQuestions.json';

function productIdsToQuestions(products, productIds, answers, title, id, information, showTitle, questionText) {
  //takes a list of product ids, general answers and a products object to return a section of questions about the product
  let result = {
    "title": title,
    "information": information,
    "id": id,
    "showTitle": showTitle,
    "questions": []
  };
  productIds.map((id, i) => {
    //find image in products
    let product = null;
    products.forEach(category => {
      const found = category.products.find(product => product.id === id)
      if (found != null)
        product = found;
    });
    let question = { "id": i, "Answer": answers, "Question": questionText, "image": product["Lien fichier"] }
    result.questions.push(question);
    return true
  });
  return result;
}

function App() {
  const [progressState, setProgress] = useState(1);
  const [headerBarTitle, setHeaderBarTitle] = useState("Bienvenue");
  const products = Products();
  const carbonQuestions = productIdsToQuestions(products, Co2questionids, ["élevée", "moyenne", "faible", "je ne sais pas"], "Section 10 : CO2 knowledge test (Presentation of 36 products) ", 10, "", "no", "Évaluer l'empreinte carbone de ce produit.");
  return (
    <div className="App">
      <HeaderBar titletext={headerBarTitle} progress={progressState} total={17}></HeaderBar>

      <Router history={history}>
        <Route exact path='/'>
          <StudentLogin next={() => { history.push("/consent"); setProgress(2); setHeaderBarTitle("Consentement"); }}>
          </StudentLogin>
        </Route>
        <Route path='/consent'>
          <Terms next={() => { history.push("/instructions"); setProgress(3); setHeaderBarTitle("Instructions");}}>
          </Terms>
        </Route>
        <Route path='/instructions'>
          <Instructions next={() => { history.push("/store"); setProgress(4); setHeaderBarTitle("Magasin")}}>
          </Instructions>
        </Route>
        <Route path='/store'>
          <Store products={products} next={() => { history.push("/questionnaire_section1"); setProgress(5); setHeaderBarTitle("Questionnaire") }}>
          </Store>
        </Route>
        {regularQuestions.map((item, i) => (
            <Route exact path={item.link}>
              <SurveySection data={item} form={item.form} next={() => { console.log(item.nextPage);history.push(item.nextPage); setProgress(progressState + 1); }}>
              </SurveySection>
            </Route>
        ))}
        <Route path='/questionnaire_section10'>
          <SurveySection data={carbonQuestions} form={"list"} next={() => { history.push("/questionnaire_section11"); setProgress(progressState + 1); }}>
          </SurveySection>
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