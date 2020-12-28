import React, {useState, useEffect} from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from "react-router-dom";
import {updateObject, checkValidity} from "../../shared/utility";

const Auth = (props) => {
  const [controls, setControls] = useState({
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
    }
  });
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== "/") {
      props.onSetAuthRedirectPath();
    }
  }, [props]);

  const inputChangeHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        touched: true,
        valid: checkValidity(event.target.value, controls[controlName].validation)
      })
    });
    setControls(updatedControls);        
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup);
  }

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  }

  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
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
     onChange={(event) => inputChangeHandler(event, element.id)}/>
  ))
  if (props.loading) form = <Spinner/>
  let errorMessage = null;
  if (props.error) {
    errorMessage = (
    <p>{props.error.message}</p>
    )
  }
  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath}/>
  }
  return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
          <form onSubmit={onSubmitHandler}>
          {form}
             <Button btnType="Success">SUBMIT</Button>
             <Button 
              clicked={switchAuthModeHandler}
              btnType="Danger">Switch to {isSignup ? "Signin" : "Signup"}</Button>
          </form>
      </div>
  );
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