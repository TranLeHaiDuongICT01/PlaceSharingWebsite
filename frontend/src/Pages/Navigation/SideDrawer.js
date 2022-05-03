import React from "react"
import { CSSTransition } from 'react-transition-group'
const SideDrawer = props => {
    return (
        <React.Fragment>
            <CSSTransition in={props.show} classNames="slide-in-left"
                mountOnEnter timeout={200} unmountOnExit >
                <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
            </CSSTransition>
        </React.Fragment>
    )
}

export default SideDrawer