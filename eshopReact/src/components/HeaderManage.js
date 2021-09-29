import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Font, {} from 'react-font';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

  

const useStyles = makeStyles((theme) => ({
    button: {
      margin: -10,
      left: 12,
      position: "fixed",
      
    }
  }));

const HeaderManage = () => {


    const classes = useStyles();

    return (
        
        <header>
            <Font family='Red Hat Display'>
                <h1 style={headerStyle}>Chairs Pro</h1>
            </Font>
            <Link to="/home">
                <Button
                    className = "homeButton"
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<HomeOutlinedIcon />}
                >
                    Home
                </Button> 
            </Link>
           
        </header>
        
    )
}

const headerStyle = {
			textAlign: "center",
			paddingTop: "3px",
			paddingBottom: "3px",
			marginBottom: "10px",
            marginTop:"0px",
			fontSize: "30px",
			fontStyle: "italic",
			backgroundColor: "#282c34",
			color: "white",
            
			
			position: "fixed",
			top: "0",
			width: "100%",
            display: "flex",
            flexDirection: "column",
            
  }
const homeButton = {
    marginRight: "0px",

}
export default HeaderManage
