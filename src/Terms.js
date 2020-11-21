
import Paper from '@material-ui/core/Paper';
import React, { useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { NextWeek } from '@material-ui/icons';

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

export default function Terms(props) {
    const classes = useStyles();
    const [ticked, setTicked] = useState( false );
    return (
        <div>
        <Paper className={classes.root}>
          <Typography variant="h3" component="h2" gutterBottom>
              Vos données ... sont A NOUS!
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
          
          <FormControlLabel
            control={
                <Checkbox
                    onChange={() => setTicked(!ticked)}
                    name="checkedB"
                    color="primary"
                />
                }
                label="Je suis d'accord avec ce que je viens de pas lire."
            /> 
            <br></br>
          <Button color="primary" disabled={!ticked} variant="contained" onClick={() => checkIfAgree(ticked, props)}>Continuer</Button>
  
          
        </Paper>
      </div>
    );
}
function checkIfAgree(ticked, props){
    //send to db 
    //TODO
    console.log("TODO")
    //next
    props.next();
}