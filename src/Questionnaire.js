import Paper from '@material-ui/core/Paper';
import React, { useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import QuestionScale from './QuestionScale.js';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display:"block",
      margin: "30px",
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
            <Typography variant="h3" component="h2" gutterBottom>Section 1 : Attitudes (12 items)</Typography> 
            <Typography variant="body" component="body" gutterBottom>1. Sur une échelle allant de 1 à 7, indiquez votre degré d'accord (1= pas d’accord, 7=tout à fait d’accord)</Typography>
            
            <QuestionScale question="Un couple marié devrait pouvoir avoir autant d’enfants qu’il le souhaite, du moment qu’il peut subvenir correctement à leurs besoins." options={["1","2", "3","4","5", "6","7"]}></QuestionScale>
            <QuestionScale question="Protéger l’environnement est plus important que protéger l’emploi des gens." options={["1","2", "3","4","5", "6","7"]}></QuestionScale>
            </Paper>
            <Paper className={classes.paper}>
            <Typography variant="h3" component="h2" gutterBottom>Section 2 : alimentation criteria</Typography> 
            <Typography variant="body" component="body" gutterBottom>1. Sur une échelle allant de 1 à 7, indiquez votre degré d'accord (1= pas d’accord, 7=tout à fait d’accord)</Typography>
            
            <QuestionScale question="Un couple marié devrait pouvoir avoir autant d’enfants qu’il le souhaite, du moment qu’il peut subvenir correctement à leurs besoins." options={["1","2", "3","4","5", "6","7"]}></QuestionScale>
            <QuestionScale question="Protéger l’environnement est plus important que protéger l’emploi des gens." options={["1","2", "3","4","5", "6","7"]}></QuestionScale>
            </Paper>
        </div>);
}