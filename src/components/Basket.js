//Component to display the contents of the basket and (sub)totals
//props: next=next Page basket=basket remove=function to remove item from basket add=function to add item to basket  ht=sum without taxes 
//showTax=boolean if tax is to be included taxe=value of the tax

import React from 'react';

//material ui imports
import Divider from '@material-ui/core/Divider';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    overflow: "auto",
    marginBottom: "10px"
  },
  table: {

  },
  list: {
  },
  btngroup: {

  },
  button: {

  }
}));

function format2Digit(number) {
  //function to cut off unneccesary digits behind comma
  return Math.round(number * 100) / 100
}

function check(value, tax, taxAdded) {
  //check if basket value is between 20 and 25 €
  if (taxAdded) {
    if (value + tax < 20 || value + tax > 25)
      return true;
  } else {
    if (value < 20 || value > 25)
      return true;
  }
  return false;
}

export default function Basket(props) {
  const classes = useStyles();
  return (

    <div className={classes.root}>
      <Typography variant="h6">
        Votre Panier
      </Typography>
      <br></br>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" size="small">
          <TableBody>
            {props.showTax ? <TableRow>
              <TableCell component="th" scope="row">
                Total en cours HT
                </TableCell>
              <TableCell align="left">{format2Digit(props.ht)} €</TableCell>
            </TableRow> : ""}
            {props.showTax ? <TableRow>
              <TableCell component="th" scope="row">
                Taxe
                </TableCell>
              <TableCell align="left">{format2Digit(props.taxe)} €</TableCell>
            </TableRow> : ""}

            <TableRow>
              <TableCell component="th" scope="row">
                Total en cours
                </TableCell>
              <TableCell align="left">{props.showTax ? format2Digit(props.ht + props.taxe) : format2Digit(props.ht)} €</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
      <List className={classes.list}>
        <ListSubheader component="div" id="nested-list-subheader">
          {props.basket.length === 0 ? "Votre panier est vide" : "Produits selectionnées"}
        </ListSubheader>
        {props.basket.map((item) => {
          return (
            <ListItem key={item.id} role={undefined} dense button >
              <ListItemText>
                {item.quantity}x {item["Descriptif Produit"]}
              </ListItemText>
              <ButtonGroup className={classes.btngroup} size="small" color="primary" aria-label="outlined primary button group">
                <Button onClick={() => props.remove(item)}>-</Button>
                <Button onClick={() => props.add(item)}>+</Button>
              </ButtonGroup>
            </ListItem>
          );
        })}
      </List>
      <Tooltip title="Le panier doit être entre 20 et 25 €">
        <Button
          variant="contained"
          color={check(props.ht, props.taxe, props.showTax) ? "default" : "primary"}
          size="small"
          className={classes.button}
          onClick={() => props.next()}
          startIcon={<ShoppingCartIcon />}
        >
          Checkout
      </Button>
      </Tooltip>
    </div>
  );
}