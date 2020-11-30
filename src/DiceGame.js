
import Paper from '@material-ui/core/Paper';
import React, { useRef, useState } from 'react';
import vid1 from './videos/vid1.webm'
import vid2 from './videos/vid2.webm'
import vid3 from './videos/vid3.webm'
import vid4 from './videos/vid4.webm'
import vid5 from './videos/vid5.webm'
import vid6 from './videos/vid6.webm'

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

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

function showMessage(setOpen) {
  setOpen(true)
  console.log("fired")

}
export default function DiceGame(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const vidRef1 = useRef(null);
  const vidRef2 = useRef(null);
  const vidRef3 = useRef(null);
  const vidRef4 = useRef(null);
  const vidRef5 = useRef(null);
  const vidRef6 = useRef(null);
  const [dice, setDice] = React.useState(1);

  const handleClose = () => {
    setOpen(false);
  };
  const handlePlayVideo = () => {
    let value= Math.round((Math.random()*6)%6+1);
    console.log(value)
    setDice(value)
    switch(value){
      case 6: vidRef6.current.play();break;
      case 1: vidRef1.current.play();break;
      case 2: vidRef2.current.play();break;
      case 3: vidRef3.current.play();break;
      case 4: vidRef4.current.play();break;
      case 5: vidRef5.current.play();break;
    }
    
  }
  return (
    <div>
      <Paper className={classes.paper}>
        <Typography variant="h3" component="h2" gutterBottom>
          Jeu pour gagner son panier
        </Typography>
        <Typography variant="body1" gutterBottom >
          Veuillez cliquer sur le bouton si vous voulez tenter le panier que vous venez de créer.
        </Typography>
        <br></br><video ref={vidRef1} onEnded={() => alert("lost")} hidden={dice!==1} >
    <source src={vid1} type="video/mp4" />
  </video><video ref={vidRef2} onEnded={() => alert("lost")} hidden={dice!==2}>
    <source src={vid2} type="video/mp4" />
  </video><video ref={vidRef3} onEnded={() => alert("lost")} hidden={dice!==3}>
    <source src={vid3} type="video/mp4" />
  </video><video ref={vidRef4} onEnded={() => alert("lost")} hidden={dice!==4}>
    <source src={vid4} type="video/mp4" />
  </video><video ref={vidRef5} onEnded={() => alert("not won but you can try again.")} hidden={dice!==5}>
    <source src={vid5} type="video/mp4" />
  </video><video ref={vidRef6} onEnded={() => showMessage(setOpen)} hidden={dice!==6}>
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
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Annuler
          </Button>
            <Button onClick={handleClose} color="primary">
              Envoyer
          </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>);
}