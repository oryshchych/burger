import React, {Component} from "react";
import Aux from "../../../hoc/AuxComponent/AuxComponent";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
    componentDidUpdate() {
        console.log("updated");
    }
    render () {
        const ingridientSummary = Object.keys(this.props.ingridients)
        .map(igKey => {
        return <li key={igKey}><span style={{textTransformation: "capitalize"}}>{igKey}</span>: {this.props.ingridients[igKey]}</li>
        })
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingridientSummary}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancel}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.continue}>Continue</Button>
            </Aux>
        );
    }
}

export default OrderSummary;