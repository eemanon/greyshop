//Component that allows to download and view data from database
//props: next=next page

import React, { useState } from 'react';

//material ui
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

//database related imports



import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebaseConfig from '../firebase.conf.js';
import 'firebase/auth'
import 'firebase/firestore';
import firebase from 'firebase/app'
  //Global variables & config load
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "100px",
    padding: "40px"
  },
  textfield: {
    marginBottom: "10px"
  },

}));


function DataView() {
  const data = firestore.collection('data');
  const query = data.limit(30);
  console.log(query)
  
  const [returndata] = useCollectionData(query, {idField: 'id'});
  console.log(returndata)
  return (<Paper><Typography variant="h3" component="h2" gutterBottom>Données disponibles</Typography>
    <table>
      <tr>{returndata!=null && Object.keys(returndata[0]).map((key) => (
        <th>{key}</th>
      ))}</tr>
      {returndata!=null && returndata.map((item, id) => (
        <tr>
          {Object.keys(item).map((key) => (
            <td>{item[key]}</td>
          ))}
        </tr>
      ))}
    </table>
    <Button onClick={() => auth.signOut()}>Logout</Button></Paper>)
}
function Loginform (){
  const classes = useStyles();
  const [password, setPw] = useState("");
  const [mail, setMail] = useState("");
  const signInWithPW = (mail, pw) => {
    console.log("signing in with " + mail)
    auth.signInWithEmailAndPassword(mail, pw)
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
  const [user] = useAuthState(auth);

  //interface value trackers
  //conditional render components
  return (
    <div>
      <Paper className={classes.root}>
        {user == null ? <Loginform /> : <DataView />}
      </Paper>
    </div>
  );
}