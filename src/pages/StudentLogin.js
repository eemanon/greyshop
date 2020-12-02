//Component a login form with a simple texfield that is checked upon.
//props: next=next page
import React, { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import userExists from '../functions/FireBaseConnector'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "10px",
    padding: "10px",
    maxWidth: "1000px",
    display: "inline-block",
    marginTop: "30px"
  },
  textfield: {
    marginBottom: "10px"
  },

}));

function Alert(props) {
  //displays an alert message in material ui style
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function StudentLogin(props) {
  const classes = useStyles();
  const timestamp_start_experience = (Date.now())
  //input tracking state
  const [studentValue, setValue] = useState("");
  //state of error message
  const [open, setOpen] = useState(false);
  //handler for error message
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }
  //checks if the student id is a 8digit number
  const regex = RegExp('^[0-9]{8}$');

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="body1" gutterBottom >
          <p>
            Nous vous remercions pour votre participation à cette étude.
            L'expérience porte sur les comportements d’achat en ligne. Pour cette expérience,
            vous allez faire vos courses sur un site expérimental et répondre à un questionnaire.
            À la fin de l’expérience, un dé digital vous permettra de voir si vous avez gagné les produits choisis
            (vous avez une chance sur cinq de gagner).
          </p><p>
            Veuillez suivre les instructions et consignes qui seront affichés au fur et à mesure de l'expérience.
          </p><p>
            Nous vous rappelons que la participation à cette étude est limitée aux étudiants universitaires habitant à Toulouse.
            À cet effet, nous demandons votre numéro d'étudiant ci-dessous pour commencer l'étude <b>(votre carte d’étudiant sera demandée
            lors de la récupération de vos produits dans le magasin).</b>
          </p>
          <p>
            ---
          </p><p>
            ** Votre numéro d'étudiant ne nous permet pas de vous identifier, mais de vérifier votre statut d'étudiant universitaire à Toulouse.**
          </p><p>
            Nous vous remercions encore pour votre participation et nous restons à votre disposition pour toute question.
          </p>
          <p>
            Estefanya Vazquez et Aysegul Kanay <br></br>estefanya.vazquez@etu.univ-tlse2.fr<br></br>aysegul.kanay@univ-tlse2.fr
          </p>
        </Typography>
        <TextField className={classes.textfield} fullWidth id="studentNumber" onChange={e => { setValue(e.target.value) }} label="Numéro étudiant" value={studentValue} />

        <Button color={regex.test(studentValue) ? "primary" : "default"} variant="contained" onClick={() => checkIfUsed(studentValue, props, regex, setOpen, timestamp_start_experience)}>Continuer</Button>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Veuillez entrer un numéro d'étudiant valide.
        </Alert>
        </Snackbar>
      </Paper>
    </div>
  );
}

function checkIfUsed(studentValue, props, regex, setOpen, timestampStart) {
  //function to check if id is already used or invalid.
  //format check
  console.log("experience started at "+timestampStart)
  console.log("time now "+Date.now())
  if (!regex.test(studentValue)) {
    setOpen(true)
    return
  }
  //TODO
  //check if user exists with hash...
  if(userExists(studentValue)===0){
    console.log("no user")
    //return
  }
  console.log("todo")
  console.log("current value: " + studentValue)
  //forward
  props.next();
}