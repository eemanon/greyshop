import React, { useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "1000px",
    marginTop: "30px",
    
  },
  answers: {
    display: "block"
  }
}));


export default function QuestionScale(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState("");

    const handleChange = (event) => {
      setValue(event.target.value);
    };
    return (
        <div className={classes.root}>
            <Typography variant="body1" component="span" gutterBottom >
                {props.question}
            </Typography>
            <FormControl component="fieldset" className={classes.answers}>
                <RadioGroup row aria-label="position" name="position" value={value} onChange={handleChange}>
                    {props.options.map((item, i) => (
                        <FormControlLabel
                            value={item}
                            control={<Radio color="primary" />}
                            label={item}
                            labelPlacement="bottom"
                        />
                    ))
                    }
                    
                </RadioGroup>
            </FormControl>
        </div>
    );
}