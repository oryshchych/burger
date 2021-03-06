import React, {useEffect} from "react";
import classes from "./Orders.module.css";
import Order from "../../../components/Order/Order";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/withErrorsHandler/withErrorsHandler";
import * as actions from "../../../store/actions/order";
import {connect} from "react-redux";
import Spinner from "../../../components/UI/Spinner/Spinner";

const Orders = (props) => {
    useEffect(() => {
       props.onFetchOrders(props.token, props.userId);
    }, []);

    let orders = <Spinner/>
    if (!props.loading) {
        orders = props.orders.map(order => {
            return (
                <Order key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}/>
            )
        })
    }
    return (
        <div className={classes.Orders}>
            {orders}
        </div>
    );
}

const mapPropsToState = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    };
}

export default connect(mapPropsToState, mapDispatchToProps)(withErrorHandler(Orders, axios));