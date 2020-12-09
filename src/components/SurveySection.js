//Component to display a section of a survey
//props: data=Question object in json format, form="list"/"column" how to display question answers, next=next page

import React, { useState, useEffect } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

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
  stepper: {
    maxWidth: 400,
    flexGrow: 1,
  }

}));



export default function SurveySection(props) {
  console.log("COMPONENT SurveySection")
  const [initialRender, setInitialRender] = useState(true);
  //console.log(props.data.displaySingleQuestions)
  const classes = useStyles();
  const [answers, setAnswers] = useState([]);
  const [check, setCheck] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const questionIds = [];
  //only add questions that are obligatory
  props.data.questions.forEach(question => {
    if (question.obligatory === "yes")
      questionIds.push(question.id)
  });
  const [unansweredQuestions, setUnansweredQuestions] = useState(questionIds)
  const setAnswer = (questionId, value) => {
    console.log("FUNCTION setAnswer (SurveySection)")
    console.log("Question " + questionId + " received " + value)
    //already set = change of answer?
    const found = answers.find(answer => answer.id === questionId);
    if (found == null) {
      //new setting, add:
      console.log("new answer")
      const newAnswers = [...answers, { "id": questionId, "answer": value }];
      setAnswers(newAnswers);
      //remove answer from unAnswered Questions
      setUnansweredQuestions(unansweredQuestions => {
        const newUnanswered = unansweredQuestions.filter(ans => ans !== questionId);
        return newUnanswered;
      })
    } else {
      //update existing answer
      console.log("existing answer")
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
    obj["section" + props.data.id] = answers;
    props.addContent(props.userID, obj).then(function () {
      console.log("Change succesfully written for id ", props.data.id);
      props.next();
    }).catch(function (error) {
      console.error("Error writing document: ", error);
    });
  }
  const titleElement = () => { return (<Typography variant="h4" component="h2" gutterBottom>{props.data.title}</Typography>) };
  const getAnswer = (questionId) => {
    const i = answers.find(element => element.id == questionId);
    if (i != null)
      return i.answer
    else
      return "";
  }
  const StepperQuestions = () => {
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    console.log("current answer selected: ")
    console.log(getAnswer(props.data.questions[activeStep].id))
    return (<div>
      <Question
        key={activeStep}
        question={props.data.questions[activeStep]}
        form={props.form}
        value={getAnswer}
        setAnswer={setAnswer}
      ></Question>
      <MobileStepper
        variant="progress"
        steps={props.data.questions.length}
        position="static"
        activeStep={activeStep}
        className={classes.stepper}
        nextButton={
          <Button size="small" color="primary" variant="contained" onClick={handleNext} disabled={activeStep === props.data.questions.length - 1 || getAnswer(props.data.questions[activeStep].id) === ""}>
            Next
          <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" color="primary" variant="contained" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
          Back
        </Button>
        } /></div>)
  }
  useEffect(() => {
    if (initialRender) {
      console.log("scrolling")
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setInitialRender(false)
    }
  }, [])
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {props.showTitle === "yes" ? titleElement() : ""}
        <Typography variant="h5" gutterBottom>{props.data.Information}</Typography>
        {props.data.displaySingleQuestions ? <StepperQuestions /> : props.data.questions.map(
          (item, i) => (
            <Question
              key={item.id}
              check={check}
              value={getAnswer}
              colored={unansweredQuestions.includes(item.id) ? "yes" : "no"}
              question={item}
              form={props.form}
              setAnswer={setAnswer}
            ></Question>
          ))}
      </Paper>
      <Button color={unansweredQuestions.length == 0 ? "primary" : "default"} variant="contained" onClick={() => { checkFilled() }}>Envoyer mes réponses</Button>
    </div>);
}