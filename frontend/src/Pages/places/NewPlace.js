import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import ErrorModal from "../../Components/ErrorModal"
import ImageUpload from "../../Components/ImageUpload"
import Input from "../../Components/Input"
import { AuthContext } from "../../context/user-context"
import { useForm } from "../../hooks/form-hook"
import { useHttpHook } from "../../hooks/http-hook"
import { VALIDATOR_REQUIRE } from "../../util/validate"

import './places.css'
const NewPlace = props => {
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpHook()
    const history = useHistory()
    const [formState, inputHandler] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            des: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            }
        }
    )
    const createSubmitHandler = async e => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('title',formState.inputs.title.value)
            formData.append('des',formState.inputs.des.value)
            formData.append('address',formState.inputs.address.value)
            formData.append('image',formState.inputs.image.value)
            await sendRequest(`http://localhost:5000/api/places`,
            'POST',
            formData,
            {
                Authorization: 'Bearer ' + auth.token
            })
            history.push('/' + auth.userId + 'places')
        } catch (error) {

        }
    }
    return <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {/* {!isLoading && */}
        <div className="form-container">
            <h2 className="center">Place Information</h2>
            <hr />
            <form onSubmit={createSubmitHandler}>
                <Input id="title" element="input"
                    type="text" label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please input a valid title"
                    onInput={inputHandler} />

                <Input id="des"
                    type="textarea" label="Description"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please input a valid description"
                    onInput={inputHandler} />
                
                <ImageUpload onInput={inputHandler} id="image" />

                <Input id="address"
                    type="textarea" label="Address"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please input a valid address"
                    onInput={inputHandler} />
                <button type="submit" disabled={!!!auth.token}>CREATE</button>
            </form>
        </div>
        {/* } */}
    </React.Fragment>
}

export default NewPlace