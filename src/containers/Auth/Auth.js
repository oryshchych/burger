import React, {Component} from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from "react-router-dom";
import {updateObject, checkValidity} from "../../shared/utility";
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                  type: 'email',
                  placeholder: 'Your email'
                },
                value: '',
                validation: {
                  required: true,
                  isEmail: true
                },
                valid: false,
                touched: false
              },
            password: {
              elementType: "input",
              elementConfig: {
                type: 'password',
                placeholder: 'Your password'
              },
              value: '',
              validation: {
                required: true,
                minLength: 6
              },
              valid: false,
              touched: false
            },
        },
        formIsValid: true,
        isSignup: true
    }

    componentDidMount() {
      if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
        this.props.onSetAuthRedirectPath();
      }
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
          [controlName]: updateObject(this.state.controls[controlName], {
            value: event.target.value,
            touched: true,
            valid: checkValidity(event.target.value, this.state.controls[controlName].validation)
          })
        });        
        this.setState({ controls: updatedControls });
      }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
      this.setState( prevState => {
        return {
          isSignup: !prevState.isSignup
        }
      })
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.controls) {
          formElementsArray.push({
            id: key,
            config: this.state.controls[key]
          });
        }

        let form = formElementsArray.map(element => (
          <Input
           key={element.id}
           elementType={element.config.elementType}
           elementConfig={element.config.elementConfig}
           value={element.config.value}
           shouldValidate={element.config.validation}
           invalid={!element.config.valid}
           touched={element.config.touched}
           onChange={(event) => this.inputChangeHandler(event, element.id)}/>
        ));

        if (this.props.loading) form = <Spinner/>

        let errorMessage = null;
        if (this.props.error) {
          errorMessage = (
          <p>{this.props.error.message}</p>
          )
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
          authRedirect = <Redirect to={this.props.authRedirectPath}/>
        } 

        return (
            <div className={classes.Auth}>
              {authRedirect}
              {errorMessage}
                <form onSubmit={this.onSubmitHandler}>
                {form}
                   <Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
                   <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">Switch to {this.state.isSignup ? "Signin" : "Signup"}</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);