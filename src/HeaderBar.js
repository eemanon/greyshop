import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: theme.zIndex.drawer + 1000,
  },
  bar: {
    backgroundColor: "#8a8a8a",
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'left'
  },
}));

export default function HeaderBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="relative" className={classes.bar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {props.titletext}
          </Typography>
          <Typography variant="h6">
            {props.progress}/{props.total}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}