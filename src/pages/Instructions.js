//Components to show instructions
//props: next=next page

//material ui
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Logo from '../images/clle_logo.png'


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
    marginBottom: "10px"
  },
  typo: {
    textAlign: "left"
  }

}));


export default function Instructions(props) {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.root}>
        <img src={Logo} alt="Logo" width="20%" />
        <Typography variant="h3" component="h2" gutterBottom>
          Instructions
          </Typography>
        <Typography variant="body1" gutterBottom className={classes.typo}>
          Nous vous remercions d’avoir accepté de participer à cette expérience.
          Elle  consiste à faire vos courses dans un magasin d’alimentation en ligne fictif.
          Vous avez la possibilité de gagner votre panier à la fın de l’expérience,
          choisissez-donc les produits que vous consommez dans votre quotidien. La passation durera environ 25 minutes.
              </Typography>
        <Typography variant="body1" gutterBottom className={classes.typo}>
          Cette expérience est menée dans le cadre d’un projet de recherche scientifique. Les données recueillies seront traitées de façon  anonyme.
              </Typography>
        <Typography variant="body1" gutterBottom className={classes.typo}>
          Après avoir terminé vos courses, nous vous demanderons de répondre à quelques questions. Veuillez noter qu’il n’y a ni bonnes ni mauvaises réponses, seul votre avis nous intéresse.
              </Typography>
        <Typography variant="body1" gutterBottom className={classes.typo}>
          Budget :
              </Typography>
        <Typography variant="body1" gutterBottom className={classes.typo}>
          Nous vous octroyons un budget de 25 euros pour votre visite dans le magasin.
          Vous devrez dépenser un minimum de 20 euros avant de pouvoir quitter le magasin.
          Cependant, la part des 25 euros non dépensée lors de vos achats ne vous sera pas rendue en liquide.
              </Typography>
        <Typography variant="body1" gutterBottom className={classes.typo}>
          Récompense :
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.typo}>
          Vous aurez une chance sur cinq de remporter le panier de courses alimentaires que vous avez composé durant l’expérience.
                    </Typography>
        <Typography variant="body1" gutterBottom className={classes.typo}>
          Afin de déterminer si vous remportez le panier, vous jetterez un dé. Si le dé tombe sur 6, vous gagnerez le panier,
          s’il tombe sur 5, vous jetterez le dé à nouveau.
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.typo}>
          Si vous gagnez, vous pourrez aller chercher vos produits dans un magasin « Casino » au centre de  Toulouse, dont nous vous fournirons l’adresse.
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.typo}>
          Nous vous remercions pour votre participation.
        </Typography>
        <Typography variant="body1" gutterBottom className={classes.typo}>
          Estefanya Vazquez (estefanya.vazquez@etu.univ-tlse2.fr) <br></br>
          Étudiante en Master 2 PEPSCO<br></br>
          Ayşegül Kanay (aysegul.kanay@univ-tlse2.fr) <br></br>
          Doctorante en CLLE-LTC <br></br>
          Sous la direction de Denis Hilton et Stefan Ambec<br></br>
        </Typography>

        <Button color="primary" variant="contained" onClick={() => props.next()}>Continuer</Button>


      </Paper>
    </div>
  );
}