//Component to display a section of a survey
//props: data=Question object in json format, form="list"/"column" how to display question answers, next=next page

import React, { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Question from './Question.js';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "block",
    margin: "30px",
    textAlign: "left",
  },
  paper: {
    marginBottom: "10px",
    marginTop: "10px",
    padding: "10px"
  },

}));



export default function SurveySection(props) {
  const classes = useStyles();
  const [answers, setAnswers] = useState([]);
  const [check, setCheck] = useState(false);
  const questionIds = props.data.questions.map(question => question.id);
  const [unansweredQuestions, setUnansweredQuestions] = useState(questionIds)
  const setAnswer = (questionId, value) => {
    console.log("Question" + questionId + "received " + value)
    //already set = change of answer?
    const found = answers.find(answer => answer.id === questionId);
    if (found == null) {
      //new setting, add:
      const newAnswers = [...answers, { "id": questionId, "answer": value }];
      setAnswers(newAnswers);
      //remove answer from unAnswered Questions
      setUnansweredQuestions(unansweredQuestions => {
        const newUnanswered = unansweredQuestions.filter(ans => ans !== questionId);
        return newUnanswered;
      })
    } else {
      //update existing answer
      setAnswers(existingAnswers => {
        const newAnswers = existingAnswers.map(answ => {
          if (answ.id === questionId) {
            answ.answer = value;
          }
          return answ
        });
        return newAnswers;
      });

    }
  };
  const checkFilled = () => {
    if (unansweredQuestions.length > 0) {
      setCheck(true);
      return false;
    }
    //send data
    let obj = {};
    obj["section"+props.data.id] = answers;
    props.addContent(props.userID, obj).then(function () {
      console.log("Change succesfully written for id ",props.data.id);
      props.next();
    }).catch(function (error) {
      console.error("Error writing document: ", error);
    });
  }
  const titleElement = () => { return (<Typography variant="h4" component="h2" gutterBottom>{props.data.title}</Typography>) };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {props.showTitle === "yes" ? titleElement() : ""}
        <Typography variant="h6" gutterBottom>{props.data.Information}</Typography>
        {props.data.questions.map(
          (item, i) => (
            <Question key={item.id} check={check} colored={unansweredQuestions.includes(item.id) ? "yes" : "no"} question={item} form={props.form} setAnswer={setAnswer}></Question>
          ))}
      </Paper>
      <Button color="primary" variant="contained" onClick={() => { checkFilled() }}>Envoyer mes réponses</Button>
    </div>);
}