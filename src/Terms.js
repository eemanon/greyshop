import Paper from '@material-ui/core/Paper';
import React, { useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "10px",
    padding: "10px",
    maxWidth: "1000px",
    display: "inline-block",
    marginTop: "30px"
  },
  textfield: {
      marginBottom:"10px"
  },

}));

export default function Terms(props) {
    const classes = useStyles();
    const [ticked, setTicked] = useState( false );
    return (
        <div>
        <Paper className={classes.root}>
          <Typography variant="h3" component="h2" gutterBottom> 
                FORMULAIRE DE CONSENTEMENT ECLAIRE
          </Typography>
          <Typography variant="body1" gutterBottom >
          Je certifie donner mon accord pour participer à une étude portant sur les comportements d’achats en ligne. 
          J'accepte volontairement de participer à cette étude et je comprends que ma participation n'est pas obligatoire 
          et que je peux arrêter à tout moment, sans avoir à me justifier, ni encourir aucune responsabilité. 
          Au cours de cette étude, j'accepte que soient recueillies des données sur mes réponses. 
          Je comprends que les informations recueillies sont strictement confidentielles et à usage exclusif des investigateurs de cette étude. 
          J'ai été informé(e) que mes données sont anonymes et que par conséquent mon identité n'apparaitra dans aucun rapport ou publication et 
          que toute information me concernant sera traitée de façon confidentielle. J'accepte que les données enregistrées à l'occasion de cette étude 
          puissent être conservées dans une base de données et faire l'objet d'un traitement informatisé.
          </Typography>
          
          <FormControlLabel
            control={
                <Checkbox
                    onChange={() => setTicked(!ticked)}
                    name="checkedB"
                    color="primary"
                />
                }
                label="J’ai lu, compris et accepté les termes du consentement éclairé ci-dessus."
            /> 
            <br></br>
          <Button color="primary" disabled={!ticked} variant="contained" onClick={() => checkIfAgree(ticked, props)}>Continuer</Button>
  
          
        </Paper>
      </div>
    );
}
function checkIfAgree(ticked, props){
    //send to db 
    //TODO
    console.log("TODO")
    //next
    props.next();
}