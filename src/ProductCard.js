

import Paper from '@material-ui/core/Paper';
import React, { useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    padding: "10px"
    },
    priceperUnit: {
        color: "grey"
    },
    appbar: {
      width: '100%',
    },
    typo: {
      marginTop: "40px",
      padding: "10px",
      display: "inline-block"
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));


export default function ProductCard(props) {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.root}>
            <Typography variant="h6" component="h2" gutterBottom>
            {props.name}
          </Typography>
                <img src={process.env.PUBLIC_URL+props.imagePath} alt={props.alt} width="70%"/>
                <Typography variant="body1" gutterBottom className={classes.typo} style={{backgroundColor: props.color}} component={'span'}>
                {props.indicator} kg de CO2 émis par kg de produit
                </Typography>
                <Typography variant="body1" gutterBottom className={classes.typo} component={'span'}>
                Prix: {props.priceInEuros} € <div className={classes.priceperUnit} >{props.pricePerUnit} €/kg</div>
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => props.add(props.item)}
                    color="default"
                    className={classes.button}
                    startIcon={<AddShoppingCartIcon/>}
                >Ajouter au Panier </Button>
            </Paper>
        </div>
    );
}