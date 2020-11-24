
import Paper from '@material-ui/core/Paper';
import React, { useRef, useState } from 'react';
import vid5 from './videos/vid5.webm'
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
        marginBottom:"10px"
    },
  
  }));

function showMessage (setOpen){
    setOpen(true)
    console.log("fired")

}
export default function DiceGame(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const vidRef = useRef(null);
    const handleClose = () => {
        setOpen(false);
      };
    const handlePlayVideo = () => {
    vidRef.current.play();
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
    <video ref={vidRef} onEnded={()=>showMessage(setOpen)}>
      <source src={vid5} type="video/mp4" />
    </video><br></br>
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