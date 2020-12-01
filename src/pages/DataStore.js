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
import firebase from 'firebase/app'
import 'firebase/auth'

import firebaseConfig from '../firebase.conf.js';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "100px",
    padding: "40px"
  },
  textfield: {
    marginBottom: "10px"
  },

}));
//Global variables & config load
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();



export default function DataStore(props) {
  const classes = useStyles();

  //returns user if connected
  const [user] = useAuthState(auth);

  //interface value trackers
  const [mail, setMail] = useState("");
  const [password, setPw] = useState("");

  const signInWithPW = (mail, pw) => {
    console.log("signing in with " + mail)
    auth.signInWithEmailAndPassword(mail, pw)
      .then((user) => {
        alert('successful')
        console.log(user)

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
      });
  }
  //conditional render components
  const loginform = () => {
    return (<form><Typography variant="h3" component="h2" gutterBottom>Please log in</Typography>
      <TextField value={mail} onChange={e => { setMail(e.target.value) }} className={classes.textfield} fullWidth id="mail" label="email address" />
      <TextField value={password} onChange={e => { setPw(e.target.value) }} className={classes.textfield} fullWidth id="password" label="password" />
      <Button onClick={() => signInWithPW(mail, password)}>Login</Button></form>)
  }
  const dataView = () => {
    return (<Paper><Typography variant="h3" component="h2" gutterBottom>Super Cool Data</Typography><Button onClick={() => auth.signOut()}>Logout</Button></Paper>)
  }

  return (
    <div>
      <Paper className={classes.root}>
        {user==null ? loginform() : dataView()}
      </Paper>
    </div>
  );
}