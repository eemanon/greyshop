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
    const titleElement = () => {return(<Typography variant="h4" component="h2" gutterBottom>{props.data.title}</Typography> )};
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
            {props.showTitle=="yes"?titleElement():""}
            <Typography gutterBottom>{props.data.Information}</Typography>
            {props.data.questions.map(
              (item, i) => (
                <QuestionScale question={item.Question} form={props.form} options={item.Answer} mustAnswer={item.obligatory} image={item.image}></QuestionScale>
            ))}
            </Paper>
            <Button color="primary" variant="contained" onClick={() => props.next()}>Envoyer mes réponses</Button>
        </div>);
}