import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route, Redirect, withRouter} from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import {connect} from 'react-redux';

const Checkout = (props) => {
    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }
    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }
    let summary = <Redirect to="/"/>;
    if (props.ings) {
        const purchasedRedirect = props.purchased ? <Redirect to="/"/> : null;
        summary = (
        <div>
            {purchasedRedirect}
            <CheckoutSummary 
                ingredients={props.ings}
                checkoutCancel={checkoutCancelledHandler}
                checkoutContinued={checkoutContinuedHandler}/>
            <Route path={props.match.path + "/contact-data"} component={ContactData}/>
        </div>);
    }
    return summary;
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.orders.purchased
    }
}

export default withRouter(connect(mapStateToProps)(Checkout));