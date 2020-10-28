import React, {Component} from "react";
import classes from "./Orders.module.css";
import Order from "../../../components/Order/Order";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/withErrorsHandler/withErrorsHandler";
import * as actions from "../../../store/actions/order";
import {connect} from "react-redux";
import Spinner from "../../../components/UI/Spinner/Spinner";
class Orders extends Component {
    state = {
        orders: [],
    }
    componentDidMount() {
       this.props.onFetchOrders();
    }
    render () {
        let orders = <Spinner/>
        if (!this.props.loading) {
            orders = this.props.orders.map(order => {
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
}

const mapPropsToState = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
}

export default connect(mapPropsToState, mapDispatchToProps)(withErrorHandler(Orders, axios));