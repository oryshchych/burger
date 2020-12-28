import React, {useState} from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorsHandler from "../../../hoc/withErrorsHandler/withErrorsHandler";
import * as actionCreators from "../../../store/actions/index";
import {updateObject, checkValidity} from "../../../shared/utility";

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
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
  });
  const [formIsValid, setFormIsValid] = useState(false);
    
  const orderHandler = (e) => {
        e.preventDefault();
        const formData = {};
        for (let formElementIdentifier in orderForm) {
          formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        const order = {
          ingredients: props.ings,
          price: props.price,
          orderData: formData,
          userId: props.userId
        }
        props.onOrderBurger(order, props.token);
    }

  const inputChangeHandler = (event, inputIdentifier) => {
      const updatedFormElement = updateObject(orderForm[inputIdentifier], {
        value: event.target.value,
        valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
        touched: true
      });
      const updatedOrderForm = updateObject(orderForm, {
        [inputIdentifier]: updatedFormElement
      });
      let formIsValid = true;

      for (let inputIdentifier in updatedOrderForm) {
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
      }
      setOrderForm(updatedOrderForm);
      setFormIsValid(formIsValid);
    }

    const formElementsArray = [];
    for (let key in orderForm) {
      formElementsArray.push({
        id: key,
        config: orderForm[key]
      });
    }
    return (
        <div className={classes.ContactData}>
           <h4>Enter you data:</h4>
           <form onSubmit={orderHandler}>
             {formElementsArray.map(element => (
               <Input
                key={element.id}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                shouldValidate={element.config.validation}
                invalid={!element.config.valid}
                touched={element.config.touched}
                onChange={(event) => inputChangeHandler(event, element.id)}/>
             ))}
               <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
           </form>
        </div>
    );
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