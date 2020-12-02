//Component that displays a shop.
//props: variant: a json object with the changes depending on the shop variant to be displayed 
// products=a json object containing the categories containing the products to display} 
// next=next page

import React from 'react';

//material ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

//component imports
import SideDrawer from '../components/SideDrawer.js'
import ProductCard from '../components/ProductCard';
import Basket from '../components/Basket.js'
import ThermoCard from '../components/Thermometer';
import ShopLandingPage from "../components/ShopLandingPage"


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

function sumHT(basket) {
  //calc the sum without tax based on the basket object
  let sumHT = 0.0;
  basket.forEach(item => {
    sumHT = sumHT + item["Prix initial"] * item.quantity;
  });
  return sumHT;
}

function carbonWeight(basket) {
  //calc carbon footprint of basket based on the items in the basket
  let carbonWeight = 0.0;
  basket.forEach(item => {
    carbonWeight = carbonWeight + item.quantity * (item.Grammes / 100 * item["Empreinte CO2 (g par 100 g)"]);
  });
  const carbonWeightkg = carbonWeight / 1000
  return carbonWeightkg;
}
function basketWeight(basket) {
  //calc the weight of the basket
  let basketWeight = 0.0;
  basket.forEach(item => {
    basketWeight = basketWeight + item.quantity * (item.Grammes);
  });
  const basketWeightkg = basketWeight / 1000
  return basketWeightkg;
}



export default function Store(props) {
  const [notSeenInstructions, setNotSeenInstructions] = React.useState(true);
  let timestamp_leave_instructions = null;
  let timestamp_start_instructions = null;
  const classes = useStyles();
  const items = props.products;
  const [basket, setBasket] = React.useState([]);
  const [categoryIndex, setValue] = React.useState(-1);
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
  //returns categories and containing products 
  const showCategory = () => {
    if (categoryIndex === -1) {
      if(notSeenInstructions){
        timestamp_start_instructions = Date.now();
        console.log("instructions loaded at "+timestamp_start_instructions)
      }

      return (<ShopLandingPage variant={props.variant.number}></ShopLandingPage>)
    }
    else {
      //if we leave the instructions page for the first time, we store the time.
      if(notSeenInstructions){
        timestamp_leave_instructions = Date.now();
        console.log("left instructions at "+timestamp_leave_instructions)
        setNotSeenInstructions(false)
      }
      const found = items.find(category => category.id === categoryIndex);
      return (
        <Grid container spacing={3} className={classes.grid}>
          {found.products.map((item, i) => (
            <Grid key={item.id} item xs={6} md={4} lg={3} xl={2}>
              <ProductCard add={addToBasket} item={item} name={item["Descriptif Produit"]} quantity={item["Grammes"]}
                unit="g" imagePath={item["Lien fichier"]} alt="alt" indicator={item["kg CO2 / kg"]}
                priceInEuros={item["Prix initial"]} pricePerUnit={item["Prix/quantité (euro/kg) baseline"]}
                color={item["Traffic light inter"]} label={props.variant.labels} labelpos={props.variant.labelpos} labeltext={props.variant.labeltext}>
              </ProductCard>
            </Grid>
          ))}
        </Grid>
      );
    }
  }
  //method to change currently selected category
  const changeCategory = (newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <div className={classes.toolbar}>
        <Chip label="Acceuil" color={categoryIndex === -1 ? "primary" : "default"} onClick={(i) => { changeCategory(-1) }} />
        {items.map((item, i) => (
          <Chip label={item.name} key={item.id} color={categoryIndex === item.id ? "primary" : "default"} onClick={(i) => { changeCategory(item.id) }} />
        ))}
      </div>
      {showCategory()}
      <SideDrawer drawerwidth={drawerWidth} >
        {props.variant.thermometer ? <ThermoCard label={props.variant.thermometerlabel}
          value={basketWeight(basket) !== 0 ? carbonWeight(basket) / basketWeight(basket) : 0}></ThermoCard> : ""}
        <Divider />
        <Basket next={props.next} basket={basket} remove={removeFromBasket} add={addToBasket} ht={sumHT(basket)}
          showTax={props.variant.tax} taxe={carbonWeight(basket) > 14.22 ? (carbonWeight(basket) - 14.22) * 0.25 : 0}>
        </Basket>
      </SideDrawer>

    </div>
  );
}