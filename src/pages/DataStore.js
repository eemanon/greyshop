//Component that allows to download and view data from database
//props: next=next page

import React, { useState } from 'react';

//material ui
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "100px",
    padding: "40px"
  },
  textfield: {
    marginBottom: "10px"
  },
  dataview: {
    overflow: "scroll"
  },

}));

function objectToCsv(obj, products, questions) {
  let setAll = (obj, val) => Object.keys(obj).forEach(k => obj[k] = val);
  let header = ["id", "variant", "agreedToTerms", "tax", "basketValueWT", "timeStart", "timeStartLandingPage", "timeFinishLandingPage", "timeCheckout", "timeFinish", "mail"];
  //add product header & create prototype object to use for transformation
  let basketObject = {};
  for (const category of products) {
    for (const product of category.products) {
      header.push("prod" + product.id)
      basketObject["prod" + product.id] = 0
    }
  }
  //add question header...
  let questionObject = {}
  for (const section of questions) {
    for (const question of section.questions) {
      header.push("section" + section.id + "question" + question.id)
      questionObject["section" + section.id + "question" + question.id] = -1
    }
  }
  let headerline = "";
  header.map((key) => (
    headerline = headerline + key + ","
  ))
  //remove last comma and add newline
  headerline = headerline.slice(0, -1);
  headerline = headerline + '\n';
  console.log(headerline)
  let csv = headerline;
  //add rows
  obj.map((objOriginal) => {
    let row = ""
    //clean rowobjects
    setAll(questionObject, -1);
    setAll(basketObject, 0);
    let basics = { "id": -1, "variant": -1, "agreedToTerms": "null", "tax": -1.0, "basketValueWT": -1.0, "timeStart": 0, "timeStartLandingPage": 0, "timeFinishLandingPage": 0, "timeCheckout": 0, "timeFinish": 0, "mail": "" }
    //map basics 
    for (const [key, value] of Object.entries(basics)) {
      basics[key] = objOriginal[key];
    }
    //map products
    if (objOriginal.basket != null)
      objOriginal.basket.forEach((item, index) => {
        basketObject["prod" + item.id] = item.quantity;
      })
    //map questions
    //get all sections:
    let questions = Object.keys(objOriginal).filter((item) => item.startsWith("section"))
    console.log(questions);
    questions.forEach((section) => {
      objOriginal[section].forEach((question) => {
        //console.log('section id is '+section)
        //console.log('question id is '+question.id)
        questionObject[section + "question" + question.id] = question.answer;
      })
    })
    //join objects
    let merged = { ...basics, ...basketObject, ...questionObject };
    console.log("merged:")
    console.log(merged)
    //create row with header:
    header.forEach(head => {
      row = row + merged[head] + ","
    })
    row = row.slice(0, -1);
    row = row + '\n';
    console.log("ROW: " + row);
    csv = csv + row;
  });
  return csv
}

function objectToTable(obj, header) {
  console.log(obj)
  let arr = [];
  console.log(obj)
  obj.map((rowObj) => {
    let rowArr = []
    header.map(element => {
      if (typeof rowObj[element] == "number") {
        if (rowObj[element] % 1 === 0 && element != "variant" && element != "id" && rowObj[element] != 0) //timestamp
          rowArr.push(new Date(rowObj[element]).toLocaleDateString("fr-FR") + " " + new Date(rowObj[element]).toLocaleTimeString("fr-FR"));
        else if (rowObj[element] % 1 != 0 && rowObj[element] != null)      //money
          rowArr.push(Math.round(rowObj[element] * 100) / 100 + "€");
        else if (rowObj[element] == 0)
          rowArr.push("0");
        else
          rowArr.push(JSON.stringify(rowObj[element]));
      }
      else
        rowArr.push(JSON.stringify(rowObj[element]));
    });
    arr.push(rowArr);
  });
  return arr;
}

function uploadDiceGames(numberOfGames, addAvailableDiceGames) {
  //create dicegames in json object
  let obj = {};
  let i;
  for (i = 1; i < numberOfGames; i++) {
    let randomNum = 5;
    obj["" + i] = []
    while (randomNum == 5) {
      randomNum = Math.floor((Math.random() * 6) % 6 + 1);
      obj["" + i].push(randomNum);
    }
  }
  console.log(obj)
  //add numberOfGames
  addAvailableDiceGames(obj).then(function (newCounter) {
    console.log("DiceGames successfully written! " + newCounter);
  }).catch(function (error) {
    console.error("Error writing Dicegames: ", error);
  });
}

function productFindById(id, products) {
  let res = null;
  products.forEach((cat, index) => {
    cat.products.forEach((product) => {
      if (product.id.toString() == id.toString())
        res = product;
    });
  })
  return res;
}

function DataView(props) {
  const classes = useStyles();
  const fileDownload = require('js-file-download');
  const [returndata] = props.useAllData("idField", "data");
  const downloadBasket = (id) => {
    console.log("download " + id)
    const basket = returndata.find(data => data.id == id)
    if (basket == null)
      return
    console.log(basket.basket)
    let csv = "quantity, description\n";
    console.log(props.products)
    basket.basket.forEach((item, index) => {
      let description = productFindById(item.id, props.products)["Descriptif Produit"];
      let row = item.quantity + ";" + description + "\n"
      csv = csv + row;
    })
    fileDownload(csv, "basket" + id + ".txt")

  }
  let header = [];
  let arr = [];
  if (returndata != null) {
    header = ["id", "variant", "agreedToTerms", "tax", "basketValueWT", "basket", "timeStart", "timeStartLandingPage", "timeFinishLandingPage", "timeCheckout", "timeFinish", "mail", "section1", "section2", "section3", "section4", "section5", "section6", "section7", "section8", "section9", "section10", "section11", "section12"];
    arr = objectToTable(returndata, header);
  }
  console.log(arr)
  return (<div className={classes.dataview}>

    <Typography variant="h3" component="h2" gutterBottom>Données disponibles</Typography>
    <Table>
      <TableBody>
        <TableRow><TableCell></TableCell>{returndata != null && header.map((key) => (
          <TableCell key={key}>{key}</TableCell>
        ))}</TableRow>
        {returndata != null && arr.map((item, id) => (
          <TableRow><TableCell><Button variant="contained" id={item[0]} onClick={() => downloadBasket(item[0])}><ShoppingCartIcon /></Button></TableCell>
            {item.map((cell) => (
              <TableCell>{cell ? cell.length > 20 ? cell.substring(0, 30) + "..." : cell : ""}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <ButtonGroup variant="contained" color="primary">
      <Button onClick={() => uploadDiceGames(50, props.addAvailableDiceGames)}>Create 50 dicegames and upload them</Button>
      <Button onClick={() => fileDownload(objectToCsv(returndata, props.products, props.questions), 'export.csv')}>Download CSV</Button>
      <Button onClick={() => fileDownload(JSON.stringify(returndata, true), 'export.json')} color="primary">Download JSON</Button>
    </ButtonGroup>
    <br></br>
    <Button onClick={props.userSignOut}>Logout</Button></div>)
}
function Loginform(props) {
  const classes = useStyles();
  const [password, setPw] = useState("");
  const [mail, setMail] = useState("");
  const signInWithPW = (mail, pw) => {
    console.log("signing in with " + mail)
    props.userSignInWithMail(mail, pw)
      .then((user) => {
        console.log(user)

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
      });
  }
  return (<form><Typography variant="h3" component="h2" gutterBottom>Please log in</Typography>
    <TextField value={mail} onChange={e => { setMail(e.target.value) }} className={classes.textfield} fullWidth id="mail" label="email address" />
    <TextField value={password} onChange={e => { setPw(e.target.value) }} className={classes.textfield} fullWidth id="password" label="password" />
    <Button onClick={() => signInWithPW(mail, password)}>Login</Button></form>)
}

export default function DataStore(props) {

  const classes = useStyles();
  //returns user if connected
  const [user] = props.useConnectedUser();

  //interface value trackers
  //conditional render components
  return (
    <div>
      <Paper className={classes.root}>
        {user == null ? <Loginform userSignInWithMail={props.userSignInWithMail} /> : <DataView products={props.products} questions={props.questions} userSignOut={props.userSignOut} useAllData={props.useAllData} getNumDiceGames={props.getNumDiceGames} addAvailableDiceGames={props.addAvailableDiceGames} />}
      </Paper>
    </div>
  );
}