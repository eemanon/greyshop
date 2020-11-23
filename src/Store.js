import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProductCard from './ProductCard';

import Divider from '@material-ui/core/Divider';
import SideDrawer from './SideDrawer.js'
import Chip from '@material-ui/core/Chip';
import Basket from './Basket.js'
import ThermoCard from './Thermometer';

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

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      color:"primary"
    };
  }

const categories = ["Acceuil", "Fruits et légumes", "Viandes et poissons", "Produits laitiers et oeufs", "Plats préparés","Epicerie salée","Epicerie sucrée"];


export default function Store(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(categories[0]);

  const handleChange = (newValue) => {
    setValue(newValue);
    console.log(newValue)
  };
  return (
    <div className={classes.root}>
      <div className={classes.toolbar}>
      {categories.map((item, i) => (
                <Chip label={item} color={value===item?"primary":"default"} onClick={(i) => {handleChange(item)}}/>
            ))}
      </div>
      {categories.map((item, i) => (
                    <Grid container spacing={3} className={classes.grid}>
                        <Grid item xs={6} md={4} lg={3} xl={2}>
                        <ProductCard name="sweet sweets" quantity="200" unit="g" imagePath="./images/clle_logo.png" alt="alt" indicator="23.4" priceInEuros="2.0" pricePerUnit="202.2" color="red" mode="0"></ProductCard>
                        </Grid>
                        <Grid item xs={6} md={4} lg={3} xl={2}>
                        <ProductCard name="sweet sweets" quantity="200" unit="g" imagePath="./images/clle_logo.png" alt="alt" indicator="23.4" priceInEuros="2.0" pricePerUnit="202.2" color="red" mode="0"></ProductCard>
                        </Grid><Grid item xs={6} md={4} lg={3} xl={2}>
                        <ProductCard name="sweet sweets" quantity="200" unit="g" imagePath="./images/clle_logo.png" alt="alt" indicator="23.4" priceInEuros="2.0" pricePerUnit="202.2" color="red" mode="0"></ProductCard>
                        </Grid><Grid item xs={6} md={4} lg={3} xl={2}>
                        <ProductCard name="sweet sweets" quantity="200" unit="g" imagePath="./images/clle_logo.png" alt="alt" indicator="23.4" priceInEuros="2.0" pricePerUnit="202.2" color="red" mode="0"></ProductCard>
                        </Grid><Grid item xs={6} md={4} lg={3} xl={2}>
                        <ProductCard name="sweet sweets" quantity="200" unit="g" imagePath="./images/clle_logo.png" alt="alt" indicator="23.4" priceInEuros="2.0" pricePerUnit="202.2" color="red" mode="0"></ProductCard>
                        </Grid><Grid item xs={6} md={4} lg={3} xl={2}>
                        <ProductCard name="sweet sweets" quantity="200" unit="g" imagePath="./images/clle_logo.png" alt="alt" indicator="23.4" priceInEuros="2.0" pricePerUnit="202.2" color="red" mode="0"></ProductCard>
                        </Grid><Grid item xs={6} md={4} lg={3} xl={2}>
                        <ProductCard name="sweet sweets" quantity="200" unit="g" imagePath="./images/clle_logo.png" alt="alt" indicator="23.4" priceInEuros="2.0" pricePerUnit="202.2" color="red" mode="0"></ProductCard>
                        </Grid>
                    </Grid>
            ))}
    <SideDrawer drawerwidth={drawerWidth} >
      <ThermoCard></ThermoCard>
      <Divider />
      <Basket next={props.next}></Basket>
    </SideDrawer>
        
    </div>
  );
}