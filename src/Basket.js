import React from 'react';
import Divider from '@material-ui/core/Divider';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    overflow: "auto",
    marginBottom: "10px"
  },
  table: {
    
  },
list: {
  minHeight: "200px"
}
}));

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
            <TableRow>
                <TableCell component="th" scope="row">
                  Total en cours HT
                </TableCell>
                <TableCell align="left">12.3</TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row">
                  Taxe
                </TableCell>
                <TableCell align="left">0.3</TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row">
                  Total en cours
                </TableCell>
                <TableCell align="left">12.6</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
      <List className={classes.list}>
      <ListSubheader component="div" id="nested-list-subheader">
          Produits selectionnées
        </ListSubheader>
      {[0, 1, 2, 3,4,5,6,7].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem key={value} role={undefined} dense button >
            <ListItemText>
              2x blbal
            </ListItemText>
            <ListItemSecondaryAction>
            <ButtonGroup size="small" fullWidth color="primary" aria-label="outlined primary button group">
                <Button>-</Button>
                <Button>+</Button>
              </ButtonGroup>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
    <Button
        variant="contained"
        color="default"
        size="small"
        className={classes.button}
        onClick={() => props.next()}
        startIcon={<ShoppingCartIcon />}
      >Checkout</Button>
    </div>
  );
}