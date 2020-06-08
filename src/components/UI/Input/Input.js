import React from "react";
import classes from "./Input.module.css"

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                {...props.elementConfig} 
                className={inputClasses.join(' ')}
                onChange={props.onChange} 
                value={props.value}/>
            break;
        case ('textarea'):
            inputElement = <textarea 
                className={inputClasses.join(' ')}
                {...props.elementConfig} 
                onChange={props.onChange} 
                value={props.value}/>
            break;
        case ('select'):
            inputElement = (
                <select
                    value={props.value}
                    onChange={props.onChange}
                    className={inputClasses.join(' ')}
                    >   
                        {props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        ))}
                </select>
            );
            break;
        default:
            inputElement = <input 
                {...props.elementConfig} 
                onChange={props.onChange} 
                className={inputClasses.join(' ')}
                value={props.value}/>
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}></label>
            {inputElement}
        </div>
    )
}

export default input;