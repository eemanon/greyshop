import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import SideDrawer from './SideDrawer.js'
import Chip from '@material-ui/core/Chip';

import ProductCard from './ProductCard';
import Basket from './Basket.js'
import ThermoCard from './Thermometer';
import Products from './DataLoader';


const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginRight: drawerWidth
  },
  panel: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  appbar: {
    width: '100%',
  },
  grid: {
    marginTop: "40px",
    padding: "10px"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  }
}));

export default function Store(props) {
  const classes = useStyles();
  const items = Products();
  const [value, setValue] = React.useState(-1);
  const showCategory = () => {
    if(value===-1){
      return(<div>Landing Screen :)</div>)
    }
    else {
    const found = items.find(category => category.id === value);
      return(
        <Grid container spacing={3} className={classes.grid}>
          {found.products.map((item, i) => (
            <Grid item xs={6} md={4} lg={3} xl={2}>
            <ProductCard name={item["Descriptif Produit"]} quantity={item["Grammes"]} unit="g" imagePath={item["Lien fichier"]} alt="alt" indicator={item["kg CO2 / kg"]} priceInEuros={item["Prix initial"]} pricePerUnit={item["Prix/quantité (euro/kg) baseline"]} color="red" mode="0"></ProductCard>
            </Grid>
          ))}
        </Grid>
      );
    }
  }
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <div className={classes.toolbar}>
      <Chip label="Acceuil" color={value===-1?"primary":"default"} onClick={(i) => {handleChange(-1)}}/>
      {items.map((item, i) => (
                <Chip label={item.name} color={value===item.id?"primary":"default"} onClick={(i) => {handleChange(item.id)}}/>
            ))}
      </div>{/*needs conditional display based on "value"*/}
      {showCategory()}
    <SideDrawer drawerwidth={drawerWidth} >
      <ThermoCard></ThermoCard>
      <Divider />
      <Basket next={props.next}></Basket>
    </SideDrawer>
        
    </div>
  );
}