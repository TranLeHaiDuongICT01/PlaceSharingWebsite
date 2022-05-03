import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { useHttpHook } from "../../hooks/http-hook"
import PlacesList from './PlacesList'

import './places.css'
const Places = props => {    
    const [loadedPlace, setLoadedPlace] = useState()
    const { isLoading, error, sendRequest, clearError } = useHttpHook()
    const { userId } = useParams()
    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const resData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`)
                setLoadedPlace(resData.places)
            } catch (error) {
                
            }
        }
        fetchPlace()
    }, [sendRequest, userId])

    const placeDeleteHandler = deletePlaceId => {
        setLoadedPlace(prev => prev.filter(place => place._id !== deletePlaceId))
    }
    return (
        <React.Fragment>
            {!isLoading && loadedPlace && <PlacesList places={loadedPlace} onDelete={placeDeleteHandler} />}
        </React.Fragment>
    )
}

export default Places