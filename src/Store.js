import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import SideDrawer from './SideDrawer.js'
import Chip from '@material-ui/core/Chip';

import ProductCard from './ProductCard';
import Basket from './Basket.js'
import ThermoCard from './Thermometer';
import ShopLandingPage from "./ShopLandingPage"

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

function sumHT(basket){
  console.log("callTHT")
  let sumHT = 0.0;
  basket.forEach(item => {
    sumHT = sumHT + item["Prix initial"] * item.quantity;
  });
  return sumHT;
}  

function carbonWeight(basket){
  let carbonWeight = 0.0;
  basket.forEach(item => {
    carbonWeight = carbonWeight + item.quantity * (item.Grammes/100*item["Empreinte CO2 (g par 100 g)"]);
  });
  const carbonWeightkg = carbonWeight/1000
  console.log("carbonWeight actuelle: "+carbonWeightkg)
  return carbonWeightkg;
} 
function basketWeight(basket){
  let basketWeight = 0.0;
  basket.forEach(item => {
    basketWeight = basketWeight + item.quantity * (item.Grammes);
  });
  const basketWeightkg = basketWeight/1000
  console.log("basketWeight actuelle: "+basketWeightkg)
  return basketWeightkg;
} 

export default function Store(props) {
  const classes = useStyles();
  const items = props.products;
  const [basket, setBasket] = React.useState([]);
  const [value, setValue] = React.useState(-1);
  const [totalHT, setTotalHT] = React.useState(0.0);
  const addToBasket = (item) => {
    const found = basket.find(product => product.id === item.id)
    if (found == null) {
      item.quantity = 1;
      setBasket(basket => [...basket, item]);
    }
    else {
      setBasket(basket => {
        const newBasket = basket.map(product => {
          if (product.id === item.id) {
            product.quantity = product.quantity + 1;
          }
          return product
        });
        return newBasket;
      });
    }
  }
  const removeFromBasket = (item) => {
    if (item.quantity > 1) {
      setBasket(basket => {
        const newBasket = basket.map(produc => {
          if (produc.id === item.id) {
            console.log("before: " + produc.quantity)
            produc.quantity = produc.quantity - 1;
            console.log("after: " + produc.quantity)
          }
          return produc
        });
        return newBasket;
      })
    }
    else {
      setBasket(basket => {
        const newBasket = basket.filter(product => product.id !== item.id
        );
        return newBasket;
      });
    }
  };
  const showCategory = () => {
    if (value === -1) {
      return (<ShopLandingPage variant="2"></ShopLandingPage>)
    }
    else {
      const found = items.find(category => category.id === value);
      return (
        <Grid container spacing={3} className={classes.grid}>
          {found.products.map((item, i) => (
            <Grid item xs={6} md={4} lg={3} xl={2}>
              <ProductCard add={addToBasket} item={item} name={item["Descriptif Produit"]} quantity={item["Grammes"]} unit="g" imagePath={item["Lien fichier"]} alt="alt" indicator={item["kg CO2 / kg"]} priceInEuros={item["Prix initial"]} pricePerUnit={item["Prix/quantité (euro/kg) baseline"]} color={item["Traffic light inter"]} mode="0"></ProductCard>
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
        <Chip label="Acceuil" color={value === -1 ? "primary" : "default"} onClick={(i) => { handleChange(-1) }} />
        {items.map((item, i) => (
          <Chip label={item.name} color={value === item.id ? "primary" : "default"} onClick={(i) => { handleChange(item.id) }} />
        ))}
      </div>
      {showCategory()}
      <SideDrawer drawerwidth={drawerWidth} >
        <ThermoCard value={basketWeight(basket)!==0?carbonWeight(basket)/basketWeight(basket):0}></ThermoCard>
        <Divider />
        <Basket next={props.next} basket={basket} remove={removeFromBasket} add={addToBasket} ht={sumHT(basket)} taxe={carbonWeight(basket)>14.22?(carbonWeight(basket)-14.22)*0.25:0}></Basket>
      </SideDrawer>

    </div>
  );
}