import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProductCard from './ProductCard';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';


import therm from './images/thermometer_placeholder.png' 

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginRight: drawerWidth
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
  toolbar: theme.mixins.toolbar,
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
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

const categories = ["Acceuil", "Fruits et légumes", "Viandes et poissons", "Produits laitiers et oeufs", "Plats préparés","Epicerie salée","Epicerie sucrée"];


export default function FullWidthGrid() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
     <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
            {categories.map((item, i) => (
                <Tab label={item} {...a11yProps(i)} />
            ))}
        </Tabs>
      </AppBar>
      {categories.map((item, i) => (
                <TabPanel value={value} index={i}>
                    <Grid container spacing={3} className={classes.grid}>
                        <Grid item xs={12} sm={6} md={3} lg={2}>
                        <ProductCard name="sweet sweets" quantity="200" unit="g" imagePath="./images/clle_logo.png" alt="alt" indicator="23.4" priceInEuros="2.0" pricePerUnit="202.2" color="red" mode="0"></ProductCard>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={2}>
                        <ProductCard name="sweet sweets" quantity="200" unit="g" imagePath="./images/clle_logo.png" alt="alt" indicator="23.4" priceInEuros="2.0" pricePerUnit="202.2" color="red" mode="0"></ProductCard>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={2}>
                        <ProductCard name="sweet sweets" quantity="200" unit="g" imagePath="./images/clle_logo.png" alt="alt" indicator="23.4" priceInEuros="2.0" pricePerUnit="202.2" color="red" mode="0"></ProductCard>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={2}>
                        <ProductCard name="sweet sweets" quantity="200" unit="g" imagePath="./images/clle_logo.png" alt="alt" indicator="23.4" priceInEuros="2.0" pricePerUnit="202.2" color="red" mode="0"></ProductCard>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={2}>
                        <ProductCard name="sweet sweets" quantity="200" unit="g" imagePath="./images/clle_logo.png" alt="alt" indicator="23.4" priceInEuros="2.0" pricePerUnit="202.2" color="red" mode="0"></ProductCard>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={2}>
                        <ProductCard name="sweet sweets" quantity="200" unit="g" imagePath="./images/clle_logo.png" alt="alt" indicator="23.4" priceInEuros="2.0" pricePerUnit="202.2" color="red" mode="0"></ProductCard>
                        </Grid>
                    </Grid>
                </TabPanel>
            ))}

        <Drawer className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
        >
          <div className={classes.toolbar} />
        <Divider />
        <img src={therm} alt="therm"/>

        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}