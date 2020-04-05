import React from "react";
import classes from "./Modal.module.css";
import Aux from "../../../hoc/AuxComponent";
import BackDrop from "../BackDrop/BackDrop";

const modal = (props) => {
    

    return (
        <Aux>
            <BackDrop show={props.show} clicked={props.close}/>
            <div className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0' : 'translateY(-10vh',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Aux>
    );
}

export default modal;