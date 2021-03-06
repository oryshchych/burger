import React from "react";
import classes from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import BackDrop from "../../UI/BackDrop/BackDrop";
import Aux from "../../../hoc/AuxComponent/AuxComponent";

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(" ")} onClick={props.closed}>
                <Logo height="11%"/>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}>
                    </NavigationItems>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;