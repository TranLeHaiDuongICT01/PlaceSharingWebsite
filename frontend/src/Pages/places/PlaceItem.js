import React, { useContext, useState } from "react"
import { Link } from 'react-router-dom'
import Modal from "../../Components/Modal"
import { AuthContext } from "../../context/user-context"
import { useHttpHook } from "../../hooks/http-hook"
import { useHistory } from "react-router-dom"
import ErrorModal from "../../Components/ErrorModal"

import './places.css'
const PlaceItem = props => {
    const { isLoading, error, sendRequest, clearError } = useHttpHook()
    const auth = useContext(AuthContext)
    const [showConfirm, setShowConfirm] = useState(false)
    const history = useHistory()
    const showModal = () => {
        setShowConfirm(true)
    }
    const cancelConfirmModal = () => {
        setShowConfirm(false)
    }
    const deletePlace = async e => {
        e.preventDefault()
        setShowConfirm(false)

        try {
            await sendRequest(`http://localhost:5000/api/places/${props.id}`, 'DELETE', null, {
                Authorization: 'Bearer ' + auth.token
            })
            // window.location.reload(false);
            props.onDelete(props.id)
        } catch (error) {

        }
    }
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Modal header="Are you sure?"
                show={showConfirm}
                footerClass="place-item__modal-actions"
                onCancel={cancelConfirmModal}
                footer={
                    <React.Fragment>
                        <button onClick={cancelConfirmModal}>CANCEL</button>
                        <button onClick={deletePlace}>DELETE</button>
                    </React.Fragment>
                }>
                <p>Do you want to proceed and delete this place?</p>
            </Modal>
            <li className="place-item">
                <div className="place-content">
                    <div className="place-image">
                        <img src={`http://localhost:5000/${props.image}`} alt={props.title} />
                    </div>
                    <div className="place-info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-button">
                        <Link to={`/places/${props.id}`}><button disabled={!!!auth.token}>EDIT</button></Link>
                        <button onClick={showModal} disabled={!!!auth.token}>DELETE</button>
                    </div>
                </div>
            </li>
        </React.Fragment>
    )
}

export default PlaceItem