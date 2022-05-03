import React from "react"
const Header = props => {
    return (
        <React.Fragment>
            <header className="main-header">
                {props.children}
            </header>
        </React.Fragment>
    )
}

export default Header