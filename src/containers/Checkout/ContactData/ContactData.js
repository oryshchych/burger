import React, {Component} from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";
import Input from '../../../components/UI/Input/Input';

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
        this.setState({loading: true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
          formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
          ingredients: this.props.ingredients,
          price: this.props.price,
          orderData: formData
        }
        axios.post("/orders.json", order)
        .then( response => {
          this.setState({
            loading: false,
          });
          this.props.history.push("/")
        })
        .catch( error => {
          this.setState({
            loading: false,
            });
        });
    }

    inputChangeHandler = (event, inputIdentifier) => {
      const updatedOrderForm = {
        ...this.state.orderForm
      };
      const updatedFormElement = {
        ...updatedOrderForm[inputIdentifier]
      };
      updatedFormElement.value = event.target.value;
      updatedFormElement.touched = true;
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
      updatedOrderForm[inputIdentifier] = updatedFormElement;
      let formIsValid = true;

      for (let inputIdentifier in updatedOrderForm) {
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
      }

      this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    checkValidity(value, rules) {
      let isValid = false;

      if (rules && rules.required) {
        isValid = value.trim() !== '';
      }

      if (rules && rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
      }

      return isValid;
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

export default ContactData;