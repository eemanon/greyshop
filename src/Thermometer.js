import Paper from '@material-ui/core/Paper';
import React, { useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import arrowRight from './images/right.png'

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
     margin: "auto",
     position: "relative"
  },
  pointerLabel: {
   float: "left",
   padding: "3px"
  },
  pointer: {
   float: "left",
   position: "relative",
   top: "-10px"
  },
  container: {
   display: "inline-block",
   
  }
}
));

export default function ThermoCard(props) {
    const classes = useStyles();
    const labels = ["> 9,32","<=9,32","<=6,99","<=4,66", "<=2,33"]
    const [ticked, setTicked] = useState( false );
    return (
        <div>
        <Paper className={classes.root}>
          <Typography variant="h6" component="h2" gutterBottom> 
                Empreinte Carbone du panier
          </Typography>
          <div className={classes.thermometer}>
             <div className={classes.container}>
             <div className={classes.pointer}>
               <div className={classes.pointerLabel}>23.5</div>
               <img src={arrowRight} height="25px"></img>
             </div>
            <table cellspacing="0" cellpadding="0">
               <tr>
                  <td><div style={{backgroundColor: "#ff0000", height: "20px", width:"50px"}}></div></td>
                  <td>{labels[0]}</td>
               </tr>
               <tr>
                  <td><div style={{backgroundColor: "#ff5900", height: "20px", width:"50px"}}></div></td>
                  <td>{labels[1]}</td>
               </tr>
               <tr>
                  <td><div style={{backgroundColor: "#ffc000", height: "20px", width:"50px"}}></div></td>
                  <td>{labels[2]}</td>
               </tr>
               <tr>
                  <td><div style={{backgroundColor: "#ffff00", height: "20px", width:"50px"}}></div></td>
                  <td>{labels[3]}</td>
               </tr>
               <tr>
                  <td><div style={{backgroundColor: "#008000", height: "20px", width:"50px"}}></div></td>
                  <td>{labels[4]}</td>
               </tr>
            </table>   
            </div> 
          </div>
        </Paper>
      </div>
    );
}