import React, {Component} from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },

    }
    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading: true});
        const order = {
          ingredients: this.props.ingredients,
          price: this.props.price,
          customer: {
            name: "Yura Oryshchych",
            address: {
              street: "teststreet",
              zipCode: "11111",
              country: "Ukraine"
            },
            email: "test@test.com"
          },
          deliveryMode: "fastest"
        }
        axios.post("/orders.json", order)
        .then( response => {
          this.setState({
            loading: false,
          });
          this.props.history.push("/")
        })
        .catch( error => {
          console.log(error)
          this.setState({
            loading: false,
            });
        });
    }
    render () {
        return (
            <div className={classes.ContactData}>
               <h4>Enter you data:</h4>
               <form>
                   <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
                   <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
                   <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                   <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                   <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
               </form>
            </div>
        );
    }
}

export default ContactData;