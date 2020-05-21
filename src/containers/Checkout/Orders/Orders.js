import React, {Component} from "react";
import classes from "./Orders.module.css";
import Order from "../../../components/Order/Order";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/withErrorsHandler/withErrorsHandler";

class Orders extends Component {
    state = {
        orders: [],
        loading: false
    }
    componentDidMount() {
        axios.get('/orders.json')
            .then( res => {
                console.log(res);
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({...res.data[key], id: key});
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(error => {
                this.setState({loading: false});
            })
    }
    render () {
        return (
            <div className={classes.Orders}>
                {this.state.orders.map(order => {
                    return (
                        <Order key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}/>
                    )
                })}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);