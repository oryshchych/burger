import React, { Component } from "react";
import Aux from "../../hoc/AuxComponent/AuxComponent";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGRIDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.5,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingridients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4,
      purchasable: false,
      purchasing: false
    };
  }

  addIngridientHandler = type => {
    const oldCount = this.state.ingridients[type];
    const updatedCount = oldCount + 1;
    const updatedIngridients = {
      ...this.state.ingridients
    };
    updatedIngridients[type] = updatedCount;
    const priceAddition = INGRIDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      ingridients: updatedIngridients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updatedIngridients);
  };

  removeIngridientHandler = type => {
    const oldCount = this.state.ingridients[type];
    if (oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngridients = {
      ...this.state.ingridients
    };
    updatedIngridients[type] = updatedCount;
    const priceDeduction = INGRIDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      ingridients: updatedIngridients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updatedIngridients);
  };

  updatePurchaseState = ingridients => {
    const sum = Object.keys(ingridients)
      .map(igKey => {
        return ingridients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  purchaseHandler = () => {
      this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    alert('You continue!');
  }

  render() {
    const disabledInfo = { ...this.state.ingridients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} close={this.purchaseCancelHandler}>
          <OrderSummary price={this.state.totalPrice} ingridients={this.state.ingridients} continue={this.purchaseContinueHandler} cancel={this.purchaseCancelHandler}/>
        </Modal>
        <Burger ingridients={this.state.ingridients} />
        <div>Build Controls</div>
        <BuildControls
          price={this.state.totalPrice}
          ingridientAdded={this.addIngridientHandler}
          ingridientRemoved={this.removeIngridientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
