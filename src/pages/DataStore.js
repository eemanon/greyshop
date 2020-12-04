//Component that allows to download and view data from database
//props: next=next page

import React, { useState } from 'react';

//material ui
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

//Global variables & config load
import { userSignOut, userSignInWithMail, useConnectedUser, useAllData, signInWithMail } from '../functions/FireBaseConnector'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "100px",
    padding: "40px"
  },
  textfield: {
    marginBottom: "10px"
  },

}));

function objectToCsv(arrObj, createColumnHeader) {
  //get columnHeader & all keys from first object
  let headerline = '';
  if (createColumnHeader) {
    Object.keys(arrObj[0]).map((key) => (
      headerline = headerline + key + ","
    ))
    //remove last comma and add newline
    headerline = headerline.slice(0, -1);
    headerline = headerline + '\n';
  }
  console.log(headerline)
  //get every object and transform it into a line of csv
  //TODO: maybe use separate collection of fields that has to be in there and match them to it?

}

function DataView() {
  const fileDownload = require('js-file-download');
  const [returndata] = useAllData("id", "data");
  let header = [];
  if (returndata != null)
    header = Object.keys(returndata[0])
  return (<Paper><Typography variant="h3" component="h2" gutterBottom>Données disponibles</Typography>
    <table><tbody>
      <tr>{returndata != null && header.map((key) => (
        <th key={key}>{key}</th>
      ))}</tr>
      {returndata != null && returndata.map((item, id) => (
        <tr key={item.id}>
          {header.map((key) => (
            <td key={key} >{typeof item[key]=="object"?Object.keys(item[key]).length:item[key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
    </table>
    <Button onClick={() => fileDownload(objectToCsv(returndata, true), 'export.csv')}>Download CSV</Button><br></br>
    <Button onClick={userSignOut}>Logout</Button></Paper>)
}
function Loginform() {
  const classes = useStyles();
  const [password, setPw] = useState("");
  const [mail, setMail] = useState("");
  const signInWithPW = (mail, pw) => {
    console.log("signing in with " + mail)
    userSignInWithMail(mail, pw)
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
  const [user] = useConnectedUser();

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