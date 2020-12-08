import React, { useEffect, useState } from 'react';
import './App.css';
import HeaderBar from './components/HeaderBar.js'
import { Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import history from './history';

import StudentLogin from './pages/StudentLogin.js'
import Terms from './pages/Terms.js'
import Instructions from './pages/Instructions.js'
import FinalPage from './pages/FinalPage.js'
import Store from './pages/Store.js'
import DiceGame from './pages/DiceGame.js'
import SurveySection from './components/SurveySection.js'
import DataStore from './pages/DataStore.js'

import Products from './functions/DataLoader';
import Co2questionids from './data/productIdsForQuestions.json';
import regularQuestions from './data/questionnary.json';


import { getDiceGame, getNumDiceGames, addAvailableDiceGames, userSignInAnonymously, addUser, userExists, initialWrite, addContent, useConnectedUser, useAllData, userSignInWithMail, userSignOut } from './functions/FireBaseConnector.js'

//debug only
import Button from '@material-ui/core/Button';

//database connection imports


function productIdsToQuestions(products, productIds, answers, title, id, information, showTitle, questionText) {
  //takes a list of product ids, general answers and a products object to return a section of questions about the product
  let result = {
    "title": title,
    "Information": information,
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
    let question = { "id": i, "Answer": answers, "Question": questionText, "image": product["Lien fichier"], "imageTitle": product["Descriptif Produit"], obligatory: "yes" }
    result.questions.push(question);
    return true
  });
  return result;
}

const variants = [
  {
    number: "0",
    labels: false,
    labeltext: "",
    labelpos: "front",
    tax: false,
    thermometer: false,
    thermometerlabel: "",
    text:""
  },
  {
    number: "1",
    labels: true,
    labeltext: "Indicateur de rareté de produit: ",
    labelpos: "front",
    tax: true,
    thermometer: true,
    thermometerlabel: "Rareté moyenne de votre panier",
    text:""
  },
  {
    number: "2",
    labels: true,
    labeltext: " kg de CO2 émis par kg de produit",
    labelpos: "behind",
    tax: false,
    thermometer: true,
    thermometerlabel: "Empreinte carbone moyenne de votre panier",
    text: "* Le seuil de 2.33 kg de CO2/kg de produits correspondant a une redution de 25% de l’empreinte carbone."
  },
  {
    number: "3",
    labels: true,
    labeltext: " kg de CO2 émis par kg de produit",
    labelpos: "behind",
    tax: true,
    thermometer: true,
    thermometerlabel: "Empreinte carbone moyenne de votre panier",
    text: "* Le seuil de 2.33 kg de CO2/kg de produits correspondant a une redution de 25% de l’empreinte carbone."
  }
]

function App() {
  const [variant, setVariant] = useState(0);
  const [userID, setUserID] = useState(null);
  const [winnerID, setWinnerID] = useState(-1);
  useEffect(() => {
    userSignInAnonymously().then((user) => {
      console.log(user)
      if (user) {
        setUserID(user.user.uid);
      } else {
        alert("Erreur d'authentification. Veuillez revenir ultérieurement.")
      }
    });
  })

  const [progressState, setProgress] = useState(1);
  const [headerBarTitle, setHeaderBarTitle] = useState("Bienvenue");
  const products = Products();

  const carbonInfo = "Vous allez à présent évaluer l’empreinte carbone de 36 produits sélectionnés dans le magasin. L’empreinte carbone est une mesure de l’émission de gaz à effet de serre au cours de la production, du transport et de la distribution d’un produit. Plus l’empreinte carbone d’un produit est élevée, plus celui-ci contribue au réchauffement climatique.";
  const carbonQuestions = productIdsToQuestions(products, Co2questionids, ["élevée", "moyenne", "faible", "je ne sais pas"], "Section 10 : CO2 knowledge test (Presentation of 36 products) ", 10, carbonInfo, "yes", "Évaluer l'empreinte carbone de ce produit.");
  return (
    <div className="App">
      <HeaderBar titletext={headerBarTitle} progress={progressState} total={18}><Button variant="contained" onClick={() => setVariant((variant + 1) % 4)} color="secondary">Change shop variant-currently {variant}</Button></HeaderBar>
      <Router history={history}>
        <Route exact path='/'>
          <StudentLogin
            setVariant={setVariant}
            setId={setWinnerID}
            numVariants={4}
            userID={userID}
            next={() => { history.push("/consent"); setProgress(2); setHeaderBarTitle("Consentement"); }}
            addUser={addUser}
            userExists={userExists}
            initialWrite={initialWrite}
          >
          </StudentLogin>
        </Route>
        <Route path='/consent'>
          <Terms
            next={() => { history.push("/instructions"); setProgress(3); setHeaderBarTitle("Instructions"); }}
            userID={userID}
            addContent={addContent}
          >
          </Terms>
        </Route>
        <Route path='/instructions'>
          <Instructions next={() => { history.push("/store"); setProgress(4); setHeaderBarTitle("Magasin") }}>
          </Instructions>
        </Route>
        <Route path='/store'>
          <Store
            variant={variants[variant]}
            products={products}
            next={() => { history.push("/questionnaire_section1"); setProgress(5); setHeaderBarTitle("Questionnaire") }}
            addContent={addContent}
            userID={userID}>
          </Store>
        </Route>
        {regularQuestions.map((item, i) => (
          <Route exact path={item.link} key={item.id}>
            <SurveySection
              data={item}
              form={item.form}
              next={() => { console.log(item.nextPage); history.push(item.nextPage); setProgress(progressState + 1); }}
              addContent={addContent}
              userID={userID}
            >
            </SurveySection>
          </Route>
        ))}
        <Route path='/questionnaire_section10'>
          <SurveySection
            data={carbonQuestions}
            form={"list"}
            next={() => { history.push("/questionnaire_section11"); setProgress(progressState + 1); }}
            addContent={addContent}
            userID={userID}
          >
          </SurveySection>
        </Route>
        <Route path='/dicegame'>
          <DiceGame
            addContent={addContent}
            userID={userID}
            getDiceGame={getDiceGame}
            next={() => { history.push("/end"); setHeaderBarTitle("Experience terminée") }}
          >
          </DiceGame>
        </Route>
        <Route path='/datastore'
          render={() => {
            setHeaderBarTitle("DataStore"); return (<DataStore
              getNumDiceGames={getNumDiceGames}
              addAvailableDiceGames={addAvailableDiceGames}
              userSignOut={userSignOut}
              userSignInWithMail={userSignInWithMail}
              useConnectedUser={useConnectedUser}
              useAllData={useAllData}
              questions={regularQuestions}
              products={products}
            >
            </DataStore>)
          }}
        >
        </Route>
        <Route path='/end'>
          <FinalPage >
          </FinalPage>
        </Route>
      </Router>
    </div>
  );
}

export default App;