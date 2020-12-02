import React, { Component } from "react";
import Aux from "../AuxComponent/AuxComponent";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux";

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !this.state.showSideDrawer};
        });
    }
  render() {
    return (
      <Aux>
        <Toolbar isAuth={this.props.isAuthenticated} toggle={this.sideDrawerToggleHandler}/>
        <SideDrawer isAuth={this.props.isAuthenticated} closed={this.sideDrawerCloseHandler} open={this.state.showSideDrawer}/>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);