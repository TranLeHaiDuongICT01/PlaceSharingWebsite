import React from "react";
import { Link } from "react-router-dom";
import UserItem from './UserItem'
import './users.css'
const UsersList = props => {
    if (props.users.length === 0) {
        return <div className="form-container">
            <h2>No user found!</h2>
            <Link to="/register"><button>Register</button></Link>
        </div>
    }
    return (
        <ul className="user-list">
            {props.users.map(user => (
                <UserItem
                    image={user.image}
                    name={user.name}
                    key={user.email}
                    id={user._id}
                    placeCount={user.places.length}
                />
            ))}
        </ul>
    )
}

export default UsersList