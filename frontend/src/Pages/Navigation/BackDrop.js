import React from "react"
const BackDrop = props => {
    return (
        <React.Fragment>
            <div className="back-drop" onClick={props.onClick}></div>
        </React.Fragment>
    )
}

export default BackDrop