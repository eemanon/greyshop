import Paper from '@material-ui/core/Paper';
import React, { useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import QuestionScale from './QuestionScale.js';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display:"block",
      margin: "30px",
      textAlign: "left",
    },
    paper: {
        marginBottom:"10px",
        marginTop:"10px",
        padding:"10px"
    },
  
  }));
  


export default function Questionnaire(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
            <Typography variant="h4" component="h2" gutterBottom>{props.data.title}</Typography> 
            <Typography gutterBottom>{props.data.information}</Typography>
            {props.data.questions.map(
              (item, i) => (
                <QuestionScale question={item.Question} options={item.Answer} mustAnswer={item.obligatory}></QuestionScale>
            ))}
            <QuestionScale question="Un couple marié devrait pouvoir avoir autant d’enfants qu’il le souhaite, du moment qu’il peut subvenir correctement à leurs besoins." options={["1","2", "3","4","5", "6","7"]}></QuestionScale>
            <QuestionScale question="Protéger l’environnement est plus important que protéger l’emploi des gens." options={["1","2", "3","4","5", "6","7"]}></QuestionScale>
            </Paper>
            <Button color="primary" variant="contained" onClick={() => props.next()}>Envoyer mes réponses</Button>
        </div>);
}