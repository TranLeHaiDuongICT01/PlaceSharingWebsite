import React, { useEffect, useReducer } from "react"
import { validate } from "../util/validate"


import './Component.css'

const inputReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            }
        case "TOUCH":
            return {
                ...state,
                isTouched: true
            }
        default:
            return state
    }
}
const Input = props => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '', isValid: props.initialValid || false, isTouched: false
    })
    const { id, onInput } = props
    const { value, isValid } = inputState

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput])

    const onChangeHandler = e => {
        dispatch({ type: "CHANGE", val: e.target.value, validators: props.validators })
    }

    const touchHandler = () => {
        dispatch({
            type: "TOUCH"
        })
    }

    const element = props.element === 'input' ?
        <input id={props.id} type={props.type} placeholder={props.placeholder}
            required onChange={onChangeHandler} value={inputState.value} onBlur={touchHandler} />
        :
        <textarea id={props.id} rows="3" required
            onChange={onChangeHandler} value={inputState.value} onBlur={touchHandler} />

    return (
        <React.Fragment>
            <div className="form-control">
                <label htmlFor={props.id}>{props.label}</label>
                {element}
            </div>
        </React.Fragment>
    )
}

export default Input