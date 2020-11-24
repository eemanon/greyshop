import Paper from '@material-ui/core/Paper';
import React, { useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "10px",
    padding: "10px",
    maxWidth: "1000px",
    display: "inline-block",
    marginTop: "30px",
    
  },
  textfield: {
      marginBottom:"10px"
  },
  typo: {
    textAlign: "left"
  }

}));


export default function Instructions(props) {
    const classes = useStyles();
    const [ticked, setTicked] = useState( false );
    return (
        <div>
        <Paper className={classes.root}>
        <img src={process.env.PUBLIC_URL+"/images/clle_logo.png"} alt="Logo" width="20%"/>
          <Typography variant="h3" component="h2" gutterBottom>
            Instructions 
          </Typography>
          <Typography variant="body1" gutterBottom className={classes.typo}>
              <p>
              Nous vous remercions d’avoir accepté de participer à cette expérience. 
              Elle  consiste à faire vos courses dans un magasin d’alimentation en ligne fictif. 
              Veuillez faire vos achats comme à votre habitude. Vous avez la possibilité de gagner votre panier à la fın de l’expérience, 
              choisissez-donc les produits que vous consommez dans votre quotidien. La passation durera environ 25 minutes.
              </p>
              <p>
              Cette expérience est menée dans le cadre d’un projet de recherche scientifique. Les données recueillies seront traitées de façon  anonyme. 
              </p>
              <p>
              Après avoir terminé vos courses, nous vous demanderons de répondre à quelques questions. Veuillez noter qu’il n’y a pas de bonnes et de mauvaises 
              réponses, seul votre avis nous intéresse.
              </p>
              <p>
              Budget :
              </p>
              <p>
              Vous disposerez d’un budget de 25 euros pour votre visite dans le magasin. 
              Vous devrez dépenser un minimum de 20 euros avant de pouvoir quitter le magasin. 
              Cependant, la part des 25 euros non dépensée lors de vos achats ne vous sera pas rendue en liquide. 
              </p>
              <p>
                  <p>
                  Récompense :
                  </p>
              
                    Vous aurez une chance sur cinq de remporter le panier de courses alimentaires que vous avez composé durant l’expérience.
              </p>
              <p>
              Afin de déterminer si vous remportez le panier, vous jetterez un dé. Si le dé tombe sur 5, vous gagnerez le panier, 
              s’il tombe sur 6, vous jetterez le dé à nouveau. 
              </p>
              <p>
              Si vous gagnez, vous pourrez aller chercher vos produits dans un magasin « Casino » au centre de  Toulouse, dont nous vous fournirons l’adresse. 
              </p>
              <p>
              Nous vous remercions pour votre participation.
              </p>
              <p>
              Estefanya Vazquez (estefanya.vazquez@etu.univ-tlse2.fr) <br></br>
Étudiante en Master 2 PEPSCO<br></br>
Ayşegül Kanay (aysegul.kanay@univ-tlse2.fr) <br></br>
Doctorante en CLLE-LTC <br></br>
Sous la direction de Denis Hilton<br></br>

              </p>
          </Typography>
    
          <Button color="primary" variant="contained" onClick={() => props.next()}>Continuer</Button>
  
          
        </Paper>
      </div>
    );
}