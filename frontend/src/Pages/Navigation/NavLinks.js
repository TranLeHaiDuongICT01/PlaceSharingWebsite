import React, { useContext } from "react"
import { NavLink } from 'react-router-dom'
import { AuthContext } from "../../context/user-context"
const NavLinks = props => {
    const auth = useContext(AuthContext)
    return (
        <React.Fragment>
            <ul className="nav-links">
                <li>
                    <NavLink to="/" exact>All Users</NavLink>
                </li>
                {auth.isLogin &&
                    <li>
                        <NavLink to={`/${auth.userId}/places`}>My Places</NavLink>
                    </li>
                }
                {auth.isLogin &&
                    <li>
                        <NavLink to="/places/new">Add Place</NavLink>
                    </li>
                }
                {!auth.isLogin &&
                    <li>
                        <NavLink to="/login">Login</NavLink>
                    </li>
                }
                {auth.isLogin && 
                    <li>
                        <button className="nav-links-button" onClick={auth.logout}>Logout</button>
                    </li>
                }
            </ul>
        </React.Fragment>
    )
}

export default NavLinks