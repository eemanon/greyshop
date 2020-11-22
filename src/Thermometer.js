
import Paper from '@material-ui/core/Paper';
import React, { useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 10,

  },
  textfield: {
      marginBottom:"10px"
  },
  thermometer: {
     width: "auto",
     marginBottom: "10px",
     color: "red",
     minHeight: "200px",
     margin: "auto",
     position: "relative"
  },
  outerCircleBottom: {
    height: "90px",
    width: "90px",
    backgroundColor: "black",
    left: "95px",
    position: "absolute",
    top: "115px",
    borderRadius: "50%",
    zIndex: "1"
 },
 outerColumn: {
    height: "100px",
    width: "50px",
    backgroundColor: "black",
    left: "115px",
    position: "absolute",
    top: "50px",
    zIndex: "1"
 },
 outerCircleTop: {
    height: "50px",
    width: "50px",
    backgroundColor: "black",
    left: "115px",
    position: "absolute",
    top: "25px",
    borderRadius: "50%",
    zIndex: "1"
 },

innerCircleBottom: {
    height: "70px",
    width: "70px",
    backgroundColor: "white",
    left: "105px",
    position: "absolute",
    top: "125px",
    borderRadius: "50%",
    zIndex: "2"
 },
 innerColumn: {
    height: "100px",
    width: "30px",
    backgroundColor: "white",
    left: "125px",
    position: "absolute",
    top: "50px",
    zIndex: "2"
 },
 innerCircleTop: {
    height: "30px",
    width: "30px",
    backgroundColor: "white",
    left: "125px",
    position: "absolute",
    top: "35px",
    zIndex: "2",
    borderRadius: "50%",
 },

 tempCircleBottom: {
    height: "50px",
    width: "50px",
    backgroundColor: "green",
    left: "115px",
    position: "absolute",
    top: "135px",
    borderRadius: "50%",
    zIndex: "3"
 },
 tempColumn: {
    height: "100px",
    width: "10px",
    backgroundColor: "green",
    left: "135px",
    position: "absolute",
    top: "50px",
    zIndex: "3"
 },
 tempCircleTop: {
    height: "10px",
    width: "10px",
    backgroundColor: "green",
    left: "135px",
    position: "absolute",
    top: "45px",
    zIndex: "3",
    borderRadius: "50%",
 },

}));

export default function ThermoCard(props) {
    const classes = useStyles();
    const [ticked, setTicked] = useState( false );
    return (
        <div>
        <Paper className={classes.root}>
          <Typography variant="h6" component="h2" gutterBottom> 
                Empreinte Carbone du panier
          </Typography>
          <div className={classes.thermometer}>
              <div className={classes.outerColumn}></div>
              <div className={classes.outerCircleBottom}></div>
              <div className={classes.outerCircleTop}></div>

              <div className={classes.innerColumn}></div>
              <div className={classes.innerCircleBottom}></div>
              <div className={classes.innerCircleTop}></div>

              <div className={classes.tempColumn}></div>
              <div className={classes.tempCircleBottom}></div>
              <div className={classes.tempCircleTop}></div>

          </div>
        </Paper>
      </div>
    );
}