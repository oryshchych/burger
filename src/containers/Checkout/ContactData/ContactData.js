import React, {Component} from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorsHandler from "../../../hoc/withErrorsHandler/withErrorsHandler";
import * as actionCreators from "../../../store/actions/index";
import {updateObject, checkValidity} from "../../../shared/utility";

class ContactData extends Component {
    state = {
        orderForm: {
          name: {
            elementType: "input",
            elementConfig: {
              type: 'text',
              placeholder: 'Your Name'
            },
            value: '',
            validation: {
              required: true
            },
            valid: false,
            touched: false
          },
          street: {
            elementType: "input",
            elementConfig: {
              type: 'text',
              placeholder: 'Street'
            },
            value: '',
            validation: {
              required: true
            },
            valid: false,
            touched: false
          },
          zipCode: {
            elementType: "input",
            elementConfig: {
              type: 'text',
              placeholder: 'Zip code'
            },
            value: '',
            validation: {
              required: true,
              minLength: 4
            },
            valid: false,
            touched: false
          },
          country: {
            elementType: "input",
            elementConfig: {
              type: 'text',
              placeholder: 'Country'
            },
            value: '',
            validation: {
              required: true
            },
            valid: false,
            touched: false
          },
          email: {
            elementType: "input",
            elementConfig: {
              type: 'email',
              placeholder: 'E-mail'
            },
            value: '',
            validation: {
              required: true
            },
            valid: false,
            touched: false
          },
          deliveryMode: {
            elementType: "select",
            elementConfig: {
              options: [
                {value: 'fastest', displayValue: 'Fastest'},
                {value: 'cheapest', displayValue: 'Cheapest'},
              ]
            },
            value: 'fastest',
            valid: true
          }
        },
        formIsValid: false

    }
    orderHandler = (e) => {
        e.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
          formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
          ingredients: this.props.ings,
          price: this.props.price,
          orderData: formData,
          userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangeHandler = (event, inputIdentifier) => {
      
      const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
        touched: true
      });
      const updatedOrderForm = updateObject(this.state.orderForm, {
        [inputIdentifier]: updatedFormElement
      });
      let formIsValid = true;

      for (let inputIdentifier in updatedOrderForm) {
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
      }

      this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    render () {
      const formElementsArray = [];
      for (let key in this.state.orderForm) {
        formElementsArray.push({
          id: key,
          config: this.state.orderForm[key]
        });
      }
        return (
            <div className={classes.ContactData}>
               <h4>Enter you data:</h4>
               <form onSubmit={this.orderHandler}>
                 {formElementsArray.map(element => (
                   <Input
                    key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    shouldValidate={element.config.validation}
                    invalid={!element.config.valid}
                    touched={element.config.touched}
                    onChange={(event) => this.inputChangeHandler(event, element.id)}/>
                 ))}
                   <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
               </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      loading: state.orders.loading,
      token: state.auth.token,
      userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onOrderBurger: (orderData, token) => dispatch(actionCreators.purchaseBurger(orderData, token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorsHandler(ContactData, axios));