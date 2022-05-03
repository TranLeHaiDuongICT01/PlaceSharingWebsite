import React from "react"
import { Link } from "react-router-dom"
import PlaceItem from "./PlaceItem"
const PlacesList = props => {
    if(props.places.length === 0) {
        return <div className="no-place">
        <h2>No places found!</h2>
        <Link to="/places/new"><button>Share Place</button></Link>
    </div>
    }

    return (
        <React.Fragment>
            <ul className="place-list">
            {props.places.map(place => (
                <PlaceItem
                    key={place._id}
                    id={place._id}
                    title={place.title}
                    des={place.des}
                    address={place.des}
                    image={place.image}
                    creator={place.creator}
                    onDelete={props.onDelete}
                />
            ))}
            </ul>
        </React.Fragment>
    )
}

export default PlacesList