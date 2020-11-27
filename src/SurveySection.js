import Paper from '@material-ui/core/Paper';
import React, { useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Question from './Question.js';
import Button from '@material-ui/core/Button';


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
    console.log("unanswered after "+unansweredQuestions)
  };
  const checkFilled = () => {
    console.log(answers);
    console.log(unansweredQuestions)
    if (unansweredQuestions.length>0){
      setCheck(true);
      return false;
      
    }

    //if not, mark the question in question red 
    props.next()
  }
  console.log(unansweredQuestions.includes(3))
  const titleElement = () => { return (<Typography variant="h4" component="h2" gutterBottom>{props.data.title}</Typography>) };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {props.showTitle === "yes" ? titleElement() : ""}
        <Typography variant="h6" gutterBottom>{props.data.Information}</Typography>
        {props.data.questions.map(
          (item, i) => (
            <Question check={check} colored={unansweredQuestions.includes(item.id)?"yes":"no"}  question={item} form={props.form} setAnswer={setAnswer}></Question>
          ))}
      </Paper>
      <Button color="primary" variant="contained" onClick={() => { checkFilled() }}>Envoyer mes réponses</Button>
    </div>);
}