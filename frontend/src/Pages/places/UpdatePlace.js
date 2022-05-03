import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { AuthContext } from "../../context/user-context"
import { useHttpHook } from "../../hooks/http-hook"
import { useForm } from "../../hooks/form-hook"
import ErrorModal from "../../Components/ErrorModal"
import Input from "../../Components/Input"
import { VALIDATOR_REQUIRE } from "../../util/validate"


const UpdatePlace = props => {
    const auth = useContext(AuthContext)
    const [loadedPlace, setLoadedPlace] = useState()
    const { isLoading, error, sendRequest, clearError } = useHttpHook()
    const { placeId } = useParams()
    const history = useHistory()

    const [formState, inputHandler, setFormData] = useForm(
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

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const resData = await sendRequest(`http://localhost:5000/api/places/${placeId}`)
                setLoadedPlace(resData.place)
                setFormData(
                    {
                        title: {
                            value: resData.place.title,
                            isValid: true
                        },
                        des: {
                            value: resData.place.des,
                            isValid: true
                        },
                        address: {
                            value: resData.place.address,
                            isValid: true
                        }
                    })
            } catch (error) {

            }
        }
        fetchPlace()
    }, [sendRequest, placeId, setFormData])

    const updateSubmitHandler = async e => {
        e.preventDefault()
        try {
            await sendRequest(`http://localhost:5000/api/places/${placeId}`,
                'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    des: formState.inputs.des.value,
                    address: formState.inputs.address.value
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                })
            history.push('/' + auth.userId + '/places')
        } catch (error) {

        }
    }

    return <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {!isLoading &&
            <div className="form-container">
                <h2 className="center">Update Place</h2>
                <hr />
                <form onSubmit={updateSubmitHandler}>
                    <Input id="title" element="input"
                        type="text" label="Title"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please input a valid title"
                        onInput={inputHandler}
                        initialValue={loadedPlace.title}
                        initialValid={true} />
                    <Input id="des"
                        type="textarea" label="Description"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please input a valid description"
                        onInput={inputHandler}
                        initialValue={loadedPlace.des}
                        initialValid={true} />
                    <Input id="address"
                        type="textarea" label="Address"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please input a valid address"
                        onInput={inputHandler}
                        initialValue={loadedPlace.address}
                        initialValid={true} />
                    <button type="submit">UPDATE</button>
                </form>
            </div>
        }
    </React.Fragment>
}

export default UpdatePlace