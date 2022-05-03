import React, { useContext } from "react"
import Input from "../../Components/Input"
import { AuthContext } from "../../context/user-context"
import { useForm } from "../../hooks/form-hook"
import { useHttpHook } from "../../hooks/http-hook"
import ErrorModal from "../../Components/ErrorModal"
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../util/validate"
import ImageUpload from "../../Components/ImageUpload"
const Register = props => {
    const auth = useContext(AuthContext)
    const { error, sendRequest, clearError } = useHttpHook()

    const [formState, inputHandler] = useForm(
        {
            name: {
                value: '',
                isValid: false
            },
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

    const registerSubmitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name' ,formState.inputs.name.value)
        formData.append('email' ,formState.inputs.email.value)
        formData.append('password' ,formState.inputs.password.value)
        formData.append('image' ,formState.inputs.image.value)
        try {
            const resData = await sendRequest(`http://localhost:5000/api/users/signup`,
                'POST',
                formData)
            auth.login(resData.userId, resData.token)
        } catch (error) {

        }
    }

    return <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <div className="form-container">
            <h2 className="center">Login Required</h2>
            <hr />
            <form onSubmit={registerSubmitHandler}>
                <ImageUpload onInput={inputHandler} id="image" />
                <Input id="name" element="input"
                    type="text" label="Name"
                    validators={[VALIDATOR_REQUIRE]}
                    onInput={inputHandler} />
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
                <button type="submit">REGISTER</button>
            </form>
        </div>
    </React.Fragment>
}
export default Register