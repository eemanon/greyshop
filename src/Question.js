import React, { useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "30px",

  },
  answers: {
    display: "block"
  },
  img: {
    display: "block",
    width: "200px",
  }
}));


export default function Question(props) {
  const classes = useStyles();
  const textInput = () => {
    return (<TextField id="standard-basic" label={props.question.Question} onChange={handleChange} />)
  }
  const [value, setValue] = React.useState("");
  const answercomponent = () => {
    return (<RadioGroup column={props.form == "list"} row={props.form != "list"} aria-label="position" name="position" value={value} onChange={handleChange}>
      {props.question.Answer.map((item, i) => (
        <FormControlLabel
          value={"" + i}
          control={<Radio color="primary" />}
          label={item}
          labelPlacement={props.form == "list" ? "end" : "bottom"}
        />
      ))
      }
    </RadioGroup>)
  }
  const handleChange = (event) => {
    props.setAnswer(props.question.id, event.target.value)
    setValue(event.target.value);
  };

  return (
    <div className={classes.root} style={props.colored=="yes"&&props.check?{backgroundColor: "red"}:{}}>
      <Typography variant="h6" component="span" gutterBottom >
        {props.question.Question}
      </Typography>
      {props.question.image != null ? <img className={classes.img} src={props.question.image} /> : ""}
      <FormControl component="fieldset" className={classes.answers}>
        {props.question.Answer != null ? answercomponent() : textInput()}
      </FormControl>
    </div>
  );
}