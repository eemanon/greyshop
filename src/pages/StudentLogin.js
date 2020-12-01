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
        <Typography variant="h3" component="h2" gutterBottom>
          Bienvenue dans cette magnifique experience
        </Typography>
        <Typography variant="body1" gutterBottom >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
          unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
          dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
          unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
          dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
          unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
          dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
          unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
          dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
          unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
          dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>

        <TextField className={classes.textfield} fullWidth id="studentNumber" onChange={e => { setValue(e.target.value) }} label="Numéro étudiant" value={studentValue} />

        <Button color={regex.test(studentValue) ? "primary" : "default"} variant="contained" onClick={() => checkIfUsed(studentValue, props, regex, setOpen)}>Continuer</Button>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Veuillez entrer un numéro d'étudiant valide.
        </Alert>
        </Snackbar>
      </Paper>
    </div>
  );
}

function checkIfUsed(studentValue, props, regex, setOpen) {
  //function to check if id is already used or invalid.
  //check
  if (!regex.test(studentValue)) {
    setOpen(true)
    return
  }

  //TODO
  console.log("todo")
  console.log("current value: " + studentValue)
  //forward
  props.next();
}