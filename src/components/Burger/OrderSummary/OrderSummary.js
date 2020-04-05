import React from "react";
import Aux from "../../../hoc/AuxComponent";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
    const ingridientSummary = Object.keys(props.ingridients)
        .map(igKey => {
        return <li key={igKey}><span style={{textTransformation: "capitalize"}}>{igKey}</span>: {props.ingridients[igKey]}</li>
        })
    return (
    <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
            {ingridientSummary}
        </ul>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
        <Button btnType="Success" clicked={props.continue}>Continue</Button>
    </Aux>
    )
}

export default orderSummary;