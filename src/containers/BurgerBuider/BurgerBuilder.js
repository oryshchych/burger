import React, { useCallback, useEffect, useState } from "react";
import Aux from "../../hoc/AuxComponent/AuxComponent";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorsHandler from "../../hoc/withErrorsHandler/withErrorsHandler";
import {connect, useSelector, useDispatch} from 'react-redux';
import * as burderBuilderActions from '../../store/actions/index';

const BurgerBuilder = (props) => {

  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const ings = useSelector(state => {
    return state.burgerBuilder.ingredients;
  });
  const price = useSelector(state => {
    return state.burgerBuilder.totalPrice;
  });
  const isAuthenticated = useSelector(state => {
    return state.auth.token !== null;
  });

  const onIngredientAdded = (ingName) => dispatch(burderBuilderActions.addIngredient(ingName));
  const onIngredientRemoved = (ingName) => dispatch(burderBuilderActions.removeIngredient(ingName));
  const onInitIngredients = useCallback(() => dispatch(burderBuilderActions.initIngredients()), [dispatch]);
  const onInitPurchase = () => dispatch(burderBuilderActions.purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(burderBuilderActions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout")
      props.history.push("/auth");
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  }

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push("/checkout");
  }

  const disabledInfo = { ...ings };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let burger = <Spinner/>;
  let orderSummary = null;
  if (ings) {
    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls
          price={price}
          ingridientAdded={onIngredientAdded}
          ingridientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary 
        price={price} 
        ingredients={ings} 
        continue={purchaseContinueHandler} 
        cancel={purchaseCancelHandler}/>
    );
  }
  return (
    <Aux>
      <Modal show={purchasing} close={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(burderBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(burderBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burderBuilderActions.initIngredients()),
    onInitPurchase: () => dispatch(burderBuilderActions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(burderBuilderActions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorsHandler(BurgerBuilder, axios));