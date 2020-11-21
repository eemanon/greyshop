import Paper from '@material-ui/core/Paper';
import React, { useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


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
      marginBottom:"10px"
  },

}));

export default function StudentLogin(props) {
  const classes = useStyles();
  const [studentValue, setValue] = useState( "" );

  const regex = RegExp('[0-9]{8}');

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
        
        <TextField className={classes.textfield} fullWidth id="studentNumber" onChange={e => {setValue(e.target.value)}} label="Numéro étudiant" value={studentValue} />
        
        <Button color="primary" disabled={!regex.test(studentValue)} variant="contained" onClick={() => checkIfUsed(studentValue, props)}>Continuer</Button>

        
      </Paper>
    </div>
  );
}

function checkIfUsed(studentValue, props) {
    //check
    //TODO
    console.log("todo")
    console.log("current value: "+studentValue)
    //forward
    props.next();
}