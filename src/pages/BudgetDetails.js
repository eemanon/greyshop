//Components to show instructions
//props: next=next page

//material ui
import Paper from '@material-ui/core/Paper';
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
    marginBottom: "10px"
  },
  typo: {
    textAlign: "left"
  }

}));


export default function BudgetDetails(props) {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h3" component="h2" gutterBottom>
          Budget
          </Typography>
        <Typography variant="body1" gutterBottom className={classes.typo}>
          Bonjour et bienvenue. Vous allez participer à une experience qui va consister à faire des achats dans un magasin en ligne.
          Nous vous octroyons un budget de 25 euros pour faire vos courses.
        </Typography>
        <Button color="primary" variant="contained" onClick={() => props.next()}>Continuer</Button>
      </Paper>
    </div>
  );
}