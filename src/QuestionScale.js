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


export default function QuestionScale(props) {
  const classes = useStyles();
  const textInput = () => {
    return (<TextField id="standard-basic" label={props.question} />)
  }
  const [value, setValue] = React.useState("");
  const answercomponent = () => {
    return (<RadioGroup column={props.form=="list"} row={props.form!="list"} aria-label="position" name="position" value={value} onChange={handleChange}>

      {props.options.map((item, i) => (

          
        <FormControlLabel
          value={item}
          control={<Radio color="primary" />}
          label={item}
          labelPlacement={props.form=="list"?"end":"bottom"}
        />
      ))
      }

    </RadioGroup>)
  }
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  console.log(props.image)
  return (
    <div className={classes.root}>
      <Typography variant="h6" component="span" gutterBottom >
        {props.question}
      </Typography>
      {props.image!=null?<img className={classes.img} src={props.image} />:""}
      <FormControl component="fieldset" className={classes.answers}>
        {props.options != null ? answercomponent() : textInput()}

      </FormControl>
    </div>
  );
}