//Component that displays a dice game with videos as animations.
//props: next=next page

import React, { useRef, useEffect, useState } from 'react';

//video imports
import vid1 from '../videos/vid1.mp4'
import vid2 from '../videos/vid2.mp4'
import vid3 from '../videos/vid3.mp4'
import vid4 from '../videos/vid4.mp4'
import vid5 from '../videos/vid5.mp4'
import vid6 from '../videos/vid6.mp4'

//Material ui
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    flexGrow: 1,
    margin: "10px",
    padding: "30px",
    display: "inline-block",
    marginTop: "30px"
  },
  textfield: {
    marginBottom: "10px"
  },

}));

//open Victory Message
function showMessage(setOpen) {
  setOpen(true)
}

export default function DiceGame(props) {
  const classes = useStyles();
  const vidRef1 = useRef(null);
  const vidRef2 = useRef(null);
  const vidRef3 = useRef(null);
  const vidRef4 = useRef(null);
  const vidRef5 = useRef(null);
  const vidRef6 = useRef(null);
  //experience finished send timestamp:


  //interface tracker for dialog open
  const [open, setOpen] = useState(false);
  const [dateSet, setDateSet] = useState(false);
  const [diceThrow, setDiceThrow] = useState(0);
  const [mail, setMail] = useState("");
  const timestamp_finishExperience = Date.now()
  const [diceSeries, setDiceSeries] = useState([]);
  console.log("experience finished at " + timestamp_finishExperience)
  useEffect(() => {
    if (props.userID != null && diceSeries!=null && diceSeries.length == 0) {
      console.log(props.userID);
      props.getDiceGame(props.userID, setDiceSeries);
    }
    if (props.userID && !dateSet) {
      props.addContent(props.userID, { timeFinish: Date.now() }).then(function () {
        console.log("finish date saved");
        setDateSet(true)
      }).catch(function (error) {
        console.error("Error writing document: ", error);
      });
    }

  }, [props, diceSeries, dateSet])

  const handleClose = () => {
    setOpen(false);
  };
  const saveMail = () => {
    props.addContent(props.userID, { mail: mail }).then(function () {
      console.log("saved mail");
      handleClose();
    }).catch(function (error) {
      console.error("Error writing document: ", error);
    });

  }
  const handlePlayVideo = () => {
    //check if we still can play...
    if (diceThrow < diceSeries.length) {
      switch (diceSeries[diceThrow]) {
        case 6: vidRef6.current.play(); break;
        case 1: vidRef1.current.play(); break;
        case 2: vidRef2.current.play(); break;
        case 3: vidRef3.current.play(); break;
        case 4: vidRef4.current.play(); break;
        case 5: vidRef5.current.play(); break;
        default: break;
      }
    }
    else
      alert("you cant play anymore")


  }

  const endOfAnimation = () => {
    console.log("thrown "+diceSeries[diceThrow])
    if (diceSeries[diceThrow] == 6)
      showMessage(setOpen);
    else if (diceSeries[diceThrow] == 5)
      alert('not won but can try again');
    else
      alert("you lost")
    setDiceThrow(diceThrow + 1);
  }
  const Game = () => {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h3" component="h2" gutterBottom>
          Jeu pour gagner son panier
        </Typography>
        <Typography variant="body1" gutterBottom >
          Veuillez cliquer sur le bouton si vous voulez tenter le panier que vous venez de créer.
        </Typography>
        <br></br><video ref={vidRef1} onEnded={endOfAnimation} hidden={diceSeries[diceThrow] !== 1} >
          <source src={vid1} type="video/mp4" />
        </video><video ref={vidRef2} onEnded={endOfAnimation} hidden={diceSeries[diceThrow] !== 2}>
          <source src={vid2} type="video/mp4" />
        </video><video ref={vidRef3} onEnded={endOfAnimation}  hidden={diceSeries[diceThrow] !== 3}>
          <source src={vid3} type="video/mp4" />
        </video><video ref={vidRef4} onEnded={endOfAnimation}  hidden={diceSeries[diceThrow] !== 4}>
          <source src={vid4} type="video/mp4" />
        </video><video ref={vidRef5} onEnded={endOfAnimation}  hidden={diceSeries[diceThrow] !== 5}>
          <source src={vid5} type="video/mp4" />
        </video><video ref={vidRef6} onEnded={endOfAnimation}  hidden={diceSeries[diceThrow] !== 6}>
          <source src={vid6} type="video/mp4" />
        </video>
        <Button color="primary" variant="contained" onClick={handlePlayVideo}>Jeter les dés</Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Félicitations! Vous avez gagné!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Afin de pouvoir vous contacter pour vous fournir les informations nécessaires, veuillez entrer votre mél.
          </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Adresse mél"
              type="email"
              fullWidth
              onChange={(e) => setMail(e.target.value)}
              value={mail}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuler
          </Button>
            <Button onClick={saveMail} color="primary">
              Envoyer
          </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    )
  }
  return (
    <div>{diceSeries!= null && diceSeries.length != 0 ? <Game /> : "Loading..."}
    </div>);
}