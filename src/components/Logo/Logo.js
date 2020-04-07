import React from "react";
import logoImg from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";

const logo = props => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={logoImg} alt="MyBurger"/>
    </div>
);

export default logo;