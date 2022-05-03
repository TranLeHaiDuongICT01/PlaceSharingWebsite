import React from "react";
import { Link } from 'react-router-dom'
import Avatar from "../../Components/Avatar";
const UserItem = props => {
    return (
        <React.Fragment>
            <li className="user-item">
                <div className="user-content">
                    <Link className="list-item" to={`/${props.id}/places`}>
                        <div className="user-image">
                            <Avatar image={`http://localhost:5000/${props.image}`} alt={props.name} />
                        </div>
                        <div className="user-info">
                            <h2>{props.name}</h2>
                            <h3>
                                {props.placeCount} {props.placeCount === 1 ? 'place' : 'places'}
                            </h3>
                        </div>
                    </Link>
                </div>
            </li>
        </React.Fragment>
    )
}

export default UserItem