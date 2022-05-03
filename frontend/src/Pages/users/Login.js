import React, { useContext } from "react"
import Input from '../../Components/Input'
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../util/validate"
import { useForm } from '../../hooks/form-hook'
import { useHttpHook } from "../../hooks/http-hook"
import { AuthContext } from "../../context/user-context"
import ErrorModal from "../../Components/ErrorModal"
import { Link } from "react-router-dom"
const Login = props => {
    const auth = useContext(AuthContext)
    const { error, sendRequest, clearError } = useHttpHook()
    const [formState, inputHandler] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    )


    const loginSubmitHandler = async e => {
        e.preventDefault()
        try {
            const resData = await sendRequest('http://localhost:5000/api/users/login', 'POST',
                JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                }),
                {
                    'Content-Type': 'application/json'
                })
            auth.login(resData.userId, resData.token)
        } catch (error) {

        }
    }

    return <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <div className="form-container">
            <h2 className="center">Login Required</h2>
            <hr />
            <form onSubmit={loginSubmitHandler}>
                <Input id="email" element="input"
                    type="email" label="Email"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please input a valid email"
                    onInput={inputHandler} />

                <Input id="password" element="input"
                    type="password" label="Password"
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    errorText="Please input a valid password"
                    onInput={inputHandler} />
                <button type="submit">LOGIN</button>
                <Link to="/register"><button>REGISTER</button></Link>
            </form>
        </div>

    </React.Fragment>
}
export default Login