import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"},
    {label: "Salad", type: "salad"}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: {props.price.toFixed(2)}$</p>
        {controls.map(control => (
            <BuildControl disabledLessButton={props.disabled[control.type]} added={() => props.ingridientAdded(control.type)} removed={()=> props.ingridientRemoved(control.type)} key={control.label} label={control.label}/>
        ))}
        <button onClick={props.ordered} className={classes.OrderButton} disabled={!props.purchasable}>
            {props.isAuth
                ? "ORDER NOW"
                : "Sign in to order"}
            </button>
    </div>
);

export default buildControls;