//Component to display a styled drawer.
//props:none

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';


export default function SideDrawer(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
          marginRight: props.drawerwidth
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
          width: props.drawerwidth,
          flexShrink: 0,
        },
        drawerPaper: {
          width: props.drawerwidth,
        },
        toolbar: theme.mixins.toolbar,
      }));
    const classes = useStyles();
    return (
<Drawer className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
        >
        <div className={classes.toolbar} />
        <Divider />
            {props.children}
      </Drawer>);
}